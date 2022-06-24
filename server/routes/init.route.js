const config = require('../config/mongoose'); 
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const express = require('express');
const router = express.Router();
const request = require('postman-request');
const promiseForeach = require('promise-foreach')

const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Tokengecko = require('../models/Tokengecko');
const Roi = require('../models/Roi');
const Transactions = require('../models/Transactions');
const TokenTransactions = require('../models/TokenTransactions');
const History = require('../models/History');

router.get('/db', async(req, res) => {
	config.mongoose.connection.db.dropDatabase(function(err, result) {})
	return res.status(200).json({status:"ok"});
});

router.get('/token', (req, res) => {
	request('https://api.coingecko.com/api/v3/coins/list?include_platform=true', function (error, response, body) {
		tokens = []
		results = JSON.parse(body);
		results.map((result, i)=>{	
			temp_name = "";
			temp_value = "";
            for(const name in result.platforms) {
				temp_name = temp_name + name+","
				temp_value = temp_value + result.platforms[name] +","
			}
			temp_name = temp_name.slice(0,-1)
			if (temp_name == ",") temp_name = "";
			temp_value = temp_value.slice(0,-1)
			if (temp_value == ",") temp_value = "";

			tokens = tokens.concat([{token_id:result.id, token_symbol:result.symbol, token_name:result.name, token_platform:temp_name, token_address:temp_value}]);
		})

		if (Number(tokens.length) >0){
			temps = [];
			tokens.map((token,i)=>{
				temps[i] = token.token_id;
			})
			api_array = []
			page = Math.ceil(temps.length/500);
			for (j=0; j<page; j++){
				temp = temps.slice(j*500, j*500+500)
				query =temp.join();
				api_array = api_array.concat([{item: query}])
			}
			prices = []
			promiseForeach.each(api_array,
				token => { 
					return getPrices(token.item);
				},
				(arrResult, token) => {
					Object.keys(arrResult[0]).forEach(key => {
						tokens.map((token, j)=>{
							if (token.token_id == key) prices = prices.concat([{token_id:key, token_name:token.token_name, token_symbol:token.token_symbol, token_platform:token.token_platform, token_address:token.token_address, token_price:arrResult[0][key].usd, token_24h_change: arrResult[0][key].usd_24h_change }])
						})						
					})
				},
				(err, newList) => {
					if (err) { console.log(err);	
						return res.status(400).json({status:"fail"});
					}
					if (api_array.length == newList.length){
						Tokengecko.deleteMany({}).then(function(){			
							Tokengecko.insertMany(prices).then(function(){
								return res.status(200).json({status:"ok"}); // Success
							}).catch(function(error){
								return res.status(200).json({status:"fail"}); // Failure
							});
						})
					}					
				}
			)
		} 		
	});							
});

router.get('/balance', (req, res) => {
	config.mongoose
	.connect(env.REACT_APP_MONGO_URL, {
		dbName: env.REACT_APP_MONGO_DB,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 1, // Maintain up to 10 socket connections
		socketTimeoutMS:60000
	})
	.then(() => console.log('MongoDB connected for the balance initialization work'))
	.catch((err) => console.log(err));
	Wallet.find().lean().then(results => {
		i = 0
        if (results.length >0){
			promiseForeach.each(results,
				result => { 
					i = i+1;
					return setTimeout(async function(){await updateBalance(result.wallet_address);}, i*800) 
				},
				(arrResult, result) => {					
				},
				(err, newList) => {
					if (results.length == newList.length){
						return res.status(200).json({status:"ok"}); // Success
					} else {
						return res.status(200).json({status:"fail"}); // Success
					}				
				}
			)
		} else {
			return res.status(200).json({status:"zero"}); // Success
		}
	})
});

router.get('/roi', (req, res) => {
	config.mongoose
	.connect(env.REACT_APP_MONGO_URL, {
		dbName: env.REACT_APP_MONGO_DB,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 1, // Maintain up to 10 socket connections
		socketTimeoutMS:60000
	})
	.then(() => console.log('MongoDB connected for the ROI deleting work'))
	.catch((err) => console.log(err));
	Wallet.find().lean().then(results => {
        if (results.length >0){
			promiseForeach.each(results,
				result => { 
					return deleteRoi(result.wallet_address);
				},
				(arrResult, result) => {					
				},
				(err, newList) => {
					if (results.length == newList.length){
						return res.status(200).json({status:"ok"}); // Success
					} else {
						return res.status(200).json({status:"fail"}); // Success
					}				
				}
			)
		} else {
			return res.status(200).json({status:"zero"}); // Success
		}
	})
});

router.get('/transaction', (req, res) => {
	config.mongoose
	.connect(env.REACT_APP_MONGO_URL, {
		dbName: env.REACT_APP_MONGO_DB,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 1, // Maintain up to 10 socket connections
		socketTimeoutMS:60000
	})
	.then(() => console.log('MongoDB connected for the transaction deleting work'))
	.catch((err) => console.log(err));
	Wallet.find().lean().then(results => {
        if (results.length >0){
			promiseForeach.each(results,
				result => { 
					return deleteTransaction(result.wallet_address);
				},
				(arrResult, result) => {					
				},
				(err, newList) => {
					if (results.length == newList.length){
						return res.status(200).json({status:"ok"}); // Success
					} else {
						return res.status(200).json({status:"fail"}); // Success
					}				
				}
			)
		} else {
			return res.status(200).json({status:"zero"}); // Success
		}
	})
});

router.get('/history', (req, res) => {
	config.mongoose
	.connect(env.REACT_APP_MONGO_URL, {
		dbName: env.REACT_APP_MONGO_DB,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 1, // Maintain up to 10 socket connections
		socketTimeoutMS:60000
	})
	.then(() => console.log('MongoDB connected for the history deleting work'))
	.catch((err) => console.log(err));
	Wallet.find().lean().then(results => {
        if (results.length >0){
			promiseForeach.each(results,
				result => { 
					return deleteHistory(result.wallet_address);
				},
				(arrResult, result) => {					
				},
				(err, newList) => {
					if (results.length == newList.length){
						return res.status(200).json({status:"ok"}); // Success
					} else {
						return res.status(200).json({status:"fail"}); // Success
					}				
				}
			)
		} else {
			return res.status(200).json({status:"zero"}); // Success
		}
	})
});

module.exports = router;

async function getPrices(item) {
	return await new Promise( function (resolve, reject) {
		request('https://api.coingecko.com/api/v3/simple/price?ids='+item+'&vs_currencies=usd&include_24hr_change=true', function (error, response, body) {
			if (error) {
				reject(error)
			} else {
				resolve(JSON.parse(body));
			}
		})
	})
}

async function updateBalance(wallet_address) {
	return await new Promise( function (resolve, reject) {
		//var url  ='https://api.covalenthq.com/v1/56/address/'+wallet_address+'/balances_v2/?nft=true&no-nft-fetch=true&key=ckey_daca4efda85b4837961727b8cbb'
		url = 'https://api.bscscan.com/api?module=account&action=addresstokenbalance&address='+wallet_address+'&page=1&offset=1000&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
		request(url, function (error, response, body) {
			token_list = [];
			results = JSON.parse(body);
			if (results.result.length >= 1) {
				results.result.map((data, i) => {
					temp1 = Number(data.TokenQuantity)/(10**data.TokenDivisor)
					token_list = token_list.concat([{wallet_address:wallet_address, tokenName:data.TokenName, tokenSymbol:data.TokenSymbol, tokenDecimal:data.TokenDivisor, qty:temp1, contractAddress:data.TokenAddress}]);           
				})
			}	
			Tokenbalances.deleteMany({wallet_address:wallet_address}).then(function(){			
				Tokenbalances.insertMany(token_list).then(function(){
					resolve(token_list); // Success
				}).catch(function(error){
					reject(error); // Failure
				});	
			})					
		})
	})
}

async function deleteRoi(wallet_address) {
	return await new Promise( function (resolve, reject) {			
		wallet = {wallet_address:wallet_address, rois:0, tokenRois:0, roiTimeStamp:0, roiTokenTimeStamp:0, status:0, create:new Date()};
		Wallet.findOneAndUpdate({ wallet_address: wallet_address }, wallet).then((result)=>{
			Roi.deleteMany({wallet_address:wallet_address}).then(function(){
				resolve("ok")
			}).catch(function(error){
				reject(error)
			})
		})		
	})
}

async function deleteTransaction(wallet_address) {
	return await new Promise( function (resolve, reject) {			
		wallet = {wallet_address:wallet_address, timeStamp:0, tokenTimeStamp:0, create:new Date()};
		Wallet.findOneAndUpdate({ wallet_address: wallet_address }, wallet).then((result)=>{
			Transactions.deleteMany({wallet_address:wallet_address}).then(function(){
				TokenTransactions.deleteMany({wallet_address:wallet_address}).then(function(){
					resolve("ok")
				}).catch(function(error){
					reject(error)
				})
			}).catch(function(error){
				reject(error)
			})
		})		
	})
}

async function deleteHistory(wallet_address) {
	return await new Promise( function (resolve, reject) {			
			History.deleteMany({wallet_address:wallet_address}).then(function(){
				resolve("ok")
			}).catch(function(error){
				reject(error)
			})
	})
}
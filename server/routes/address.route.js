const express = require('express');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const config = require('../config/mongoose'); 

const router = express.Router();
const request = require('postman-request');

const User = require('../models/User');
const PancakeSetting = require('../models/PancakeSetting');
const ApeSetting = require('../models/ApeSetting');

router.get('/getPancakeSetting', (req, res) => {
	PancakeSetting.findOne().then((result)=>{
		return res.status(200).json(result);
	}).catch(function(error){
		return res.status(200).json("fail"); // Failure
	});	
});

router.get('/pancakeSave', (req, res) => {
	var setting = {pancakeRepeatedNumber:req.query.repeated_number, pancakeSlippage:req.query.slippage, create:new Date()};
	var id = req.query.id;
	if (id == null || id == "" ) {
		PancakeSetting.create(setting).then((result)=>{
			return res.status(200).json(result);
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	} else {
		PancakeSetting.findByIdAndUpdate(id, setting).then((result)=>{
			if (result == null ){
				PancakeSetting.create(setting).then((result)=>{
					return res.status(200).json(result);
				})
			} else {
				return res.status(200).json(result);
			}
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	}	
});

router.get('/pancakeStart', (req, res) => {
	var id = req.query.id;
	if (id == null || id == "" ) {
		return res.status(200).json("fail"); // Failure
	} else {
		PancakeSetting.findByIdAndUpdate(id, {pancakeActionStatus:1, pancakeRepeatedNumber:req.query.repeated_number, pancakeSlippage:req.query.slippage, create:new Date()}).then((result)=>{
			return res.status(200).json(result);
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	}	
});

router.get('/pancakeStop', (req, res) => {
	var id = req.query.id;
	if (id == null || id == "" ) {
		return res.status(200).json("fail"); // Failure
	} else {
		PancakeSetting.findByIdAndUpdate(id, {pancakeActionStatus:0, pancakeRepeatedNumber:req.query.repeated_number, pancakeSlippage:req.query.slippage, create:new Date()}).then((result)=>{
			return res.status(200).json(result);
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	}	
});

router.get('/getApeSetting', (req, res) => {
	ApeSetting.findOne().then((result)=>{
		return res.status(200).json(result);
	}).catch(function(error){
		return res.status(200).json("fail"); // Failure
	});	
});

router.get('/apeSave', (req, res) => {
	var setting = {apeRepeatedNumber:req.query.repeated_number, apeSlippage:req.query.slippage, create:new Date()};
	var id = req.query.id;
	if (id == null || id == "" ) {
		ApeSetting.create(setting).then((result)=>{
			return res.status(200).json(result);
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	} else {
		ApeSetting.findByIdAndUpdate(id, setting).then((result)=>{
			if (result == null ){
				ApeSetting.create(setting).then((result)=>{
					return res.status(200).json(result);
				})
			} else {
				return res.status(200).json(result);
			}
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	}	
});

router.get('/apeStart', (req, res) => {
	var id = req.query.id;
	if (id == null || id == "" ) {
		return res.status(200).json("fail"); // Failure
	} else {
		ApeSetting.findByIdAndUpdate(id, {apeActionStatus:1, apeRepeatedNumber:req.query.repeated_number, apeSlippage:req.query.slippage, create:new Date()}).then((result)=>{
			return res.status(200).json(result);
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	}	
});

router.get('/apeStop', (req, res) => {
	var id = req.query.id;
	if (id == null || id == "" ) {
		return res.status(200).json("fail"); // Failure
	} else {
		ApeSetting.findByIdAndUpdate(id, {apeActionStatus:0, apeRepeatedNumber:req.query.repeated_number, apeSlippage:req.query.slippage, create:new Date()}).then((result)=>{
			return res.status(200).json(result);
		}).catch(function(error){
			return res.status(200).json("fail"); // Failure
		});	
	}	
});

module.exports = router;


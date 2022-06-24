/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React from 'react';
import axios from 'axios';
import Delete from '../../../assets/images/delete-icon.png';

const datasByRow = [];
const symbolByRow = [
	{exchange1: ' ', exchange2: 'PAX' , exchange3: 'PAX'},
	{exchange1: ' ', exchange2: 'TRX', exchange3: 'TRX'},
	{exchange1: ' ', exchange2: 'DOGE' , exchange3: 'DOGE'},
	{exchange1: ' ', exchange2: 'BCH', exchange3: 'BCH'},
	{exchange1: ' ', exchange2: 'UNI', exchange3: 'UNI'},
	{exchange1: ' ', exchange2: 'EOS', exchange3: 'EOS'},
	{exchange1: ' ', exchange2: 'GRT', exchange3: 'GRT'},
	{exchange1: ' ', exchange2: 'XRP' , exchange3: 'XRP'},
	{exchange1: ' ', exchange2: 'MATIC', exchange3: 'MATIC'},
	{exchange1: ' ', exchange2: 'BNB', exchange3: 'BNB'},
	{exchange1: ' ', exchange2: 'STRI', exchange3: 'STRI'},
	{exchange1: ' ', exchange2: 'SAFEMOON' , exchange3: 'SFM'},
	{exchange1: ' ', exchange2: 'YFI' , exchange3: 'YFI'},
	{exchange1: ' ', exchange2: 'DASH' , exchange3: 'DASH'},
	{exchange1: ' ', exchange2: 'COMP' , exchange3: 'COMP'},
	{exchange1: ' ', exchange2: 'WAVES' , exchange3: 'WAVES'},
	{exchange1: ' ', exchange2: 'ETC' , exchange3: 'ETC'},
	{exchange1: ' ', exchange2: 'EARNX' , exchange3: 'EARNX'},
	{exchange1: ' ', exchange2: 'ZRX' , exchange3: 'ZRX'},
	{exchange1: ' ', exchange2: 'BAND' , exchange3: 'BAND'},
	{exchange1: ' ', exchange2: 'BAT' , exchange3: 'BAT'},
	{exchange1: ' ', exchange2: 'USDC' , exchange3: 'USDC'},
	{exchange1: ' ', exchange2: 'NEO' , exchange3: 'NEO'},	
	{exchange1: ' ', exchange2: 'XLM' , exchange3: 'XLM'},
	{exchange1: ' ', exchange2: 'SNX' , exchange3: 'SNX'},
	{exchange1: ' ', exchange2: 'HOGL' , exchange3: 'HOGL'},
	{exchange1: ' ', exchange2: 'BTCV' , exchange3: 'BTCV'},
	{exchange1: ' ', exchange2: 'ETH' , exchange3: 'ETH'},
	{exchange1: ' ', exchange2: 'BSV' , exchange3: 'BSV'},
	{exchange1: ' ', exchange2: 'TUSD' , exchange3: 'TUSD'},
	{exchange1: ' ', exchange2: 'BTC' , exchange3: 'BTC'},
	{exchange1: ' ', exchange2: 'LTC' , exchange3: 'LTC'},
	{exchange1: ' ', exchange2: 'BTT' , exchange3: 'BTT'},
	{exchange1: ' ', exchange2: 'LINK' , exchange3: 'LINK'},
	{exchange1: ' ', exchange2: 'ZEC' , exchange3: 'ZEC'},
	{exchange1: ' ', exchange2: 'PROPEL', exchange3: ''},
	{exchange1: ' ', exchange2: 'AMR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'LON', exchange3: ''},
	{exchange1: ' ', exchange2: 'BUY', exchange3: ''},
	{exchange1: ' ', exchange2: 'CLC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ZEP', exchange3: ''},
	{exchange1: ' ', exchange2: 'VET' , exchange3: ''},
	{exchange1: ' ', exchange2: 'FTS', exchange3: ''},
	{exchange1: ' ', exchange2: 'ORE', exchange3: ''},
	{exchange1: ' ', exchange2: 'YNI' , exchange3: ''},
	{exchange1: ' ', exchange2: 'RIT20', exchange3: ''},
	{exchange1: ' ', exchange2: 'FET' , exchange3: ''},
	{exchange1: ' ', exchange2: 'LAT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CELO', exchange3: ''},
	{exchange1: ' ', exchange2: 'DIA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CSPR', exchange3: ''},
	{exchange1: ' ', exchange2: 'SWRV' , exchange3: ''},
	{exchange1: ' ', exchange2: 'HOG' , exchange3: ''},	
	{exchange1: ' ', exchange2: 'XYM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SKL', exchange3: ''},
	{exchange1: ' ', exchange2: 'GEN', exchange3: ''},
	{exchange1: ' ', exchange2: 'BSCX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BHD', exchange3: ''},
	{exchange1: ' ', exchange2: 'AFEN', exchange3: ''},
	{exchange1: ' ', exchange2: 'DPI' , exchange3: ''},		
	{exchange1: ' ', exchange2: 'ULT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'MVEDA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SOTA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ELT', exchange3: ''},
	{exchange1: ' ', exchange2: 'DEGO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'MBS' , exchange3: ''},		
	{exchange1: ' ', exchange2: 'L3P' , exchange3: ''},
	{exchange1: ' ', exchange2: 'GUSD', exchange3: ''},
	{exchange1: ' ', exchange2: 'OVR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ECELL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'LABS' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SHDC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'AAVE' , exchange3: ''},
	{exchange1: ' ', exchange2: 'GFX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'PAPEL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'RLY' , exchange3: ''},
	{exchange1: ' ', exchange2: 'FLY' , exchange3: ''},
	{exchange1: ' ', exchange2: 'JST' , exchange3: ''},
	{exchange1: ' ', exchange2: 'NCT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'AR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'AKT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'JULD' , exchange3: ''},
	{exchange1: ' ', exchange2: 'EWT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'FTM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BXTB' , exchange3: ''},
	{exchange1: ' ', exchange2: 'PIG' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ELON' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BAL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'TFF' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BSP' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ZNC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'LIEN' , exchange3: ''},
	{exchange1: ' ', exchange2: 'XTZ' , exchange3: ''},
	{exchange1: ' ', exchange2: 'MANA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'OKB' , exchange3: ''},
	{exchange1: ' ', exchange2: 'NWC' , exchange3: ''},	
	{exchange1: ' ', exchange2: 'WORLD' , exchange3: ''},
	{exchange1: ' ', exchange2: 'RFUEL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'MIR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'KSM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'STORJ' , exchange3: ''},
	{exchange1: ' ', exchange2: 'XEM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'QTUM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'REV' , exchange3: ''},
	{exchange1: ' ', exchange2: 'NEXO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'AKITA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'WNXM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'DEVE' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ANY' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BERRY' , exchange3: ''},
	{exchange1: ' ', exchange2: '1INCH' , exchange3: ''},
	{exchange1: ' ', exchange2: 'VCEGG' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ENJ' , exchange3: ''},
	{exchange1: ' ', exchange2: 'KLV' , exchange3: ''},
	{exchange1: ' ', exchange2: 'PWAY' , exchange3: ''},	
	{exchange1: ' ', exchange2: '$KING' , exchange3: ''},
	{exchange1: ' ', exchange2: 'DODO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'DMS' , exchange3: ''},
	{exchange1: ' ', exchange2: 'EUM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CAKE' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BEC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'FIL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'MATH' , exchange3: ''},
	{exchange1: ' ', exchange2: 'NAUT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'RFI' , exchange3: ''},
	{exchange1: ' ', exchange2: 'TERN' , exchange3: ''},
	{exchange1: ' ', exchange2: 'LAYER' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BTU' , exchange3: ''},
	{exchange1: ' ', exchange2: 'THETA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'GIX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BAKE' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SHIB' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BIFI' , exchange3: ''},
	{exchange1: ' ', exchange2: 'NULS' , exchange3: ''},
	{exchange1: ' ', exchange2: 'WTK' , exchange3: ''},
	{exchange1: ' ', exchange2: 'QM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'REN' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ALGO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'DORA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'HT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'GSX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'HAKKA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BCVT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ICP' , exchange3: ''},
	{exchange1: ' ', exchange2: 'VCC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'OCC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'EPK' , exchange3: ''},
	{exchange1: ' ', exchange2: 'DOT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CRU' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ANC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'XAG' , exchange3: ''},
	{exchange1: ' ', exchange2: 'RMT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'WOO' , exchange3: ''},	
	{exchange1: ' ', exchange2: 'VTHO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'OM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CHZ' , exchange3: ''},
	{exchange1: ' ', exchange2: 'JULB' , exchange3: ''},
	{exchange1: ' ', exchange2: 'PCL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ATOM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'UMA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'GBT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'TRN' , exchange3: ''},
	{exchange1: ' ', exchange2: 'RSR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'INJ' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CRV' , exchange3: ''},
	{exchange1: ' ', exchange2: 'EDDA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'MOMA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'VOX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CRO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'FOX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ASS' , exchange3: ''},
	{exchange1: ' ', exchange2: 'QRX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'UMB' , exchange3: ''},
	{exchange1: ' ', exchange2: 'TRU' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CPC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'OCEAN' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SRK' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BREW' , exchange3: ''},
	{exchange1: ' ', exchange2: 'CELR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'LINA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SAND' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ADA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'PDAO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'PLU' , exchange3: ''},
	{exchange1: ' ', exchange2: 'TFUEL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'FFA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'LRC' , exchange3: ''},
	{exchange1: ' ', exchange2: 'APL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'XDNA' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BRT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SG' , exchange3: ''},
	{exchange1: ' ', exchange2: 'BMX' , exchange3: ''},
	{exchange1: ' ', exchange2: 'HOT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'PETRO' , exchange3: ''},
	{exchange1: ' ', exchange2: 'POLS' , exchange3: ''},
	{exchange1: ' ', exchange2: 'WHIRL' , exchange3: ''},
	{exchange1: ' ', exchange2: 'RDD' , exchange3: ''},
	{exchange1: ' ', exchange2: 'STARS' , exchange3: ''},
	{exchange1: ' ', exchange2: 'WINR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ARES' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SUSHI' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SATOZ' , exchange3: ''},
	{exchange1: ' ', exchange2: 'NDAU' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SXP' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SRM' , exchange3: ''},
	{exchange1: ' ', exchange2: 'ELONGATE' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SAFESUN' , exchange3: ''},
	{exchange1: ' ', exchange2: 'MOONSHOT' , exchange3: ''},
	{exchange1: ' ', exchange2: 'FULLSEND' , exchange3: ''},
	{exchange1: ' ', exchange2: 'SAFEMARS' , exchange3: ''},
	{exchange1: ' ', exchange2: 'VANCAT' , exchange3: ''},	
	{exchange1: ' ', exchange2: 'SAFESTAR' , exchange3: ''},
	{exchange1: ' ', exchange2: 'VCSPERM' , exchange3: ''},
	{exchange1: ' ', exchange2: '' , exchange3: 'XLA'},
	{exchange1: ' ', exchange2: '' , exchange3: 'DYN'},
	{exchange1: ' ', exchange2: '' , exchange3: 'PTOY'},
	{exchange1: ' ', exchange2: '' , exchange3: 'RX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'MELLO'},
	{exchange1: ' ', exchange2: '' , exchange3: 'PWC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'XSN'},
	{exchange1: ' ', exchange2: '' , exchange3: 'DAI'},	
	{exchange1: ' ', exchange2: '' , exchange3: 'ZEN'},
	{exchange1: ' ', exchange2: '' , exchange3: '3CS'},
	{exchange1: ' ', exchange2: '' , exchange3: 'NCAT'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SUN'},
	{exchange1: ' ', exchange2: '' , exchange3: 'LIBFX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'STON'},
	{exchange1: ' ', exchange2: '' , exchange3: 'COPTER'},
	{exchange1: ' ', exchange2: '' , exchange3: 'EVX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'RPZX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'ASH'},
	{exchange1: ' ', exchange2: '' , exchange3: 'NTK'},
	{exchange1: ' ', exchange2: '' , exchange3: 'MEXC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'HOGE'},
	{exchange1: ' ', exchange2: '' , exchange3: 'DOV'},
	{exchange1: ' ', exchange2: '' , exchange3: 'EDC'},	
	{exchange1: ' ', exchange2: '' , exchange3: 'KNC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'AMLT'},
	{exchange1: ' ', exchange2: '' , exchange3: 'FME'},
	{exchange1: ' ', exchange2: '' , exchange3: 'XFC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'HTML'},
	{exchange1: ' ', exchange2: '' , exchange3: 'TYC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'GSMT'},
	{exchange1: ' ', exchange2: '' , exchange3: 'XCUR'},
	{exchange1: ' ', exchange2: '' , exchange3: 'BSBT'},
	{exchange1: ' ', exchange2: '' , exchange3: 'PIVX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'XDN'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SOLO'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SAFU'},
	{exchange1: ' ', exchange2: '' , exchange3: 'FROGE'},
	{exchange1: ' ', exchange2: '' , exchange3: 'MNDAO'},
	{exchange1: ' ', exchange2: '' , exchange3: 'CCXX'},	
	{exchange1: ' ', exchange2: '' , exchange3: 'DTUBE'},
	{exchange1: ' ', exchange2: '' , exchange3: 'ICHI'},
	{exchange1: ' ', exchange2: '' , exchange3: 'KOCJ'},
	{exchange1: ' ', exchange2: '' , exchange3: 'DECL'},
	{exchange1: ' ', exchange2: '' , exchange3: 'VNLA'},
	{exchange1: ' ', exchange2: '' , exchange3: 'TLW'},
	{exchange1: ' ', exchange2: '' , exchange3: 'KUPP'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SMARS'},
	{exchange1: ' ', exchange2: '' , exchange3: 'LONG'},
	{exchange1: ' ', exchange2: '' , exchange3: 'BLCT'},
	{exchange1: ' ', exchange2: '' , exchange3: 'AWG'},
	{exchange1: ' ', exchange2: '' , exchange3: 'NEEO'},
	{exchange1: ' ', exchange2: '' , exchange3: 'RAK'},
	{exchange1: ' ', exchange2: '' , exchange3: 'DAA'},
	{exchange1: ' ', exchange2: '' , exchange3: 'OMG'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SFC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'MARTK'},
	{exchange1: ' ', exchange2: '' , exchange3: 'MEDI'},
	{exchange1: ' ', exchange2: '' , exchange3: 'BEER'},
	{exchange1: ' ', exchange2: '' , exchange3: 'HAPPY'},
	{exchange1: ' ', exchange2: '' , exchange3: 'JNB'},
	{exchange1: ' ', exchange2: '' , exchange3: 'PHTF'},
	{exchange1: ' ', exchange2: '' , exchange3: 'HMR'},
	{exchange1: ' ', exchange2: '' , exchange3: 'DOGIRA'},
	{exchange1: ' ', exchange2: '' , exchange3: 'OVO'},
	{exchange1: ' ', exchange2: '' , exchange3: 'YTA'},
	{exchange1: ' ', exchange2: '' , exchange3: 'UTED'},
	{exchange1: ' ', exchange2: '' , exchange3: 'VCG'},
	{exchange1: ' ', exchange2: '' , exchange3: 'AWX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SLT'},
	{exchange1: ' ', exchange2: '' , exchange3: 'ORFANO'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SATT'},
	{exchange1: ' ', exchange2: '' , exchange3: 'BFIRE'},
	{exchange1: ' ', exchange2: '' , exchange3: 'TNC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'BNOX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'BOLC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'XMR'},
	{exchange1: ' ', exchange2: '' , exchange3: 'KALA'},
	{exchange1: ' ', exchange2: '' , exchange3: 'SPE'},
	{exchange1: ' ', exchange2: '' , exchange3: 'DEEZ'},
	{exchange1: ' ', exchange2: '' , exchange3: 'XEMX'},
	{exchange1: ' ', exchange2: '' , exchange3: 'ACOIN'},
	{exchange1: ' ', exchange2: '' , exchange3: 'CFXQ'},
	{exchange1: ' ', exchange2: '' , exchange3: 'RXC'},
	{exchange1: ' ', exchange2: '' , exchange3: 'LOTTO'},
	{exchange1: ' ', exchange2: '' , exchange3: 'MKR'},
	{exchange1: ' ', exchange2: '' , exchange3: 'REAL'},	
	
]

class Inputs extends React.Component {
  constructor(props) {
	super(props);
	this.state = { tokenValid: false,  buyValid: false, sellValid: false,  bufferValid: false, formValid: false, token:'', exchange1:'', exchange1_symbol:'', exchange2:'', exchange2_symbol:'', exchange3:'', exchange3_symbol:'', potential:'', percentage:'', buy:'', sell:'', status:'', transaction:'', trend:'', buy_fee:'', transfer_fee:'', sell_fee:'', buffer_fee:'', total:''};
	this.handleClear = this.handleClear.bind(this);
  }
  handleChange(propertyName, e) {	  
	const change = {};
	change[propertyName] = e.target.value;
	this.setState(change);
	this.setState({[e.target.name]: e.target.value},  () => { this.validateField(e.target.name, e.target.value, false) });
  }
  handleClear() {
	this.setState({ token:'', exchange1:'', exchange2:'', exchange3:'', potential:'', percentage:'', buy:'', sell:'', status:'', transaction:'', trend:'', total:''});
  }
  
  validateField(fieldName, value, valueExist) {
    if (value.length >=1) { valueExist = true; } else {valueExist = false; }
    switch(fieldName) {
      case 'token':
        this.setState({tokenValid: valueExist}, ()=>{
			this.setState({tokenValid: valueExist});
		})
        break;
	  case 'buy_fee':
        this.setState({buyValid: valueExist}, ()=>{
			this.setState({buyValid: valueExist});
		})
        break;
	  case 'sell_fee':
        this.setState({sellValid: valueExist}, ()=>{
			this.setState({sellValid: valueExist});
		})
        break;
      case 'buffer_fee':
        this.setState({bufferValid: valueExist}, ()=>{
			this.setState({bufferValid: valueExist});
		})
        break;
      default:
        break;
    }
    this.setState({formValid: this.state.tokenValid && this.state.buyValid && this.state.sellValid && this.state.bufferValid}, ()=>{
		this.setState({formValid: this.state.tokenValid && this.state.buyValid && this.state.sellValid && this.state.bufferValid});
	})
  }
    
  render(){
	return  <div className='search-box container-fluid'>
				<div className="row">
					<div className='col-md-4'><Input name='token' change={this.handleChange.bind(this, 'token')} value={this.state.token} placeholder='Token' /></div>
					<div className='col-md-2'><Input0 name='buy_fee' change={this.handleChange.bind(this, 'buy_fee')} value={this.state.buy_fee} placeholder='Fees In' /></div>
					<div className='col-md-2'><Input0 name='sell_fee' change={this.handleChange.bind(this, 'sell_fee')} value={this.state.sell_fee} placeholder='Fees Out' /></div>
					<div className='col-md-2'><Input0 name='buffer_fee' change={this.handleChange.bind(this, 'buffer_fee')} value={this.state.buffer_fee} placeholder='Buffer Fee' /></div>
					<div className='col-md-2 text-right'><AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/></div>			
				</div>	   
			</div>
  }
}
/*	<div className="col-md-2"></div>	
	<div className="col-md-3 mt-3">
		<ul className="navbar-nav ">
			<li className="nav-item"><a href="https://coinmarketcap.com/" target='_blank' className="out-link" rel="noreferrer">Coin Market Cap</a></li>
			<li className="nav-item"><a href="https://coingecko.com/" target='_blank' className="out-link" rel="noreferrer">CoinGecko</a></li>
			<li className="nav-item"><a href="https://poocoin.app/" target='_blank' className="out-link" rel="noreferrer">Poocoin</a></li>
			<li className="nav-item"><a href="https://bscscan.com/" target='_blank' className="out-link" rel="noreferrer">BSC Scan</a></li>
		</ul>
	  </div>*/
class Input extends React.Component {
  constructor(props) {
	super(props);
	this.state = { value: this.props.value };
  }
  render(){
	return <input type='text' name={this.props.name} autoComplete="off" placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'/>
	}
}

class Input0 extends React.Component {
  constructor(props) {
	super(props);
	this.state = { value: this.props.value };
  }
  render(){
	return <div className="input-group">
			<input type='text' name={this.props.name} autoComplete="off" placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'/>
			<div className="input-group-postpend"><div className="input-group-text">%</div></div>
		</div>
  }
}

class DeleteButton extends React.Component {
	onClick() {
	  this.props.delete.call(null, this.props.uuid);
	}
	
	render(){
		return <td>
		  <div className="cursor text-center" onClick={this.onClick.bind(this)} autoComplete="off" ><img src={Delete} alt="Delete"/></div>
		</td>
	}
}

class UpdateButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.value, buy_token_input:"" };
		this.handleChange = this.handleChange.bind(this);
	}
	onClick() {
	  this.props.update.call(null, this.props.uuid, this.state.buy_token_input);
	}
	handleChange(propertyName, e) {	  
		const change = {};
		change[propertyName] = e.target.value;
		this.setState(change);
	}
	render(){
		return <td><div className="input-group"><input type='text' name="buy_token_input" onChange={this.handleChange.bind(this, 'buy_token_input')} autoComplete="off" className='update-input form-control' /><button type="button" className="btn" onClick={this.onClick.bind(this)}>Go</button></div></td>		
	}
}

class AddButton extends React.Component {
	onClick(){
	  if(this.props.newData.token.length > 0 && this.props.newData.buy_fee.length > 0 && this.props.newData.sell_fee.length > 0 && this.props.newData.buffer_fee.length > 0){	
		this.props.create.call(null, this.props.newData.token, this.props.newData.exchange1, this.props.newData.exchange1_symbol, this.props.newData.exchange2, this.props.newData.exchange2_symbol,this.props.newData.exchange3, this.props.newData.exchange3_symbol, this.props.newData.potential, this.props.newData.percentage, this.props.newData.buy, this.props.newData.sell, this.props.newData.status, this.props.newData.transaction, this.props.newData.trend, this.props.newData.buy_fee, this.props.newData.transfer_fee, this.props.newData.sell_fee, this.props.newData.buffer_fee, this.props.newData.total, this.props.newData.buy_token_input, this.props.newData.after_purchase, this.props.newData.after_transfer, this.props.newData.trading, this.props.newData.pair_price, this.props.newData.post_transfer, this.props.newData.BNB_price, this.props.newData.BNBs, this.props.newData.token_price, this.props.newData.new_tokens, this.props.newData.increase  );
		
		this.props.clear.call(null);
	  }
	}
	render(){
		return <button type="button" className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled}>Add</button>
	}
}

class Column extends React.Component {
  render(){
	if (this.props.type==="token"){
		const token_label = this.props.placesymbol+" ("+this.props.placeholder.toString().substring(0,6) + "..."+this.props.placeholder.toString().substring(36,42)+")";
		return <td>{token_label}</td> 
	} else if (this.props.type === "exchange1" || this.props.type === "exchange2" || this.props.type === "exchange3" ){
		return <td className="small">{this.props.placeholder}</td> 
	} else if (this.props.placeholder === "Red"){
		return <td><span className="text-danger">
		  {this.props.placeholder}
		</span></td> 
	} else if (this.props.placeholder === "Green"){
		return <td><span className="text-success">
		  {this.props.placeholder}
		</span></td> 
	} else if (this.props.placeholder === "Negative"){
		return <td><span className="red-arrow sort-icon"></span></td> 
	} else if (this.props.placeholder === "Positive"){
		return <td><span className="green-arrow sort-icon"></span></td> 
	} else if (this.props.type === "buy_fee" || this.props.type === "sell_fee" || this.props.type === "transfer_fee" || this.props.type === "buffer_fee" || this.props.type === "total"){
		return <td>{this.props.placeholder}%</td> 
	} else if (this.props.type === "increase" ){
		if (Number(this.props.placeholder) >= 0 ){
			return <td className="text-success">{this.props.placeholder}</td> 			
		} else {
			return <td className="text-danger">{this.props.placeholder}</td> 		
		}
	} else {
		return <td>{this.props.placeholder}</td> 
	}	
  }
}

class Row extends React.Component {
  render(){
	return  <tr>
	<Column type='token' placeholder={this.props.token} placesymbol={this.props.exchange1_symbol}/>
	<Column type='exchange1' placeholder={this.props.exchange1} />
	<Column type='exchange2' placeholder={this.props.exchange2} />
	<Column type='exchange3' placeholder={this.props.exchange3} />
	<Column type='potential' placeholder={this.props.potential} />
	<Column type='percentage' placeholder={this.props.percentage} />
	<Column type='buy' placeholder={this.props.buy} />
	<Column type='sell' placeholder={this.props.sell} />
	<Column type='status' placeholder={this.props.status} />
	<Column type='transaction' placeholder={this.props.transaction} />
	<Column type='trend' placeholder={this.props.trend} />
	<DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
	</tr>
  }
}

class Table extends React.Component {
  render(){
	return <table className="table">
				<thead>
					<tr>
						<th className="table-header">TOKEN</th>
						<th className="table-header">EXCHANGE<br/>1</th>
						<th className="table-header">EXCHANGE<br/>2</th>
						<th className="table-header">EXCHANGE<br/>3</th>
						<th className="table-header">YIELD<br/>POTENTIAL</th>
						<th className="table-header">%</th>
						<th className="table-header">BUY<br/>RECOMM.</th>
						<th className="table-header">SELL<br/>RECOMM.</th>
						<th className="table-header">STATUS</th>
						<th className="table-header">TRANSACTIONS <br/>IN THE LAST 24Hrs</th>
						<th className="table-header text-center">TREND</th>
						<th className="table-header text-center">ACTION</th>
					</tr>
				</thead>
				<tbody>
					{
					  this.props.datas.map((data, i) => {
						return <Row key={i} uuid={i} token={data.token} exchange1={data.exchange1} exchange1_symbol = {data.exchange1_symbol} exchange2={data.exchange2} exchange3={data.exchange3} potential={data.potential} percentage={data.percentage} buy={data.buy} sell={data.sell} status={data.status} transaction={data.transaction} trend={data.trend} onDelete={this.props.onDelete} />
					  })
					}
				</tbody>
			</table>
  }
}

class Row1 extends React.Component {
  render(){
	return  <tr>
	<Column type='token' placeholder={this.props.token} placesymbol={this.props.exchange1_symbol}/>
	<Column type='buy_fee' placeholder={this.props.buy_fee} />
	<Column type='transfer_fee' placeholder={this.props.transfer_fee} />
	<Column type='sell_fee' placeholder={this.props.sell_fee} />
	<Column type='buffer_fee' placeholder={this.props.buffer_fee} />
	<Column type='total' placeholder={this.props.total} />
	</tr>
  }
}

class Table1 extends React.Component {
  render(){
	return <table className="table">
				<thead>
					<tr>
						<th className="table-header">TOKEN</th>
						<th className="table-header">BUY</th>
						<th className="table-header">TRANSFER</th>
						<th className="table-header">SELL</th>
						<th className="table-header">BUFFER</th>
						<th className="table-header">TOTAL</th>
					</tr>
				</thead>
				<tbody>
					{
					  this.props.datas.map((data, i) => {
						return <Row1 key={i} uuid={i} token={data.token} exchange1_symbol = {data.exchange1_symbol} buy_fee={data.buy_fee} transfer_fee={data.transfer_fee} sell_fee={data.sell_fee} buffer_fee={data.buffer_fee} total={data.total}/>
					  })
					}
				</tbody>
			</table>
  }
}

class Row2 extends React.Component {
  render(){
	return  <tr>
	<Column type='token' placeholder={this.props.token} placesymbol={this.props.exchange1_symbol}/>
	<UpdateButton uuid={this.props.uuid} update={this.props.onUpdate} value={this.props.buy_token_input}/>
	<Column type='after_purchase' placeholder={this.props.after_purchase} />
	<Column type='after_transfer' placeholder={this.props.after_transfer} />
	<Column type='trading' placeholder={this.props.trading} />
	<Column type='pair_price' placeholder={this.props.pair_price} />
	<Column type='post_transfer' placeholder={this.props.post_transfer} />
	<Column type='BNB_price' placeholder={this.props.BNB_price} />
	<Column type='BNBs' placeholder={this.props.BNBs} />
	<Column type='token_price' placeholder={this.props.token_price} />
	<Column type='new_tokens' placeholder={this.props.new_tokens} />
	<Column type='increase' placeholder={this.props.increase} />
	</tr>
  }
}

class Table2 extends React.Component {
  render(){
	return <table className="table">
				<thead>
					<tr>						
						<th className="table-header">TOKENS</th>
						<th className="table-header">TOKENS TO BUY<br/>ON LOWEST<br/>PRICED EXCHANGE</th>
						<th className="table-header">TOKENS<br/>AFTER<br/>PURCHASE</th>
						<th className="table-header">TOKENS<br/>AFTER<br/>TRANSFER</th>
						<th className="table-header">TRADING<br/>PAIR</th>
						<th className="table-header">TRADING<br/>PAIR<br/>PRICE</th>
						<th className="table-header">NET<br/>POST<br/>TRANSFER</th>
						<th className="table-header">BNB<br/>PRICE</th>
						<th className="table-header">BNBS</th>
						<th className="table-header">TOKENS FOR<br/>BNB/TOKEN<br/>PRICE</th>
						<th className="table-header">NEW<br/>TOKENS</th>
						<th className="table-header">INCREASE/<br/>DECREASE</th>
					</tr>
				</thead>
				<tbody>
					{
					  this.props.datas.map((data, i) => {
						return <Row2 key={i} uuid={i} token={data.token} exchange1_symbol = {data.exchange1_symbol} buy_token_input={data.buy_token_input} onUpdate={this.props.onUpdate} after_purchase={data.after_purchase} after_transfer={data.after_transfer} trading={data.trading} pair_price={data.pair_price} post_transfer={data.post_transfer} BNB_price={data.BNB_price} BNBs={data.BNBs} token_price={data.token_price} new_tokens={data.new_tokens} increase={data.increase}/>
					  })
					}
				</tbody>
			</table>
  }
}

class Loading extends React.Component {
  render(){
	if (this.props.loading) {
		return <div className="justify-content-center navbar mb-3"><img width="100" height="100" src="/2.gif" alt="Please wait for loading"/></div>
	} else {
		return <div></div>
	}
  }
}

class Token extends React.Component {
  constructor(props) {
	super(props);
	this.state = { datas: datasByRow, counter: datasByRow.length, symbols: symbolByRow, symbol_counter: symbolByRow.length, loading:false};
	this.onDelete = this.onDelete.bind(this);
	this.onCreate = this.onCreate.bind(this);
	this.onUpdate = this.onUpdate.bind(this);
	this.onRefresh = this.onRefresh.bind(this);
  }

  onDelete(id) {
	const data_list = this.state.datas;
	data_list.splice(id, 1);
	this.setState({datas: data_list, counter: data_list.length});
  }
  
  async onUpdate(id, buy_token_input) {
	const data_list = this.state.datas;
	//data_list.splice(id, 1);
	data_list[id].buy_token_input=buy_token_input;
	data_list[id].after_purchase=buy_token_input * (1 - data_list[id].buy_fee/100);
	data_list[id].after_transfer=data_list[id].after_purchase * (1 - data_list[id].sell_fee/100); 
	data_list[id].trading="USDT";
	data_list[id].pair_price=data_list[id].exchange1;
	data_list[id].post_transfer=(data_list[id].after_transfer * data_list[id].pair_price).toFixed(3);
	
	await fetch("https://api.pancakeswap.info/api/tokens/"+data_list[id].token).then(async response => {
		const data = await response.json();
		data_list[id].BNB_price = (Number(data.data.price) / Number(data.data.price_BNB)).toFixed(0);
		data_list[id].token_price=(1/Number(data.data.price_BNB)).toFixed(0);
	})
	.catch(error => {
		data_list[id].BNB_price="Did not get"	
	})
	
	data_list[id].BNBs=(data_list[id].post_transfer / data_list[id].BNB_price).toFixed(8);
	data_list[id].new_tokens=(data_list[id].BNBs * data_list[id].token_price).toFixed(2);
	data_list[id].increase=(data_list[id].new_tokens - buy_token_input).toFixed(2);	
	
	this.setState({datas: data_list, counter: data_list.length});
  }
  
  async onRefresh(id, transaction, status, trend){
	this.setState({loading:true}, ()=>{
			this.setState({loading:true});
	})

	await Promise.all(this.state.datas.map(async ( data1, i) => {
		await fetch("https://api.pancakeswap.info/api/tokens/"+data1.token).then(async response => {
			const data = await response.json();
			this.state.datas[i].exchange1= data.data.price.substring(0, 10);
			this.state.datas[i].exchange1_symbol= data.data.symbol
			this.state.symbols.map((data, j) => {
				if (data1.exchange1_symbol === data.exchange2 ) {
					this.state.datas[i].exchange2_symbol = data.exchange2;
					this.state.datas[i].exchange3_symbol = data.exchange3;
				} else if (data1.exchange1_symbol === data.exchange3){
					this.state.datas[i].exchange3_symbol = data.exchange1_symbol;
					this.state.datas[i].exchange2_symbol = "";
				}
				return this.state;
			})
		})
		.catch(error => {
			this.state.datas[i].exchange1="Token incorrect"
		})
		
		await axios.get(process.env.REACT_APP_SERVER_URL+'/exchange/exchange2', { params : { symbol: data1.exchange2_symbol}}).then( async res => {
				const data = await JSON.parse(res.data).data.tickers[0];
				this.state.datas[i].exchange2=data.best_ask;
			}).catch(err => {
				console.error(err);
			})
	
		await axios.get(process.env.REACT_APP_SERVER_URL+'/exchange/exchange3?symbol='+data1.exchange3_symbol).then( async res => {
				  const data = await JSON.parse(res.data);
				  this.state.datas[i].exchange3 = data.result.ask;
			}).catch(err => {
				console.error(err);
			})
		
		await axios.get(process.env.REACT_APP_SERVER_URL+'/exchange/transaction?token='+data1.token).then( async res => {
			const data = await JSON.parse(res.data);
			transaction = status = 0;
			data["total_volumes"].map(function(object, i){
				transaction = transaction + object[1];
				status = i+1;
				return status;
			})
			this.state.datas[i].transaction = parseInt(transaction / status);
		}).catch(err => {
			console.error(err);
		})
			
			
/*
		await fetch("https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/"+data1.token+"/market_chart/?vs_currency=usd&days=1").then(async response => {
			const data = await response.json();			
			transaction = 0;
			status = 0;
			data["total_volumes"].map(function(object, i){
				transaction = transaction + object[1];
				status = i+1;
				return status;
			})
			this.state.datas[i].transaction = parseInt(transaction / status);
		})
		.catch(error => {
			this.state.datas[i].transaction="Token incorrect"		
		})

		await fetch("https://api.coingecko.com/api/v3/coins/safemoon/market_chart?vs_currency=usd&days=2").then(async response => {
			const data = await response.json();
			trend = 0;
			status = 1;
			data["prices"].map(function(object, i){
				if (i>24) {	trend = trend + object[1];    status = i++;	}
				return status;
			})
			status = status - 24;
			this.state.datas[i].trend = trend / status;
		})
		.catch(error => {
			this.setState({ errorMessage: error.toString() });
			console.error('There was an error!', error);
		})
*/
		const max = Math.max(Number(this.state.datas[i].exchange1), Number(this.state.datas[i].exchange2), Number(this.state.datas[i].exchange3));
		const min = Math.min(Number(this.state.datas[i].exchange1), Number(this.state.datas[i].exchange2), Number(this.state.datas[i].exchange3));		
		this.state.datas[i].potential = (max-min).toFixed(8)
		
		this.state.datas[i].percentage = (100-(min/max*100)).toFixed(2);
		if (this.state.datas[i].percentage > 30) {this.state.datas[i].status = "Green"; this.state.datas[i].trend="Positive"} else { this.state.datas[i].status = "Red"; this.state.datas[i].trend="Negative"}	
		
		if (max === Number(this.state.datas[i].exchange1)) { this.state.datas[i].sell = "Sell E1";
		} else if (max === Number(this.state.datas[i].exchange2)){ this.state.datas[i].sell = "Sell E2";
		} else { this.state.datas[i].sell = "Sell E3";
		}
		
		if (min === Number(this.state.datas[i].exchange1)) { this.state.datas[i].buy = "Buy E1";
		} else if (min === Number(this.state.datas[i].exchange2)){ this.state.datas[i].buy = "Buy E2";
		} else { this.state.datas[i].buy = "Buy E3";
		}	
		
		this.state.datas[i].transfer_fee = this.state.datas[i].sell_fee;
		this.state.datas[i].total = Number(this.state.datas[i].buy_fee) + Number(this.state.datas[i].sell_fee) + Number(this.state.datas[i].transfer_fee) + Number(this.state.datas[i].buffer_fee);
		
		if (this.state.datas[i].buy_token_input !== undefined && this.state.datas[i].buy_token_input !== "") {
			await fetch("https://api.pancakeswap.info/api/tokens/"+data1.token).then(async response => {
				const data = await response.json();
				this.state.datas[i].BNB_price = (Number(data.data.price) / Number(data.data.price_BNB)).toFixed(0);
				this.state.datas[i].token_price=(1/Number(data.data.price_BNB)).toFixed(0);
			})
			.catch(error => {
				this.state.datas[i].BNB_price="Did not get"	
			})
			
			this.state.datas[i].BNBs=(this.state.datas[i].post_transfer / this.state.datas[i].BNB_price).toFixed(8);
			this.state.datas[i].new_tokens=(this.state.datas[i].BNBs * this.state.datas[i].token_price).toFixed(2);
			this.state.datas[i].increase=(this.state.datas[i].new_tokens - this.state.datas[i].buy_token_input).toFixed(2);	
		}
	}))
    this.setState({loading : false})
  }
  
 

  async onCreate(token, exchange1, exchange1_symbol, exchange2, exchange2_symbol, exchange3, exchange3_symbol, potential, percentage, buy, sell, status, transaction, trend, buy_fee, transfer_fee, sell_fee, buffer_fee, total, buy_token_input, after_purchase, after_transfer, trading, pair_price, post_transfer, BNB_price, BNBs, token_price, new_tokens, increase){
	this.setState({loading : true})
    await fetch("https://api.pancakeswap.info/api/tokens/"+token).then(async response => {
		const data = await response.json();
		exchange1= data.data.price.substring(0, 10);
		exchange1_symbol = data.data.symbol;
		this.state.symbols.map((data, i) => {
			if (exchange1_symbol === data.exchange2 ) {
				exchange2_symbol = data.exchange2;
				exchange3_symbol = data.exchange3;
			} else if (exchange1_symbol === data.exchange3){
				exchange3_symbol = data.exchange1_symbol; exchange2_symbol = "";
			}
			return this.state;
		})
	})
	.catch(error => {
		exchange1="Token incorrect"	
	})

	await axios.get(process.env.REACT_APP_SERVER_URL+'/exchange/exchange2', { params : { symbol: exchange2_symbol}}).then( async res => {
			const data = await JSON.parse(res.data).data.tickers[0];
			exchange2 = data.best_ask;
		}).catch(err => {
			console.error(err);
		})
	
	await axios.get(process.env.REACT_APP_SERVER_URL+'/exchange/exchange3?symbol='+exchange3_symbol).then( async res => {
			  const data = await JSON.parse(res.data);
			  exchange3 = data.result.ask;
		}).catch(err => {
			console.error(err);
		})

	await axios.get(process.env.REACT_APP_SERVER_URL+'/exchange/transaction?token='+token).then( async res => {
			const data = await JSON.parse(res.data);
			transaction = status = 0;
			data["total_volumes"].map(function(object, i){
				transaction = transaction + object[1];
				status = i+1;
				return status;
			})
			transaction = parseInt(transaction / status);
		}).catch(err => {
			console.error(err);
		})
	
/*
	await fetch("https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/"+token+"/market_chart/?vs_currency=usd&days=1").then(async response => {
		const data = await response.json();
		transaction = 0;
		data["total_volumes"].map(function(object, i){
			transaction = transaction + object[1];
			status = i+1;
			return status;
		})
		transaction = parseInt(transaction / status);
	})
	.catch(error => {
		transaction="Token incorrect"		
	})
 
    await fetch("https://api.coingecko.com/api/v3/coins/"+exchange1_symbol.toLowerCase()+"/market_chart?vs_currency=usd&days=2").then(async response => {
		const data = await response.json();
		trend = 0;
		status = 1;
		data["prices"].map(function(object, i){
			if (i>24) {	trend = trend + object[1];    status = i++;	}
			return status;
		})
		status = status - 24;
		trend = trend / status;
	})
	.catch(error => {
		this.setState({ errorMessage: error.toString() });
		console.error('There was an error!', error);
	})	
		  */
	const max = Math.max(Number(exchange1), Number(exchange2), Number(exchange3));
	const min = Math.min(Number(exchange1), Number(exchange2), Number(exchange3));		
	potential = (max-min).toFixed(8)
	
	percentage = (100-(min/max*100)).toFixed(2);
	if (percentage > 30) {status = "Green"; trend="Positive"} else { status = "Red"; trend="Negative"}	
	//if (trend - potential) {status = "Red"; trend="Negative"} else { status = "Green"; trend="Positive"}	
	
	if (max === Number(exchange1)) { sell = "Sell E1";
	} else if (max === Number(exchange2)){ sell = "Sell E2";
	} else { sell = "Sell E3";
	}
	
	if (min === Number(exchange1)) { buy = "Buy E1";
	} else if (min === Number(exchange2)){ buy = "Buy E2";
	} else { buy = "Buy E3";
	}	
	
	transfer_fee = sell_fee;
	total = Number(buy_fee) + Number(sell_fee) + Number(transfer_fee) + Number(buffer_fee);
		
    this.setState({datas: this.state.datas.concat([{ token:token, exchange1:exchange1, exchange1_symbol:exchange1_symbol, exchange2:exchange2, exchange2_symbol:exchange2_symbol, exchange3:exchange3, exchange3_symbol:exchange3_symbol, potential:potential, percentage:percentage, buy:buy, sell:sell, status:status, transaction:transaction, trend:trend, buy_fee:buy_fee, sell_fee:sell_fee, transfer_fee:transfer_fee, buffer_fee:buffer_fee, total:total, buy_token_input:buy_token_input, after_purchase:after_purchase, after_transfer:after_transfer, trading:trading, pair_price:pair_price, post_transfer:post_transfer, BNB_price:BNB_price, BNBs:BNBs, token_price:token_price, new_tokens:new_tokens, increase:increase}])})
	
	this.setState({loading : false})
  }

  render(){
	return  <div className="exchange">
				<div className="top-bar">
					<h3 className="page-title">Exchange Arbitrage</h3>
					<button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
				</div>
				<div className="container-fluid small" datas={this.state.datas} >
					<div className="mb-5">
						<h3>Token</h3>
						<Inputs onCreate={this.onCreate}/>
						<Loading loading={this.state.loading}/>
						<div>
							<Table datas={this.state.datas} onDelete={this.onDelete} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 mb-5">
							<h3 className="mb-4">Tax Calculation</h3>					
							<div>
								<Table1 datas={this.state.datas}  />
							</div>
						</div>
					</div>
					<div className="mb-5">
						<h3 className="mb-4">Net Calculation</h3>					
						<div>
							<Table2 datas={this.state.datas} onUpdate={this.onUpdate} />
						</div>
					</div>
				</div>	
			</div>

  }
}
	
export default Token;



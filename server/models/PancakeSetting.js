// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const config = require('../config/mongoose'); 
// Create Setting Schema
const PancakeSettingSchema = new config.Schema({
  /**
   * Number of repetitions per day
   */
  pancakeRepeatedNumber: {
    type: Number
  },
  /**
   * slippage
   */
  pancakeSlippage: {
    type: Number
  },
  /**
   * Action status
   */
  pancakeActionStatus: {
    type: Number
  },
  /**
   * Date that the setting is registered or updated.
   */
  create: {
	type: Date,
	default: Date.now 	
  }
});

module.exports = PancakeSetting = config.mongoose.model("pancakesettings", PancakeSettingSchema);

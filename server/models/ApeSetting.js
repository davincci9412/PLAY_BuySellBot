// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const config = require('../config/mongoose'); 
// Create Setting Schema
const ApeSettingSchema = new config.Schema({
  /**
   * Number of repetitions per day
   */
  apeRepeatedNumber: {
    type: Number
  },
  /**
   * slippage
   */
  apeSlippage: {
    type: Number
  },
  /**
   * Action status
   */
  apeActionStatus: {
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

module.exports = ApeSetting = config.mongoose.model("apesettings", ApeSettingSchema);

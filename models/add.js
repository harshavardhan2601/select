var mongoose = require('mongoose');
var StatesSchema = new mongoose.Schema({
    country_name:String,
    state_name: String,
    district_name:String,
    //-state_code: String,
    status: Number
});
mongoose.model('Drop', StatesSchema);
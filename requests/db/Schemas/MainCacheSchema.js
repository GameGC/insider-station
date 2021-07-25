const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const ObjectId = Schema.ObjectId;
const Number = Schema.Types.Number;

const RiskCacheSchema= new Schema(
    {
        auditRisk:Number,
        boardRisk:Number,
        compensationRisk:Number,
        shareHolderRightsRisk:Number,
        overallRisk:Number
    });

const MainCacheSchema= new Schema({
    id: Number,
    tiker: String,
    exchange: String,
    industry:String,
    sector:String,
    description:String,
    risk:RiskCacheSchema,
});

mongoose.model('MainCacheSchema', MainCacheSchema);
mongoose.model('MainCacheSchema/RiskCacheSchema', RiskCacheSchema);

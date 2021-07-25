import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'RiskCompanyInfo', COLLECTION_NAME = 'CompanyInfo';

export default interface RiskCompanyInfo extends Document {
    id: number,
    auditRisk:number,
    boardRisk:number,
    compensationRisk:number,
    shareHolderRightsRisk:number,
    overallRisk:number,
}

const schema = new Schema({
    _id: Number,
    auditRisk: {
        type:Number,
        required:true,
        max:20,
    },
    boardRisk: {
        type:Number,
        required:true,
        max:20,
    },
    compensationRisk: {
        type:Number,
        required:true,
        max:20,
    },
    shareHolderRightsRisk: {
        type:Number,
        required:true,
        max:20,
    },
    overallRisk: {
        type:Number,
        required:true,
        max:20,
    },
},{ versionKey: false });
export const RiskCompanyInfoModel = model<RiskCompanyInfo>(DOCUMENT_NAME, schema, COLLECTION_NAME);

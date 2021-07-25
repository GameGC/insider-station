import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'RelatedCompanysInfo', COLLECTION_NAME = 'CompanyInfo/Related';

export default interface RelatedCompanysInfo extends Document {
    id: number,
    companysIds: Array<number|string>
}

const schema = new Schema({
    _id: Number,
    companysIds:{
        type:Array<Number | String>()
    }
},{ versionKey: false });
export const RelatedCompanysInfoModel = model<RelatedCompanysInfo>(DOCUMENT_NAME, schema, COLLECTION_NAME);

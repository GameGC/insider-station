import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'MainCompanyInfo', COLLECTION_NAME = 'CompanyInfo';

export default interface MainCompanyInfo extends Document {
    id: number,
    tiker: string,
    exchange: string,
    description?:string,
    industry?:string,
    sector?:string,
}

const schema = new Schema({
    _id: Number,
    tiker:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxlength:5
    },
    exchange:{
        type:String,
        required:true,
        trim:true,
        maxlength:11
    },
    description:String,
    industry:String,
    sector:String,
},{ versionKey: false });
export const MainCompanyInfoModel = model<MainCompanyInfo>(DOCUMENT_NAME, schema, COLLECTION_NAME);

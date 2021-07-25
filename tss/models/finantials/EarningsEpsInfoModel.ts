import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'EarningsEps', COLLECTION_NAME = 'Finantials/EPS';


export interface EarningsEpsInfoElement extends Document
{
    period: Date,
    fact?:number,
    epsAvg: number,
    epsHigh: number,
    epsLow: number,
}

export default interface EarningsEpsInfo extends Document {
    id: number,
    data: EarningsEpsInfoElement[]
}

const childSchema = new Schema({
        period: Date,
        fact: Number,
        epsAvg: Number,
        epsHigh: Number ,
        epsLow: Number,
},{ versionKey: false, _id:undefined});

const schema = new Schema({
    _id: Number,
    data:{
        type:[childSchema]
    }
},{ versionKey: false });
export const EarningsEpsInfoModel = model<EarningsEpsInfo>(DOCUMENT_NAME, schema, COLLECTION_NAME);
export const EarningsEpsInfoModelChild = model<EarningsEpsInfoElement>(DOCUMENT_NAME+childSchema.obj.name,childSchema);


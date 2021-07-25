import {RRSModel} from "./RRSModel";
import RelatedCompanysInfo, {RelatedCompanysInfoModel} from "../models/RelatedCompanysInfoModel";
import {Funhub} from "../dataProviders/finHub";
import {Document, Schema} from "mongoose";

export class get_Related_Companys implements RRSModel
{
    existsId:boolean;
    id:number;
    existsTiker:boolean;
    tiker:string;

    //forwarding
    async RequestByTiker(tiker: string)
    {
        this.existsTiker = await RelatedCompanysInfoModel.exists({_id: tiker.get_TikerHash()});
        this.tiker = tiker;
        return await this.Responce();
    }
    async RequestById(id: number): Promise<RelatedCompanysInfo>
    {
        this.existsId = await RelatedCompanysInfoModel.exists({_id: id});
        this.id= id;
        if (!this.existsId) throw new ReferenceError("nothing found with id,use tiker");
        else return await this.Responce();
    }



    async Responce()
    {
        if(this.existsId) return await RelatedCompanysInfoModel.findById(this.id).lean<RelatedCompanysInfo>().exec()
        else if(this.existsTiker) return await RelatedCompanysInfoModel.findById(this.tiker.get_TikerHash()).lean<RelatedCompanysInfo>().exec()
        else {
            const responce = await Funhub.SimularCompanys(this.tiker);
            let finalResponce= new RelatedCompanysInfoModel();

            finalResponce._id = this.tiker.get_TikerHash();
            finalResponce.companysIds = responce;

            setTimeout(()=>this.Save(finalResponce),1500);
            return finalResponce;
        }
    }
    async UpdateMapping()
    {
        if(this.existsTiker){
            this.existsId = true;
            this.id = this.tiker.get_TikerHash();
        }
        if(this.existsId){
            let inst = await RelatedCompanysInfoModel.findById(this.id);
            let anyUpdate = false;

            for (let i = 0; i < inst.companysIds.length; i++) {
                const companysIdsKey =inst.companysIds[i];
                if(typeof companysIdsKey == "string") {
                    inst.companysIds[i] = companysIdsKey.get_TikerHash();
                    anyUpdate = true;
                }
            }
            if(anyUpdate)
                await RelatedCompanysInfoModel.updateOne({_id:this.id},inst);
        }
    }

    Save(arg: Document) {
        // noinspection JSIgnoredPromiseFromCall
        arg.save()
    }
}

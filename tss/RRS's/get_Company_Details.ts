import {RRSModel} from "./RRSModel";
import {Document} from "mongoose";
import MainCompanyInfo, {MainCompanyInfoModel} from "../models/MainCompanyInfoModel";
import Yahoo from "../dataProviders/yahoo";

export class get_Company_Details implements RRSModel
{
    existsId:boolean;
    id:number;
    existsTiker:boolean;
    tiker:string;

    //forwarding
    async RequestByTiker(tiker: string)
    {
        this.existsTiker = await MainCompanyInfoModel.exists({_id: tiker.get_TikerHash()});
        this.tiker = tiker;
        return await this.Responce();
    }
    async RequestById(id: number): Promise<MainCompanyInfo>
    {
        this.existsId = await MainCompanyInfoModel.exists({_id: id});
        this.id= id;
        if (!this.existsId) throw new ReferenceError("nothing found with id,use tiker");
        else return await this.Responce();
    }

    async Responce()
    {
        if(this.existsId) return await MainCompanyInfoModel.findById(this.id).lean<MainCompanyInfo>().exec()
        else if(this.existsTiker) return await MainCompanyInfoModel.findById(this.tiker.get_TikerHash()).lean<MainCompanyInfo>().exec()
        else {
            const responce = await Yahoo.AssetProfile(this.tiker);
            const profile = responce["assetProfile"];
            const priceData = responce["price"];

            const mainCompanyInfo = new MainCompanyInfoModel();
            mainCompanyInfo._id = this.tiker.get_TikerHash();
            mainCompanyInfo.tiker= this.tiker;
            mainCompanyInfo.industry = profile["industry"]
            mainCompanyInfo.sector = profile["sector"]
            mainCompanyInfo.description = profile["longBusinessSummary"]

            mainCompanyInfo.exchange = priceData["exchangeName"];

            setTimeout(()=>this.Save(mainCompanyInfo),1500);
            return mainCompanyInfo as MainCompanyInfo;
        }
    }

    Save(arg: Document) {
        // noinspection JSIgnoredPromiseFromCall
        arg.save()
    }

}

import {RRSModel} from "../RRSModel";
import {Funhub} from "../../dataProviders/finHub";
import {mergeJson, toFixed} from "../../utilstss";
import {
    BaseFundamentalFinantialsInfo,
    BaseFundamentalFinantialsModel,
    BaseFundamentalFinantialsReportBSModel,
    BaseFundamentalFinantialsReportCFModel,
    BaseFundamentalFinantialsReportICModel,
    BaseFundamentalFinantialsReportModel,
} from "../../models/finantials/BaseFundamentalsInfoModel";
import options from "yahoo-finance2/api/modules/options";


export class get_Finantials implements RRSModel
{
    existsId:boolean;
    id:number;
    existsTiker:boolean;
    tiker:string;

    //forwarding
    async RequestByTiker(tiker: string)
    {
        this.existsTiker = await BaseFundamentalFinantialsModel.exists({_id: tiker.get_TikerHash()});
        this.tiker = tiker;
        return await this.Responce();
    }
    async RequestById(id: number): Promise<BaseFundamentalFinantialsInfo>
    {
        this.existsId = await BaseFundamentalFinantialsModel.exists({_id: id});
        this.id= id;
        if (!this.existsId) throw new ReferenceError("nothing found with id,use tiker");
        else return await this.Responce();
    }

    async Responce()
    {
        if(this.existsId) return await BaseFundamentalFinantialsModel.findById(this.id).lean<BaseFundamentalFinantialsInfo>().exec()
        else if(this.existsTiker) return await BaseFundamentalFinantialsModel.findById(this.tiker.get_TikerHash()).lean<BaseFundamentalFinantialsInfo>().exec()
        else {
            let responce = await Funhub.FinantialsHistoryReported(this.tiker);

            //no data try use yahooFinance
            if(responce==false){
                return null;
            }

            let finalResponce= new BaseFundamentalFinantialsModel();
            finalResponce._id = this.tiker.get_TikerHash();

            //crop information
            const todayYear = new Date().getUTCFullYear();
            const beginDate = new Date(todayYear-3,0,1,0,0)
            const endDate = new Date(todayYear+1,0,1,0,0)

            for (let repElemts of responce) {
                const period = new Date(repElemts["period"]);
                if (!(period > beginDate && period < endDate)) continue;

                const report = repElemts["report"];

                const Bs = new BaseFundamentalFinantialsReportBSModel();
                {
                    const reportPart = report["bs"]
                    const keys = Object.keys(reportPart);
                    for (let i = 0; i < keys.length; i++)
                        Bs[keys[i]]=reportPart[[keys[i]]];
                }

                const Cf = new BaseFundamentalFinantialsReportCFModel();
                {
                    const reportPart = report["cf"]
                    const keys = Object.keys(reportPart);
                    for (let i = 0; i < keys.length; i++)
                        Cf[keys[i]]=reportPart[[keys[i]]];
                }

                const Ic = new BaseFundamentalFinantialsReportICModel();
                {
                    const reportPart = report["ic"]
                    const keys = Object.keys(reportPart);
                    for (let i = 0; i < keys.length; i++)
                        Ic[keys[i]]=reportPart[[keys[i]]];
                }

                finalResponce.reports.push(new BaseFundamentalFinantialsReportModel({
                    period:period,
                    bs: Bs,
                    cf: Cf,
                    ic: Ic,
                }))
            }

            setTimeout(()=>this.Save(finalResponce),1500);
            return finalResponce as BaseFundamentalFinantialsInfo;
        }
    }

    Save(arg)
    {
        // noinspection JSIgnoredPromiseFromCall
        arg.save()
    }

}

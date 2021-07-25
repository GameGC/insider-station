import {RRSModel} from "../RRSModel";
import EarningsEpsInfo, {
    EarningsEpsInfoModel,
    EarningsEpsInfoModelChild
} from "../../models/finantials/EarningsEpsInfoModel";
import {Funhub} from "../../dataProviders/finHub";
import {Schema} from "mongoose";
import {mergeJson, toFixed} from "../../utilstss";


export class get_EarningsEPS implements RRSModel
{
    existsId:boolean;
    id:number;
    existsTiker:boolean;
    tiker:string;

    //forwarding
    async RequestByTiker(tiker: string)
    {
        this.existsTiker = await EarningsEpsInfoModel.exists({_id: tiker.get_TikerHash()});
        this.tiker = tiker;
        return await this.Responce();
    }
    async RequestById(id: number): Promise<EarningsEpsInfo>
    {
        this.existsId = await EarningsEpsInfoModel.exists({_id: id});
        this.id= id;
        if (!this.existsId) throw new ReferenceError("nothing found with id,use tiker");
        else return await this.Responce();
    }

    async Responce()
    {
        if(this.existsId) return await EarningsEpsInfoModel.findById(this.id).lean<EarningsEpsInfo>().exec()
        else if(this.existsTiker) return await EarningsEpsInfoModel.findById(this.tiker.get_TikerHash()).lean<EarningsEpsInfo>().exec()
        else {
            const [responce,factresponce]= await Promise.all([Funhub.EPSEstimates(this.tiker),Funhub.EPSFact(this.tiker)])

            let finalResponce= new EarningsEpsInfoModel();

            finalResponce._id = this.tiker.get_TikerHash();

            //crop information
            const todayYear = new Date().getUTCFullYear();
            const beginDate = new Date(todayYear-3,0,1,0,0)
            const endDate = new Date(todayYear+1,0,1,0,0)

            let i =0 ;
            for (const rEl of responce["data"]) {
                const parsedDate = new Date(rEl["period"]);

                if (!(parsedDate > beginDate && parsedDate < endDate)) continue;
                const fEl = factresponce.find(val=>val["period"]==rEl["period"]);

                finalResponce.data.push(
                    new EarningsEpsInfoModelChild(
                        {
                            epsAvg: toFixed(rEl["epsAvg"],5),
                            epsHigh: toFixed(rEl["epsHigh"],5),
                            epsLow: toFixed(rEl["epsLow"],5),
                            period: rEl["period"],
                            fact: (typeof fEl != "undefined")?toFixed(fEl["actual"],5):undefined
                        })
                );
                i++;
            }


            setTimeout(()=>this.Save(finalResponce),1500);
            return finalResponce as EarningsEpsInfo;
        }
    }

    Save(arg)
    {
        // noinspection JSIgnoredPromiseFromCall
        arg.save()
    }

}

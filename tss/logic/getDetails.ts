import {get_Company_Details} from "../RRS's/get_Company_Details";
import {get_Related_Companys} from "../RRS's/get_Related_Companys";
import {get_EarningsEPS} from "../RRS's/finantials/get_EarningsEPS";
import {get_Finantials} from "../RRS's/finantials/get_Finantials";
import {removePropPartsString, removePropPartString, replacePropPartString} from "../utilstss";

export async function getDetails(tiker:string) {
    const responce = {
        "Summary":null,
        "Financials":
            {
                "thisCompany":{
                    "eps":null,
                    "fundamentalFinancials":null,
                },
                "othersCompanies":{
                    "count":0,

                    "eps":[],
                    "fundamentalFinancials":[],
                }
            }
    };



    const this_company_details = new get_Company_Details();
    const related_copany_details = new get_Related_Companys();

    const finantials_epsEarnings = new get_EarningsEPS();
    const finantials_fundamental_all = new get_Finantials();


    const promisesTasks = new Array<Promise<any>>();

    promisesTasks.push(this_company_details.RequestByTiker(tiker).then(v=>responce["Summary"]=v));
    promisesTasks.push(finantials_epsEarnings.RequestByTiker(tiker).then(v=>responce["Financials"]["thisCompany"]["eps"]=v));
    promisesTasks.push(finantials_fundamental_all.RequestByTiker(tiker).then(v=>responce["Financials"]["thisCompany"]["fundamentalFinancials"]=v));

    async function get_Child(companysId){
        if(typeof companysId == "string") {
            await new get_Company_Details().RequestByTiker(companysId);
            responce["Financials"]["othersCompanies"]["eps"].push(await new get_EarningsEPS().RequestByTiker(companysId));
            responce["Financials"]["othersCompanies"]["fundamentalFinancials"].push(await new get_Finantials().RequestByTiker(companysId));
        }
        else if(typeof companysId == "number") {
            await new get_Company_Details().RequestById(companysId);
            responce["Financials"]["othersCompanies"]["eps"].push(await new get_EarningsEPS().RequestById(companysId));
            responce["Financials"]["othersCompanies"]["fundamentalFinancials"].push(await new get_Finantials().RequestById(companysId));
        }
    }
    promisesTasks.push(related_copany_details.RequestByTiker(tiker).then(async function (obj) {
        //console.dir(obj)
        const promises = new Array<Promise<void>>();

        responce["Financials"]["count"] =obj.companysIds.length;
        for (let companysId of obj.companysIds)
            promises.push(get_Child(companysId));

        await Promise.all(promises).then(()=>related_copany_details.UpdateMapping());
    }));

    await Promise.all(promisesTasks)

    console.dir("done")
    responce["Financials"] = removePropPartsString(responce["Financials"],["T21:00:00.000Z","T00:00:00.000Z"]);
    responce["Financials"] = replacePropPartString(responce["Financials"],"NaN","0");
    responce["Financials"] = replacePropPartString(responce["Financials"],"null","0");


    return responce;
}

import yahooFinance from "yahoo-finance2";
import {ModuleOptionsWithValidateFalse} from "yahoo-finance2/api/lib/moduleCommon";
import {QuoteSummaryOptions} from "yahoo-finance2/api/modules/quoteSummary";
import {removeProp, removeProps, replacePropPartString} from "../utilstss";

const mongoose = require("mongoose");

export default class Yahoo
{
    static async single_quoteSummary(symbol: string, queryOptionsOverrides?: QuoteSummaryOptions, moduleOptions?: ModuleOptionsWithValidateFalse){
        const responce = await yahooFinance.quoteSummary(symbol, queryOptionsOverrides);
        return responce[queryOptionsOverrides.modules[0]]
    }
    public static async AssetProfile(tiker) {
        return await yahooFinance.quoteSummary(tiker, {modules: ["assetProfile", "price"]});
    }

    public static async Price(tiker) {
        return await Yahoo.single_quoteSummary(tiker, { modules: [ "price" ] });
    }

    public static async FinantialsHistoryReported(tiker:string){
        let responce = await yahooFinance.quoteSummary(tiker, { modules: [ "balanceSheetHistoryQuarterly","cashflowStatementHistoryQuarterly","incomeStatementHistoryQuarterly"]});

        removeProp(responce,"maxAge")

        responce = replacePropPartString(responce,"balanceSheetStatements","bs")
        responce = replacePropPartString(responce,"cashflowStatements","cf")
        responce = replacePropPartString(responce,"incomeStatementHistory","ic")

        console.dir(responce);
        return responce;
    }
}

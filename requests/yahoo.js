const yahooFinance = require("yahoo-finance2").default;
const editJsonFile = require("edit-json-file");
const mongoose = require("mongoose");
const {NewsTikerSchema} = require("./db/Schemas/NewsTikerSchema");
const {MainCacheSchema} = require("./db/Schemas/MainCacheSchema");


const database = require("./db/database");
const {isNull} = require("../utils");
class Yahoo {
    /*{
        "assetProfile": {
            "address1": "3500 Deer Creek Road",
            "city": "Palo Alto",
            "state": "CA",
            "zip": "94304",
            "country": "United States",
            "phone": "650-681-5000",
            "website": "http://www.tesla.com",
            "industry": "Auto Manufacturers",
            "sector": "Consumer Cyclical",
            "longBusinessSummary": string
            {
                "maxAge": 1,
                "name": "Mr. Elon R. Musk",
                "age": 48,
                "title": "Technoking of Tesla",
                "yearBorn": 1972,
                "fiscalYear": 2019,
                "totalPay": 23760,
                "exercisedValue": 0,
                "unexercisedValue": 0
            },
        ],
            "auditRisk": 9,
            "boardRisk": 10,
            "compensationRisk": 10,
            "shareHolderRightsRisk": 9,
            "overallRisk": 10,
            "governanceEpochDate": "2021-04-01T00:00:00.000Z",
            "compensationAsOfEpochDate": "2019-12-31T00:00:00.000Z",
            "npm i investing-com-api": 86400
    }
    }*/
    static async AssetProfile(tiker) {
        const responce = (await yahooFinance.quoteSummary(tiker, {modules: ["assetProfile"]}))["assetProfile"];

        const MainCacheSchema = mongoose.model('MainCacheSchema');
        const RiskSchema = mongoose.model('MainCacheSchema/RiskCacheSchema');

        const data = new MainCacheSchema();
        const riskData = new RiskSchema();

        data.id = tiker.get_TikerHash();
        data.tiker= tiker;
        data.industry = responce["industry"]
        data.sector = responce["sector"]
        data.description = responce["longBusinessSummary"]

        const priceData = (await this.Price(tiker))["price"];
        data.exchange = priceData["exchangeName"];

        riskData.auditRisk= responce["auditRisk"];
        riskData.boardRisk= responce["boardRisk"];
        riskData.compensationRisk= responce["compensationRisk"];
        riskData.shareHolderRightsRisk= responce["shareHolderRightsRisk"];
        riskData.overallRisk= responce["overallRisk"];

        data.risk =riskData;
        await data.save()

        //await m.save();
        return responce;
    }
    static async InsiderTrades(tiker) {
        let responce = await yahooFinance.quoteSummary(tiker, {modules: ["insiderTransactions"]});
        removeProp(responce,"maxAge");
        removeProp(responce,"filerUrl");
        removeProp(responce,"moneyText");
        return responce;
    }
    static async CalendarEvents(tiker) {
        return await yahooFinance.quoteSummary(tiker, { modules: [ "calendarEvents" ] });
    }
/**
*  "earnings": {
*    "maxAge": 86400,
*    "earningsChart": {
*      "quarterly": [
*        {
*          "date": "1Q2020",
*          "actual": 0.23,
*          "estimate": -0.06
*        },
*        {
*          "date": "2Q2020",
*          "actual": 0.44,
*          "estimate": -0.04
*        },
*      ],
*      "currentQuarterEstimate": 0.76,
*      "currentQuarterEstimateDate": "1Q",
*      "currentQuarterEstimateYear": 2021,
*      "earningsDate": [
*        "2021-04-27T00:00:00.000Z",
*        "2021-05-03T00:00:00.000Z"
*      ]
*    },
*    "financialsChart": {
*      "yearly": [
*        {
*          "date": 2017,
*          "revenue": 11759000000,
*          "earnings": -1962000000
*        },
*      ],
*      "quarterly": [
*        {
*          "date": "1Q2020",
*          "revenue": 5985000000,
*          "earnings": 16000000
*        },
*      ]
*    },
*    "financialCurrency": "USD"
*
*/
    static async Earnings(tiker)
    {


        const NewsTikerSchema = mongoose.model('NewsTikerSchema');
        const m = new NewsTikerSchema();
        m.title = "test tittle"+Date.now();
        m.body = "test tittle";

        await m.save();

        return await yahooFinance.quoteSummary(tiker, { modules: [ "earnings" ] });
    }



    static async Price(tiker) {
        return await yahooFinance.quoteSummary(tiker, { modules: [ "price" ] });
    }

    static async industryTrend(tiker) {
        return await yahooFinance.quoteSummary(tiker, { modules: [ "industryTrend" ] });
    }
    static async sectorTrend(tiker) {
        return await yahooFinance.quoteSummary(tiker, { modules: [ "sectorTrend" ] });
    }

    static async indexTrend(tiker) {
        return await yahooFinance.quoteSummary(tiker, { modules: [ "indexTrend" ] });
    }

    static async FidelityTest(){
        const fetch = require("node-fetch");
        return await fetch("https://fidelity-investments.p.rapidapi.com/quotes/get-mashup?symbol=TSLA", {
            method: "GET",
        });
    }
    static async FinTechMutFund(tiker){
        const request = require('request');
        const responce = request("https://finnhub.io/api/v1/mutual-fund/sector?symbol=" + tiker + "&token=sandbox_c1qmlqqad3ibhunpr3sg", { json: true }, (err, res, body) =>
        {
            if (err) { return console.log(err); }
           // console.log(res.message)
            console.log(body);
            console.log(body.explanation);
        });
    }




}
class Yahoo_Funds
{
    static async FundProfile(tiker) {
        return  await yahooFinance.quoteSummary(tiker, {modules: ["fundProfile"]});
    }
}


module .exports = Yahoo
function removeProp(obj, propToDelete) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                removeProp(obj[property], propToDelete);
            } else {
                if (property === propToDelete) {
                    delete obj[property];
                }
            }
        }
    }
}

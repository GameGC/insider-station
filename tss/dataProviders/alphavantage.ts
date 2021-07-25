import fetch from "node-fetch";
import {removeProp, removePropNonRef, removePropPartString, removeProps, replacePropPartString} from "../utilstss";
import {Schema} from "mongoose";

const mongoose = require("mongoose");

export default class alphavantage {
    static async fetch_Json(input: string, init?: RequestInit,parentfilter?:string|null){
        init= init ?? {method: "GET"}
        input=`https://www.alphavantage.co/query?function=${input}&apikey=C9YE12S1SR8CVSX3`;
        //console.log(input)
        const responce = await fetch(input,init);

        if(parentfilter!=null)
        {
            const jsn =await responce.json();
            return await jsn[parentfilter];
        }

        return await responce.json();
    }


    public static async FinantialsHistoryReported(tiker:string)
    {
        let responce = [];

        const [bs,cf,ic] =await Promise.all([
            alphavantage.fetch_Json(`BALANCE_SHEET&symbol=${tiker}`,null,"quarterlyReports"),
            alphavantage.fetch_Json(`CASH_FLOW&symbol=${tiker}`,null,"quarterlyReports"),
            alphavantage.fetch_Json(`CASH_FLOW&symbol=${tiker}`,null,"quarterlyReports")
        ])
        let arrF = [bs,cf,ic]

        for (let arrFElement of arrF) {
            for (let ch of arrFElement) {
                const date = new Date(ch["fiscalDateEnding"]);
                const year = date.getFullYear();
                ch["period"] = GetYearQuoterDate(year,getQuarter(date)-1)
            }
        }
        function getQuarter(d:Date) {
            return Math.floor((d.getMonth() + 3) / 3);
        }


        removeProps(arrF,["symbol","reportedCurrency","fiscalDateEnding"]);

        function GetYearQuoterDate(year:number,quoter:number){
            const quoters = [
                {
                    month:3,
                    day:31
                },
                {
                    month:6,
                    day:30
                },
                {
                    month:9,
                    day:30
                },
                {
                    month:12,
                    day:31
                },
            ]
            return new Date(year,quoters[quoter].month,quoters[quoter].day).toISOString()
        }

        console.log(bs.length)
        for (let i = 0; i < bs.length; i++){
            responce.push({
                period:bs[i]["period"],
                report:{
                    bs:removePropNonRef(bs[i],"period"),
                    cf:removePropNonRef(cf[i],"period"),
                    ic:removePropNonRef(ic[i],"period"),
                },
            })
        }

      //  responce = replacePropPartString(responce,"icO","ic");
        responce = removePropPartString(responce,"T21:00:00.000Z");


        responce = replacePropPartString(responce,'None',"0");

       // if(typeof responce==undefined||responce==null||responce.length==0) return false;
        return responce as Array<object>;
    }
}

import fetch from "node-fetch";
import {removeProp, removePropNonRef, removePropPartString, removeProps, replacePropPartString} from "../utilstss";
import {Schema} from "mongoose";
// import File System Module

// import xml2js Module


const mongoose = require("mongoose");

export default class sec_edgar {
    static async fetch_Json(input: string, init?: RequestInit){
        init= init ?? {method: "GET"}
        input=`https://datafied.api.edgar-online.com/v2${input}&appkey=d8caea59bf2447db52a96deddac94bd1`;
        //console.log(input)
        let responce = await (await fetch(input,init)).json();

        return responce;
    }


    public static async FinantialsHistoryReported(tiker:string)
    {
        let responce =await sec_edgar.fetch_Json(`/financials/qtr?primarysymbols=${tiker}`);

        /*
        responce = responce["result"]["rows"];
        removeProp(responce,"rownum")
        for (let el of responce) {
            for (const val of el["values"]) {
                const field = val["field"];
                const value = val["value"];
                el[field] = value;
            }
            delete el["values"];
        }

        removeProps(responce,["taxonomyid","cik","companyname","entityid","primaryexchange","marketoperator",
            "markettier","primarysymbol","siccode","sicdescription","usdconversionrate","restated",
            "receiveddate","preliminary","periodlengthcode","periodlength","periodenddate","original",
            "formtype","dcn","currencycode","crosscalculated","audited","amended",
        ])
*/


        return responce as Array<object>;
    }
}

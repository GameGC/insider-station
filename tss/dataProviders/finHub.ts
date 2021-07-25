import fetch from "node-fetch";
import {removeProp, removePropPartString, removeProps, replacePropPartString} from "../utilstss";
import {Schema} from "mongoose";

const mongoose = require("mongoose");

export class Funhub {
    static async fetch_Json(input: string, init?: RequestInit){
        input+="&token=sandbox_c1qmlqqad3ibhunpr3sg";
        //console.log(input)
        const responce = await fetch(input,init);
        return await responce.json();
    }

    /*

  "address": "1 Apple Park Way",
  "city": "CUPERTINO",
  "country": "US",
  "currency": "USD",
  "cusip": "",
  "sedol":"2046251",
  "description": "Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Four technology companies, alongside Amazon, Google, and Microsoft. The company's hardware products include the iPhone smartphone, the iPad tablet computer, the Mac personal computer, the iPod portable media player, the Apple Watch smartwatch, the Apple TV digital media player, the AirPods wireless earbuds and the HomePod smart speaker. Apple's software includes the macOS, iOS, iPadOS, watchOS, and tvOS operating systems, the iTunes media player, the Safari web browser, the Shazam acoustic fingerprint utility, and the iLife and iWork creativity and productivity suites, as well as professional applications like Final Cut Pro, Logic Pro, and Xcode. Its online services include the iTunes Store, the iOS App Store, Mac App Store, Apple Music, Apple TV+, iMessage, and iCloud. Other services include Apple Store, Genius Bar, AppleCare, Apple Pay, Apple Pay Cash, and Apple Card.",
  "employeeTotal": "137000",
  "exchange": "NASDAQ/NMS (GLOBAL MARKET)",
  "ggroup": "Technology Hardware & Equipment",
  "gind": "Technology Hardware, Storage & Peripherals",
  "gsector": "Information Technology",
  "gsubind": "Technology Hardware, Storage & Peripherals",
  "ipo": "1980-12-12",
  "isin": "",
  "marketCapitalization": 1415993,
  "naics": "Communications Equipment Manufacturing",
  "naicsNationalIndustry": "Radio and Television Broadcasting and Wireless Communications Equipment Manufacturing",
  "naicsSector": "Manufacturing",
  "naicsSubsector": "Computer and Electronic Product Manufacturing",
  "name": "Apple Inc",
  "phone": "14089961010",
  "shareOutstanding": 4375.47998046875,
  "state": "CALIFORNIA",
  "ticker": "AAPL",
  "weburl": "https://www.apple.com/",
  "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
  "finnhubIndustry":"Technology"
    */
    public static async CompanyProfile(tiker:string){
        const responce = await Funhub.fetch_Json(`https://finnhub.io/api/v1/stock/profile?symbol=${tiker}`, {
            method:"GET"
        })
        return responce as Array<string>;
    }
   public static async SimularCompanys(tiker:string){
        const responce = await Funhub.fetch_Json(`https://finnhub.io/api/v1/stock/peers?symbol=${tiker}`, {
            method:"GET"
        })
        removeProp(responce,tiker);
        responce.shift();
        return responce as Array<string>;
    }

    public static async EPSEstimates(tiker:string){
        return await Funhub.fetch_Json(`https://finnhub.io/api/v1/stock/eps-estimate?limit=30&symbol=${tiker}`, {
            method: "GET"
        })
    }
    public static async EPSFact(tiker:string)
    {
        const responce = await Funhub.fetch_Json(`https://finnhub.io/api/v1/stock/earnings?limit=15&symbol=${tiker}`, {
            method: "GET"
        });
        removeProp(responce,"symbol");
        removeProp(responce,"estimate");
        return responce as Array<object>;
    }

    public static async FinantialsHistoryReported(tiker:string)
    {
        let responce = await Funhub.fetch_Json(`https://finnhub.io/api/v1/stock/financials-reported?repost=bs&statement=bs&freq=quarterly&limit=15&&symbol=${tiker}`, {
            method: "GET"
        });

        removeProps(responce,["symbol","accessNumber","cik",
            "startDate","endDate","filedDate","acceptedDate","form"]);

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


        const nowYear =  (new Date()).getFullYear();
        let data = responce["data"];
        for (let i in data) {
            const resp = data[i];
            if(parseInt(resp["year"])<nowYear-4){
                delete data[i];
                continue;
            }
            resp["period"] = GetYearQuoterDate(resp["year"],resp["quarter"])
        }

        responce["data"] = data.filter(function (el) {
            return el != null;
        });

        removeProps(responce,["year","quarter","unit"])

        const clear = `${tiker.toLowerCase()}:`;
        responce = removePropPartString(responce,clear)["data"];
        for (let resp of responce) {
            var rep = resp["report"]

            const bs = rep["bs"];
            rep["bsO"] = {}
            const bsObj = rep["bsO"];
            for (let i in bs) {
                const bsEl = bs[i];
                bsObj[bsEl["concept"]] = bsEl["value"];//{ label:bsEl["label"],value:bsEl["value"] }
            }
            delete rep["bs"];

            const cf = rep["cf"];
            rep["cfO"] = {}
            const cfObj = rep["cfO"];
            for (let i in cf) {
                const cfEl = cf[i];
                cfObj[cfEl["concept"]] = cfEl["value"];//{ label:cfEl["label"],value:cfEl["value"] }
            }
            delete rep["cf"];

            const ic = rep["ic"];
            rep["icO"] = {}
            const icObj = rep["icO"];
            for (let i in ic) {
                const icEl = ic[i];
                icObj[icEl["concept"]] =icEl["value"]; //{ label:icEl["label"],value:icEl["value"] }
            }
            delete rep["ic"];
        }


        responce = replacePropPartString(responce,"bsO","bs");
        responce = replacePropPartString(responce,"cfO","cf");
        responce = replacePropPartString(responce,"icO","ic");
        responce = removePropPartString(responce,"T21:00:00.000Z");


        responce = replacePropPartString(responce,'"N/A"',"0");

        if(typeof responce==undefined||responce==null||responce.length==0) return false;
        return responce as Array<object>;

    }
}

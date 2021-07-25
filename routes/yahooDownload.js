const {getDetails}  = require("../tss/logic/getDetails");

const express = require( "express");

const sec_edgar = require("../tss/dataProviders/sec_edgar").default;

const financialModelingPrep = require("../tss/dataProviders/alphavantage").default;
const yahoo = require("../tss/dataProviders/yahoo").default;
const finHub = require("../tss/dataProviders/finHub.ts").Funhub;

const {body, param, query, validationResult}= require("express-validator");

const router = express.Router();

/* GET home page. */
router.get('/', [
        query("tiker", 'No tiker').exists(),
    ],
    async (req, res) => {
        try
        {
            const tiker = req.query.tiker.toString().trim();
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty())
                return res.status(401).json({arguments: validationErrors.array(), type: "wrongInputData"});


            const summary = await getDetails(tiker)
            //const summary = await finHub.FinantialsHistoryReported(tiker)
          //  const summary = await sec_edgar.FinantialsHistoryReported(tiker)
            res.status(200)
            res.send(summary);
        }
        catch (e)
        {
            console.log(e);
            res.status(500).json({arguments: "smth wrong register"});
        }
    });


module.exports = router;

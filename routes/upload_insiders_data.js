const express = require('express');
const {body,param,validationResult} = require("express-validator");
const router = express.Router();

//const linkedin = require("node-linkedin-v2")
//const client = new linkedin("86xgfhnsix0m35","ETL7J39y89gPn2GW")

/* GET users listing. */
router.put('/', [
        param("file", 'Wrong file').exists(),
    ],
    async (req, res) => {
        try
        {
           // var resp = await client.getAccessToken();
            console.log(resp)
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty())
                return res.status(401).json({arguments: validationErrors.array(), type: "wrongInputData"});
        }
        catch (e)
        {
            console.log(e);
            res.status(500).json({arguments: "smth wrong register"});
        }
});


module.exports = router;

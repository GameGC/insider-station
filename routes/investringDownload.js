const express = require("express");
const {body, param, query, validationResult}= require("express-validator");

const router = express.Router();

/* GET home page. */
router.get('/', [
        query("tiker", 'No tiker').exists(),
    ],
    async (req, res) => {
        try
        {

            const tiker = req.query.tiker.toString();
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty())
                return res.status(401).json({arguments: validationErrors.array(), type: "wrongInputData"});


            res.send(summary);
        }
        catch (e)
        {
            console.log(e);
            res.status(500).json({arguments: "smth wrong register"});
        }
    });


module.exports = router;

const { Router } = require("express");
//const axios = require("axios");
const { getDogAll } = require("../controllers/dogs");
const { Temper } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const dogsTemps = await Temper.findAll();
   
    res.status(200).send(dogsTemps);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

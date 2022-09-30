const { Router, response } = require("express");
const { Temper } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const dogTemp = await Temper.findAll();
    res.status(200).send(dogTemp);
  } catch (error) {
    console.log(error);
  }
});




module.exports = router;

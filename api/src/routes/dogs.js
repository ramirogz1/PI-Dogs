const { Router, response } = require("express");
const { getDogAll } = require("../controllers/dogs");
const { Dog, Temper } = require("../db");
const { validate: uuidValidate } = require("uuid");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const dogsTotal = await getDogAll();
    const { name } = req.query;
    if (name) {
      const dogsName = dogsTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      dogsName.length
        ? res.status(200).send(dogsName)
        : res.status(404).send("No existe esa raza");
    } else {
      res.status(200).send(dogsTotal);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dogsTotal = await getDogAll();

    const { id } = req.params;
    if (uuidValidate(id)) {
      const idDb = await Dog.findByPk(id, {
        include: Temper,
      });
      idDb
        ? res.status(200).send(idDb)
        : res.status(404).send("id no encontrada");
    } else {
      const idDogs = dogsTotal.filter((e) => e.id == id);

      idDogs.length
        ? res.status(200).send(idDogs)
        : res.status(404).send("id no encontrada");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_years,
      max_years,
      temper,
    } = req.body;
    const height = min_height + " - " + max_height;
    const weight = min_weight + " - " + max_weight;
    const years = min_years + " - " + max_years;
    const dogCreate = await Dog.create({
      name,
      image,
      height,
      weight,
      years,
    });
    let temperDb = await Temper.findAll({
      where: { name: temper },
    });
    dogCreate.addTemper(temperDb);
    res.status(200).send("Perro creado con exito");
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req,res)=>{
  try {
    const{id}= req.params
    await Dog.destroy({
      where: {
        id,
      }
      
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
})



module.exports = router;

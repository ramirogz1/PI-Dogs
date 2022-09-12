import { Router } from "express";
import { axios } from "axios";
import { getDogAll } from "../controllers";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const dogsTotal = await getDogAll();
    const { name } = req.query;
    if (name) {
      const dogsName = dogsTotal
        .filter((el) => el.name.toLowerCase())
        .include(name.toLowerCase());
      dogsName.length ? res.status(200).send(dogsName) : res.status(404).send("No existe esa raza");
    } else {
      res.status(200).send(dogsTotal);
    }
  } catch (error) {
    console.log(error);
  }
});


router.get("/:idRaza", async (req, res) => {
  try {
    const dogsTotal = await getDogAll();
    const { id } = req.params;
    const idDogs = dogsTotal.filter((e) => e.id == id);
    id.length
      ? res.status(200).send(idDogs)
      : res.status(404).send("id no encontrada");
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async(req,res)=> {
  try {
    
  } catch (error) {
    console.log(error);
  }
})

module.exports;

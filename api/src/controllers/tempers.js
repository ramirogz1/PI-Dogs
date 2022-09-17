
const { Temper } = require("../db");

const { API_KEY } = process.env;
const axios = require ('axios');

const getTempers = async () => {
  try {
    const tempersApi = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY);
   
    const tempersMap = tempersApi.data
      .map((el) => el.temperament)
      .toString()
      .split(",");
    for (let i = 0; i < tempersMap.length; i++) {
      tempersMap[i] = tempersMap[i].trim();
      if(tempersMap[i]!==""){
        await Temper.findOrCreate({
          where: {
            name: tempersMap[i],
          },
        });
      }
     
    }
  } catch (error) {}
};

module.exports = getTempers;

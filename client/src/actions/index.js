import axios from "axios";

//filtrado por todos los perros

export function getDogs() {
  return async function (dispacth) {
    const json = await axios.get("http://localhost:3001/dogs");

    return dispacth({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

//filtrar por todos los temperamentos

export function getTemperaments() {
  return async function (dispacth) {
    const json = await axios.get("http://localhost:3001/temperaments");

    return dispacth({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

//filtrar por cada temperamento temperamento
export function filterTemperament(payload){
  return {
    type : "FILTER_BY_TEMPERAMENT",
    payload,
  }
}


//filtrar por BD y/o API 
export function filterOrigen(payload){
  return{
    type: "FILTER_BY_ORIGEN",
    payload,
  }
}

//ordenar por nombre

export function orderByName (payload){
  return{
    type:"ORDER_BY_NAME",
    payload,
  }
}

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
export function filterTemperament(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

//filtrar por BD y/o API
export function filterOrigen(payload) {
  return {
    type: "FILTER_BY_ORIGEN",
    payload,
  };
}

//ordenar por nombre

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

// peso

export function orderPeso(payload) {
  return {
    type: "ORDEN_PESO",
    payload,
  };
}

//

export function getNameDogs(name) {
  return async function (dispacth) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispacth({
        type: "GET_NAME_DOGS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return dispacth({
        type: "GET_NAME_DOGS",
        payload: [],
      });
    }
  };
}

// crear Dogo
export function postDogs(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dogs", payload);
    return response;
  };
}

//detalle

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}



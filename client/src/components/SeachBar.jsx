import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import './SearchBar.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  //estado local
  const [ name, setName ] = useState("");

  //logica de la funcion

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  //funcion del boton

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(name));
  }

  return (
    <div className="">
      <input className="div-input2"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
      />
      <button className="buscar" type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments,filterTemperament,filterOrigen,orderByName } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";


import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  console.log(allDogs)
 
  // estados locales:
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, /*setDogsPerPage*/] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage; //8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const [orden,setOrden]=useState('')

  //1 ------ 0 -----8
  //2 -------9-----17

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // fin de estados locales

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }



function handleFilterTemper(e){
    e.preventDefault();
    dispatch(filterTemperament(e.target.value))
    setCurrentPage(1)
}

  function handlefilterOrigen(e){
    e.preventDefault()
    dispatch(filterOrigen(e.target.value))
    setCurrentPage(1)
  };

  function handleSoft(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  };

  return (
    <div>
      <Link to="/dog">Crear Perro</Link>
      <h1>AGUANTE LOS PICHICHUS :D</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los perros
      </button>
      <div>
        <select onChange = {(e)=> 
        {handleFilterTemper(e)}
    }>
          <option disabled selected>Temperamentos</option>
          {allTemperaments?.map((element) => (
            <option value={element.name} key={element.id}>
              {element.name}
            </option>
          ))}
        </select>
        <select onChange={ (e)=> 
            { handlefilterOrigen(e)}}>
          <option disabled selected>Raza</option>
          <option value="Api">Api</option>
          <option value="DataBase">Base de Datos</option>
        </select>

        <select onChange={(e)=> {handleSoft(e)}}>
          <option>Orden Alfabetico</option>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
        </select>
        <select>
          <option>Peso</option>
          <option>De Menor a Mayor</option>
          <option>De Mayor a Menor</option>
        </select>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        {currentDogs?.map((el) => {
          return (
            <div key={el.id}>
              <Link to={"/home/" + el.id}>
                <Card
                  name={el.name}
                  image={el.image}
                  temper={el.temper}
                  weight={el.weight}
                  key={el.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// {allDogs &&
//     allDogs.map((el) => {
//       //currentDogs.map((el) => {
//       return (
//         <div>
//           <Card
//             name={el.name}
//             image={el.image}
//             temperament={el.temperament}
//             weight={el.weight}
//             key={el.id}
//           />
//         </div>
//       );
//     })}
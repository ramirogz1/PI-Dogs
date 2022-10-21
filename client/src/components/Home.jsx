import React from "react";
import { Link } from "react-router-dom";
//importo los hooks que voy a utilizar
import { useState, useEffect } from "react";
//importo los hooks de react-redux (previamente instalo npm i react-redux)
import { useDispatch, useSelector } from "react-redux";
// importo las actions que me interesa usar en este componente
import {
  getDogs,
  getTemperaments,
  filterTemperament,
  filterOrigen,
  orderByName,
  orderPeso,
} from "../actions";
//importar el css
import "./Home.css";
import loadingImg from "../image/perroLoading.gif";

// importo los componentes que voy a utilizar
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SeachBar";

//COMIENZA EL COMPONENTE

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  // estados locales:
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage /*setDogsPerPage*/] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage; //8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const [, /*orden*/ setOrden] = useState("");
  const allTemperaments = useSelector((state) => state.temperaments);
  const [loading, setLoading] = useState(true);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // fin de estados locales

  useEffect(() => {
    dispatch(getDogs())
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();

    dispatch(getDogs());
  }

  function handleFilterTemper(e) {
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
  }

  function handlefilterOrigen(e) {
    e.preventDefault();
    dispatch(filterOrigen(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handlePeso(e) {
    e.preventDefault();
    dispatch(orderPeso(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  if (loading) {
    return (
      <div className="loading">
        <img
          className="imgLoading"
          src={loadingImg}
          alt="no hay imagen"
          width="200px"
          height="200px"
          padding-top="200px"
        />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="fondoHome">
      <div className="barraSuperior">
        <Link to="/dog">
          <button className="cargarPerros">Crear Perro</button>
        </Link>
        <button
          className="cargarPerros"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar todos los perros
        </button>

        <select
          onChange={(e) => {
            handleFilterTemper(e);
          }}
        >
          <option disabled selected>
            Temperamentos
          </option>
          {allTemperaments?.map((element) => (
            <option value={element.name} key={element.id}>
              {element.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => {
            handlefilterOrigen(e);
          }}
        >
          <option disabled selected>
            Raza
          </option>
          <option value="Api">Api</option>
          <option value="DataBase">Base de Datos</option>
        </select>

        <select
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option disabled selected>
            Orden Alfabetico
          </option>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
        </select>
        <select
          onChange={(e) => {
            handlePeso(e);
          }}
        >
          <option disabled selected>
            Peso
          </option>
          <option value="min">De Menor a Mayor</option>
          <option value="max">De Mayor a Menor</option>
        </select>

        <SearchBar />
      </div>
      <div>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
      <div className="cards">
        {currentDogs.length > 0 ? (
          currentDogs?.map((el) => {
            return (
              <div className="link" key={el.id}>
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
          })
        ) : (
          <h1>No hay resultados</h1>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./DogCreate.css";

//validasion
function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un Nombre";
  } else if (!input.min_height) {
    errors.min_height = "Debe ingresar una altura minima de 20 a 80 cm";
  } else if (!input.max_height) {
    errors.max_height = "Debe ingresar una altura maxima de 30 a 100 cm";
  } else if (!input.min_weight) {
    errors.min_weight = "Debe ingresar un peso minimo de 3 a 50 kilos";
  } else if (!input.max_weight) {
    errors.max_weight = "Debe ingresar un peso maximo de 60 a 100 kilos";
  }
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogs);
  const history = useHistory();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_years: "",
    max_years: "",
    temper: [],
    image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temper: input.temper.includes(e.target.value)
        ? input.temper
        : [...input.temper, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name !== "") {
      if (
        !dogs.find((el) => el.name.trim().toLowerCase() === input.name.trim().toLowerCase())
      ) {
        if (input.min_height !== "") {
          if (input.max_height !== "") {
            if (input.min_height <= input.max_height) {
              if (input.min_weight !== "") {
                if (input.max_weight !== "") {
                  if (input.min_weight <= input.max_weight) {
                    if (input.min_years !== "") {
                      if (input.max_years !== "") {
                        if (input.min_years <= input.max_years) {
                          if (input.temper.length > 0) {
                            dispatch(postDogs(input));
                            alert("Tu Perro Fue Creado Con Exito Amigo!! 🤗");
                            setInput({
                              name: "",
                              min_height: "",
                              max_height: "",
                              min_weight: "",
                              max_weight: "",
                              min_years: "",
                              max_years: "",
                              temper: [],
                              image: "",
                            });
                            history.push("/home");
                            return;
                          }
                        } else {
                          alert(
                            "el año minimo debe ser menor o igual al año maximo"
                          );
                          return;
                        }
                      }
                    }
                  } else {
                    alert(
                      "el peso minimo debe ser menor o igual al peso maximo"
                    );
                    return;
                  }
                }
              }
            } else {
              alert(
                "la altura minima debe ser menor o igual a la altura maxima"
              );
              return;
            }
          }
        }
      } else {
        alert("Ya existe la raza con ese nombre");
        return;
      }
    }
    alert(
      "Los campos Nombre Altura Peso y Temperamentos deben estar completados 😪"
    );
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temper: input.temper.filter((occ) => occ !== el),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="fondoCreate">
      <Link to="/home">
        <button className="botonVolver"> ◀ volver</button>
      </Link>
      <div className="formulario2">
        <h1>Creá a tu Perro! 😁 </h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Raza: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Altura Minima: </label>
            <input
              type="number"
              value={input.min_height}
              min="20"
              max="80"
              name="min_height"
              onChange={(e) => handleChange(e)}
            />
            {errors.min_height && <p className="error">{errors.min_height}</p>}
          </div>
          <div>
            <label>Altura Maxima: </label>
            <input
              type="number"
              value={input.max_height}
              min="30"
              max="100"
              name="max_height"
              onChange={(e) => handleChange(e)}
            />
            {errors.max_height && <p className="error">{errors.max_height}</p>}
          </div>
          <div>
            <label>Peso Minimo: </label>
            <input
              type="number"
              value={input.min_weight}
              min="3"
              max="50"
              name="min_weight"
              onChange={(e) => handleChange(e)}
            />
            {errors.min_weight && <p className="error">{errors.min_weight}</p>}
          </div>
          <div>
            <label>Peso Maximo: </label>
            <input
              type="number"
              value={input.max_weight}
              min="60"
              max="100"
              name="max_weight"
              onChange={(e) => handleChange(e)}
            />
            {errors.max_weight && <p className="error">{errors.max_weight}</p>}
          </div>
          <div>
            <label>Imagen: </label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Años de vida Minimo: </label>
            <input
              type="number"
              value={input.min_years}
              min="1"
              max="3"
              name="min_years"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Años de vida Maximo: </label>
            <input
              type="number"
              value={input.max_years}
              min="1"
              max="20"
              name="max_years"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Temperamento: </label>

            <select onChange={(e) => handleSelect(e)}>
              <option disabled selected>
                Seleccione el temperamento
              </option>
              {temperaments.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <div className="temperamentos">
              <ul>
              {input.temper.map((el) => (
                <li className="lista" >
               
                    {/* <div className="divTemp"> */}
                      {el}
                      <button
                        className="botonX"
                        onClick={() => handleDelete(el)}
                      >
                        X
                      </button>
                    {/* </div> */}
                    </li>
                  ))}
                
              </ul>
            </div>
          </div>

          <button className="botonCrear" type="submit">
            Crear Perro 🐶
          </button>
        </form>
      </div>
    </div>
  );
}

// crea estado [] funcion validate

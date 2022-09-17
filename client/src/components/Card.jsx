import React from "react";

export default function Card({name, image, temper,weight}){
    return (
        <div>
            <h3>Nombre: {name}</h3>
            <h5>Temperamento: {temper.join(", ")}</h5>
            <img src={image} alt="Img no found" width="200px" height="250px"/>
            <h4>Peso: {weight}</h4>
        </div>
    )
}
import React from "react";
import './Card.css'

export default function Card({name, image, temper,weight,height}){
    return (
        <div className="cartaUnica">
            <h3> {name}</h3>
            <h5> {temper.join(", ")}</h5>
            <img src={image} alt="Img no found" width="300px" height="250px"/>
            <h4>Peso: {weight[1]?weight[0]+" - "+weight[1]:weight[0]} kg</h4>
        </div>
    )
}
import React from "react";
import {Link} from 'react-router-dom'
import './LandingPage.css'

export default function LadingPage(){
    return (
        <div className="fondo">
            <h1 className="titulo">Dogs App 🐶</h1>
            <Link to ='/home'>
                <button className="boton">Ingresar</button>
            </Link>
        </div>
    )
}
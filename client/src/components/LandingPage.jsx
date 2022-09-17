import React from "react";
import {Link} from 'react-router-dom'

export default function LadingPage(){
    return (
        <div>
            <h1>Bienvendos a mi super Página </h1>
            <Link to ='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}
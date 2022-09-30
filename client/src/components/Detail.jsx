import React from "react";
import { Link , useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, } from "../actions/index";
import { useEffect } from "react";
import './Detail.css'


export default function Detail() {

  const dispatch = useDispatch();
  const {id}= useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch,id]);


  const myDog = useSelector((state) => state.detail);
 
  return (
    <div className="fondo2">
      {myDog.length > 0  ? 
        <div className="detalle2">
          <h1 className="cartaDetalle"> {myDog[0].name}</h1>
          <img className="imagenDetalle"
            src={myDog[0].image ? myDog[0].image : myDog[0].img}
            alt=""
            
          />
          <h2>Altura: {myDog[0].height.join(' - ') + ' cm'}</h2>
          <h3>Peso: {myDog[0].weight.join(' - ') + ' kg'}</h3>
          <h2>Años de vida: {myDog[0].years}</h2>
          <h4>Temperamento: {myDog[0].temper.join(', ')}</h4>
        </div>
       : myDog ?
       <div>
          <h1>{myDog.name}</h1>
          <img className="imagenDetalle"
            src={myDog.image ? myDog.image : myDog.img}
            alt=""
            
          />
          <h2>Altura : {myDog.height} cm</h2>
          <h3>Peso : {myDog.weight} kg</h3>
          <h2>Años de vida : {myDog.years} years</h2>
          <h4>Temperamento : {myDog.tempers?.map(e=>e.name).join(', ')}</h4>
        </div>
        :

        <p>Loading...</p>
      }

        <Link to ='/home'>
            <button className="botonVolver">◀Volver</button>
        </Link>

    </div>
   
  );
}


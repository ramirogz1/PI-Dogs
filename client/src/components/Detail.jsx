import React from "react";
import { Link , useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";


export default function Detail() {

  const dispatch = useDispatch();
  const {id}= useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch,id]);

  const myDog = useSelector((state) => state.detail);
  console.log(myDog)
  return (
    <div>
      {myDog.length > 0  ? 
        <div>
          <h1> {myDog[0].name}</h1>
          <img
            src={myDog[0].image ? myDog[0].image : myDog[0].img}
            alt=""
            width="500px"
            height="700px"
          />
          <h2>Altura: {myDog[0].height.join(' - ')}</h2>
          <h3>Peso: {myDog[0].weight.join(' - ')}</h3>
          <h2>Años de vida: {myDog[0].years}</h2>
          <h4>Temperamento: {myDog[0].temper.join(', ')}</h4>
        </div>
       : myDog ?
       <div>
          <h1>{myDog.name}</h1>
          <img
            src={myDog.image ? myDog.image : myDog.img}
            alt=""
            width="500px"
            height="700px"
          />
          <h2>Altura : {myDog.height}</h2>
          <h3>Peso : {myDog.weight}</h3>
          <h2>Años de vida : {myDog.years}</h2>
          <h4>Temperamento : {myDog.tempers?.map(e=>e.name).join(', ')}</h4>
        </div>
        :

        <p>Loading...</p>
      }

        <Link to ='/home'>
            <button>Volver</button>
        </Link>

    </div>
   
  );
}


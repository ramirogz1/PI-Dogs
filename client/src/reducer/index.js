const initalState = {
  dogs: [],
  temperaments: [],
  allDogs:[],
  detail: []
};

function rootReducer(state = initalState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
      case "GET_NAME_DOGS":
        return{
          ...state,
          dogs: action.payload,
          allDogs:action.payload
        }
    case "GET_TEMPERAMENTS":
       
      return {
        ...state,
        temperaments: action.payload,

        
      };

      case  "FILTER_BY_TEMPERAMENT":
        const allDogs = state.allDogs
        const filterDogs = allDogs.filter(e=> e.temper.includes(action.payload))
        return{
          ...state,
          dogs: filterDogs
        }
        case "FILTER_BY_ORIGEN" :
          const allDoguis = state.allDogs
          const idAllDogs = action.payload === "DataBase"?allDoguis.filter(e=>e.id.length>4): allDoguis.filter(e=>(e.id.toString().length<4));
          return{
            ...state,
            dogs:idAllDogs,
          }
          case "ORDER_BY_NAME":
            const sortedArr = action.payload === 'asc'? 
            state.dogs.sort(function(a,b){
              if(a.name > b.name){
                return 1
              }
              if(b.name > a.name){
                return -1
              }
              return 0
            }):
            state.dogs.sort(function(a,b){
              if(a.name > b.name){
                return -1
              }
              if(b.name > a.name){
                return 1
              }
              return 0
            })
            return{
              ...state,
              dogs:sortedArr
            }
            case "ORDEN_PESO":
              const sortedArrPeso = action.payload === 'min'? 
            state.dogs.sort(function(a,b){
              if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                return 1
              }
              if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                return -1
              }
              return 0
            }):
            state.dogs.sort(function(a,b){
              if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                return -1
              }
              if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                return 1
              }
              return 0
            }) 
              return{
              ...state,
              dogs:sortedArrPeso,
            }
              case "POST_DOGS":
                return {
                  ...state,
                  
                }
                case "GET_DETAILS":
                  return{
                    ...state,
                      detail: action.payload
                  }

    default:
      return state;
  }
}



export default rootReducer;

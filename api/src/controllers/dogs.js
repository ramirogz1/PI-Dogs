const {Dog, Temper} = require ('../db')

const {API_KEY} = process.env;
const axios = require ('axios')

const getApiInfo = async ()=> {
    try {
        const dogsAll = await axios.get('https://api.thedogapi.com/v1/breeds?api_key='+ API_KEY) // or ${API_KEY}
        const dogsFilter = dogsAll.data.map (e=>{ return {
            id:e.id ,
            name:e.name,
            height:e.height.metric,
            weight: e.weight.metric,
            years:e.life_span,
            temper:e.temperament?e.temperament.split(", "):"",
            image : e.image.url
        }})
        const sinFilter = []
        dogsFilter.forEach(element => {
            if(element.temper !== ""){
                sinFilter.push(element)
            }
            
        });
        
        
        return sinFilter;
    } catch (error) {
        console.log (error)
    }
}


const getDbInfo = async() => {
    try {
        const dogsDb = await Dog.findAll({
            
            include: {
                model: Temper,
                attributes : ['name'],
                through:{
                    attributes:[],
                }
            }
        })
      
        const dogDb2 = dogsDb.map(e=>{
            return{
                id: e.id,
                name: e.name,
                image : e.image,
                height: e.height,
                weight: e.weight,
                years: e.years,
                temper: e.tempers?.map(e=> e.name),
            }
        })
        
        return dogDb2
    
        
        
        

    } catch (error) {
        console.log(error)
    }
    
}

const getDogAll = async ()=> {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal 
}

module.exports = {getDogAll}


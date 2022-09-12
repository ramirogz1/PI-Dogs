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
            temperament :e.temperament,
            image : e.image.url,
        }})
        return dogsFilter;
    } catch (error) {
        console.log (error)
    }
}

const getDbInfo = async() => {
    try {
        const dogsDb = await Dog.findAll({
            where: {
                id,
                name,
                image,
                height,
                weight,
                years,
            },
            include: {
                model: Temper,
                attributes : ['name'],
                through:{
                    attributes:[],
                }
            }
        })
        return dogsDb;

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

module.exports = getDogAll


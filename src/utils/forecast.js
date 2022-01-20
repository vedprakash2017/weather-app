const request = require('request')

const forecast = ( lati , long  , callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=29bf5d29bce5a1de0536f4ea13d9b1f3&query=' + lati+','+long
    request({url , json:true}, (err, res)=>{
        if(err)
        {
            callback('unable to connect!' , undefined)
        }
        else if( res.body.error)
        {
            callback('provide a valid location!' , undefined)    
        }
        else
        {
            const data = {
                weather: res.body.current.weather_descriptions,
                temperature: res.body.current.temperature
                }
            callback( undefined , data)
        }
    })

}

module.exports = forecast
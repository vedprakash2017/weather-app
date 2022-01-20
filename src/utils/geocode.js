const request = require('request')

const geocode = (address , callback)=>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmVkdmVkdmVkIiwiYSI6ImNreW13NjN6YTJwNW8ydXFwZWl5OTVna2YifQ.iO4fcDgD6uy0xNBd-hIh0A&limit=1'
    request({url , json:true}, (err, res)=>{
        if(err || res.body.features === undefined)
        {
            callback('unable to locate!' , undefined)
        }
        else if( res.body.features.length === 0)
        {
            callback('provide a valid location!' , undefined)    
        }
        else
        {
            const data = {
                lati:res.body.features[0].center[1],
                long:res.body.features[0].center[0],
                place:res.body.features[0].place_name
            }
            callback( undefined , data)
        }
    })

}

module.exports = geocode
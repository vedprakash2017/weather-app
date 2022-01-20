const express= require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const publicdir = path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')
const port = process.env.PORT | 4000

app.use(express.static(publicdir))
app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialPath)

app.get('' , (req,res)=>{
    res.render('index' , {
        title:'Weather app',
        name:'Ved'
    })
})

app.get('/about' , (req, res)=> {
    res.render('about', {
        title:'About',
        name:'Ved',
        msg:'It\'s a weather app where you can search weather of any city by mentioned it\'s name'
    })
})

app.get( '/help' , (req,res)=>{
    res.render('help', {
        title:'Help',
        name:'Ved',
        msg:'We can help you out here'
    })
})

app.get('/weather' , (req,res)=>{
    if(req.query.address === undefined)
    {
        return res.send({
            error : 'Hey, Please provide the address' // you cant sent 2 res so that if error occured then return from there 
                        })
    }

    console.log(req.query.address)
    const address = req.query.address
    geocode( address , (error , {place, lati , long}={})=>{
        if(error)
        return res.send({error})
        else
        {
            console.log( place)
            forecast( lati , long , (error, { weather , temperature:temp})=> 
            {  
                if(error)
                return res.send({error})             
                else

                res.send({
                    temperature:temp,
                    forecast:weather,
                    location: place,
                    Address: decodeURIComponent(req.query.address)
                })
                  console.log( weather + ' , temperature : ' + temp)
            })
        }
    })

})

// app.get('/help/*' , (req,res)=>{
//     res.render('404',{
//         title:'404',
//         name:'Ved',
//         error:'Help article not found'
//     })
// })

app.get('*' , (req,res)=>{
    res.render('404' , {

        title:'404',
        name:'Ved',
        error:'Page not found'
    })
})
app.listen( port , ()=>{
    console.log('Server is running!')
})
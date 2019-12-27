const express = require('express');
const path = require('path');
const hbs = require('hbs');
let utils = require('./utils/utils.js');

const app =express();
const publicDirectoryPath = path.join(__dirname, './public')
const partialsPath = path.join(__dirname,'./partials');

app.set('view engine','hbs');
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Homepage',
        Author: 'Devansh Agarwal'
    })
});

app.get('/help',(req,res)=>{
    res.render('index',{
        title: 'Help page',
        Author: 'Devansh Agarwal, contact: 9897940889'
    })
});

app.get('/about',(req,res)=>{
    res.render('index',{
        title: 'About page',
        Author: 'Devansh Agarwal, contact: 9897940889'
    })
});

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'Please enter the address!',
        })
    }
    else{
        utils.geocode(req.query.address, (data,error) =>{
            if(error){
                return res.send({
                    error: error,
                })
            }  
            else {utils.forecast(data.latitude,data.longitude,data.location,(data,location,error) =>{
                if(error){ return res.send({
                    error: error,
                }) }
                
                res.send({
                    temperature: data,
                    location: location,
                    address: req.query.address
                })
            })
        }
        })
    }
});

app.listen(3000, ()=>{
    console.log("Hello dawgs! Listening to port 3000!");
})
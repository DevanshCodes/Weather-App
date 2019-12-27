const request = require('request');

const geocode = function(address, callback){
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZGV2YW5zaGNvZGVzIiwiYSI6ImNrNGw4bW5xeTBodXYza2w1bDR0dzFuZHMifQ.qvp96k4nk1Keo4ypxnQlEg'
    request({url:url, json:true}, (error,response,body) => {
        if(error){
            callback(undefined, 'Unable to connect to location services!');
        }
        else if(body.features.length===0){
            callback(undefined, 'unable to find location!')
        }
        else{
            callback({
                
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,

            }, undefined);
        }
    })
}

const forecast = function(latitude,longitude,location,callback){
    let url = 'https://api.darksky.net/forecast/f0002b4aa4e322f5cb1f9125f52ec6ae/'+latitude+',' + longitude + '?units=si';
    request({url:url, json:true}, (error,response,body)=>{
        if(error){
            callback(undefined, 'unable to connect to weather services');
        }
        else if(body.code===400){
            callback(undefined,'Sorry the coordinates provided are wrong');
        }
        else{
            callback(body.currently.temperature,location,undefined);
        }
    })
}



module.exports = { geocode: geocode,
                   forecast:forecast,}
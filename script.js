



// setting the map
var mymap = L.map('mapid').setView([36.8065,10.1815], 2)
    
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieW91aGFubmE5OCIsImEiOiJja3JzMzh0bGUwZWtjMndtbG8xZjcwYm5sIn0.EMqBD9gNPguZYx-wUm5gFQ'
}).addTo(mymap)

//display section variables

var ip = document.getElementsByClassName("ip")[0]
var loc = document.getElementsByClassName("location")[0]
var timezone = document.getElementsByClassName("timezone")[0]
var isp = document.getElementsByClassName("isp")[0]

async function userPosition()
{
     var response = await fetch("https://geo.ipify.org/api/v1?apiKey=at_6HAikqSj9SulCtaSExcj0Y56dUVcP&ipAddress")
     var data = await response.json()
     console.log(data)
     var circle = L.circle([data.location.lat, data.location.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap)
    circle.bindPopup("Current Position").openPopup()


    //display section 
    ip.innerHTML = data.ip
    loc.innerHTML = data.location.country + " , " + data.location.city
    timezone.innerHTML = data.location.timezone 
    isp.innerHTML = data.isp
}

userPosition()


function chosenIp()
{
    var submit =  document.getElementsByTagName('input')[1]
    var searchBar = document.getElementsByTagName('input')[0]
    submit.addEventListener("click", async() => {
     var IP = searchBar.value 
     var API = "https://geo.ipify.org/api/v1?apiKey=at_6HAikqSj9SulCtaSExcj0Y56dUVcP&ipAddress=" + IP
       var response = await fetch(API)
       var data =  await response.json()
       console.log(data)
       var marker = L.marker([data.location.lat, data.location.lng]).addTo(mymap);
       ip.innerHTML = data.ip
       loc.innerHTML = data.location.country + " , " + data.location.city
       timezone.innerHTML = data.location.timezone 
       isp.innerHTML = data.isp
    })
}


chosenIp()

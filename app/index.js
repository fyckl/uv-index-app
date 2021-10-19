const apiKey = '48c123adbe84d06b9390564c28f11e6a'

function getCurrentPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    } else{
        console.log("Geo location not supported :(")
    }
}
function showPosition(position){
    let longitude = position.coords.longitude
    let latitude = position.coords.latitude
    loadApiData()
    function loadApiData(){
        const xhttp = new XMLHttpRequest()
        xhttp.onload = function(){
            let response = xhttp.response
            response.forEach(uvData => {
                
            });
        }
        xhttp.open("GET", `https://api.openuv.io/api/v1/forecast?lat=${latitude}&lng=${longitude}`, true)
        xhttp.setRequestHeader('x-access-token', apiKey)
        xhttp.send()
    }
}

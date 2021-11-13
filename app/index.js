// Variable for API keys, html elements
const uvAPIKey = '48c123adbe84d06b9390564c28f11e6a'
// Extra uvAPI Keys incase of a rate limit 
// 48c123adbe84d06b9390564c28f11e6a
// 93f21f1aca9ebdef4701de35fc8354e5
// eecb346faf3da5f29b487b99c291e0b8 
const positionAPIKey = "f906b0b0af0e48e1871c65bb627f0a49"
const uvHtml = document.getElementById('uv')
const cityInput = document.getElementById('autoComplete')
const getUVButton = document.getElementById('getUVButton')
const inputEnter = document.getElementById('autoComplete')
const resetButton = document.getElementById('resetButton')
const timeText = document.getElementById('timeText')
var chart = document.getElementById('myChart')

// Variables for 
let lat = null
let long = null
let apiURL = null
let uvDataArray = null
let city = null
let country = null

// Event listener that triggers a function on load to pre-load previous search queries
window.addEventListener('load', function(){
  let lastQuery = localStorage.getItem("searched item")
  inputEnter.value = lastQuery
})

// Event listener for the button which triggers a function
getUVButton.addEventListener('click', getPosition)
inputEnter.addEventListener('keypress', function(e){
    console.log(e)
    if(e.key == 'Enter'){
      console.log('test')
      getPosition()
  }
})

// A function to check if the input is empty, if not proceeds to next function
function getPosition() {
    // This parameter checks if the input value is empty
    if (cityInput.value == "") {  

      console.log("Empty fields")

    } else{

      getLatLong()

    }
}

// A function that gets the lat and long of a searched query then triggers another function
async function getLatLong() {

  const location = cityInput.value
  const positionAPIUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${positionAPIKey}`
  const response = await fetch(positionAPIUrl)
  const responseJson = await response.json()

  city = responseJson.results[0].components.city + ", "
  country = responseJson.results[0].components.country

  lat = responseJson.results[0].geometry.lat
  long = responseJson.results[0].geometry.lng
  // console.log(lat + " " + long)
  getApiData()

}

// This function get's the UV Index data as well as generating the graph for it
async function getApiData(){

  apiURL = `https://api.openuv.io/api/v1/forecast?lat=${lat}&lng=${long}`
  const response = await fetch(apiURL, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': uvAPIKey

    }
  })

  const responseJson = await response.json()

  uvDataArray = responseJson.result

  // const uvTime2 = uvDataArray.filter(test1 => test1.uv_time)
  // const uv2 = uvDataArray.filter(uvData => uvData.uv)
  
  const uvTime = []
  const uvData = []

  uvDataArray.forEach(element => {

    let d = new Date(element.uv_time)
    let hour = d.getHours()
    let min = d.getMinutes()

    if(min < 10){

      min = "0" + min

    }
    if(hour < 12){

      min = min + "am"

    } else{

      min = min + "pm"

    }
    if(hour > 12){

      hour = hour - 12

    }
    if(hour == 0){

      hour = 12

    }
    let time = hour + ":" + min
    uvTime.push(time)

  });

  uvDataArray.forEach(element => {
    uvData.push(element.uv)
  });

  if(city == undefined + ", "){

    city = ""

  }

  const labels = uvTime;
  const data = {

    labels: labels,
    datasets: [{

      label: `Todays expected UV Forecast in ${city}${country}`,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: uvData,

    }]
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {

          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 12

        }
      }
    },
  };
  
  const myChart = new Chart(

    document.getElementById('myChart'),
    config

  )

  if(config){
    inputEnter.style.display = 'none'
    getUVButton.style.display = 'none'
    resetButton.style.display = 'inline-block'
    timeText.style.display = 'block'
  }
  localStorage.setItem("searched item", `${city}${country}`)
}



const autoCompleteJS = new autoComplete({

  placeHolder: "Search for City...",
  data: {

      src: ["Melbourne, Australia" , "Beijing, China" , "Tokyo, Japan", "Paris, France"],
      cache: true,

  },
  resultItem: {
      highlight: true
  },
  events: {
      input: {

          selection: (event) => {
              const selection = event.detail.selection.value;
              autoCompleteJS.input.value = selection;

          }
      }
  }
  
  
})

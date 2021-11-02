const apiKey = '48c123adbe84d06b9390564c28f11e6a'
// 48c123adbe84d06b9390564c28f11e6a
// 93f21f1aca9ebdef4701de35fc8354e5
// eecb346faf3da5f29b487b99c291e0b8 
const uvHtml = document.getElementById('uv')

let lat = null
let long = null
let apiURL = null
let uvDataArray = null

function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{
          lat = position.coords.latitude
          long = position.coords.longitude
          apiURL = `https://api.openuv.io/api/v1/forecast?lat=${lat}&lng=${long}`
          getApiData()
        }
        )
    } else {
        console.log("Geo location not supported")
    }
}

async function getApiData(){
  const response = await fetch(apiURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': apiKey
    }
  })
  const responseJson = await response.json()
  uvDataArray = responseJson.result
  console.log(uvDataArray)
  const labels = [
    uvDataArray[0].uv_time, 
    uvDataArray[1].uv_time, 
    uvDataArray[2].uv_time, 
    uvDataArray[3].uv_time, 
    uvDataArray[4].uv_time, 
    uvDataArray[5].uv_time, 
    uvDataArray[6].uv_time, 
    uvDataArray[7].uv_time, 
    uvDataArray[8].uv_time, 
    uvDataArray[9].uv_time, 
    uvDataArray[10].uv_time, 
    uvDataArray[11].uv_time, 
    uvDataArray[12].uv_time, 
    uvDataArray[13].uv_time
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Todays UV Index',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [
      uvDataArray[0].uv, 
      uvDataArray[1].uv, 
      uvDataArray[3].uv, 
      uvDataArray[4].uv, 
      uvDataArray[5].uv, 
      uvDataArray[6].uv, 
      uvDataArray[7].uv, 
      uvDataArray[8].uv, 
      uvDataArray[9].uv, 
      uvDataArray[10].uv, 
      uvDataArray[11].uv, 
      uvDataArray[12].uv, 
      uvDataArray[13].uv 
    ],
    }]
  };
  
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  )

  
}

// async function showPosition(position) {
//     let longitude = position.coords.longitude
//     let latitude = position.coords.latitude
//     const response = await fetch(`https://api.openuv.io/api/v1/forecast?lat=${latitude}&lng=${longitude}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': apiKey,
//         }
//     });
//     const uvDataArray = await response.json()
//     console.log(uvDataArray.result)
//     return uvDataArray.result
//     uvDataArray.result.forEach(element => {
//         let date = new Date(element.uv_time)
//         let hour = date.getHours()
//         let seconds = date.getSeconds()
//         uvHtml.innerHTML +=  `${(element.uv)} - ${hour}:${seconds} | `
//     })
// }

// const uvData = function showPosition(position)



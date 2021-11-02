const apiKey = 'eecb346faf3da5f29b487b99c291e0b8'
// 48c123adbe84d06b9390564c28f11e6a
// 93f21f1aca9ebdef4701de35fc8354e5
// eecb346faf3da5f29b487b99c291e0b8 
const uvHtml = document.getElementById('uv')

function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log("Geo location not supported")
    }
}

async function showPosition(position) {
    let longitude = position.coords.longitude
    let latitude = position.coords.latitude
    const response = await fetch(`https://api.openuv.io/api/v1/forecast?lat=${latitude}&lng=${longitude}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': apiKey,
        }
    });
    const uvDataArray = await response.json()
    uvDataArray.result.forEach(element => {
        let date = new Date(element.uv_time)
        let hour = date.getHours()
        let seconds = date.getSeconds()
        uvHtml.innerHTML +=  `${(element.uv)} - ${hour}:${seconds} | `
    });
    console.log(uvDataArray.result)
}

date = new Date('2021-11-01T02:12:51.233Z')
year = date.getHours()
console.log(year)


const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
  );
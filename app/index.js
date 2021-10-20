const apiKey = 'eecb346faf3da5f29b487b99c291e0b8'
// 48c123adbe84d06b9390564c28f11e6a
// 93f21f1aca9ebdef4701de35fc8354e5
// eecb346faf3da5f29b487b99c291e0b8 

function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log("Geo location not supported :(")
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
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
}
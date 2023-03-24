
const apiUrl = 'http://localhost:8000/v1'

async function httpGetPlanets () {
  
  const result = await fetch(`${ apiUrl }/planets/`)
  return await result.json()
  // TODO: Once API is ready.
  // Load planets and return as JSON.

 
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const result = await fetch(`${ apiUrl }/launches/`);
  const fetchedLaunches = await result.json();
  return fetchedLaunches.sort((a, b) => {
   return a.flightNumber - b.flightNumber
  })


}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.

  try {
    return await fetch(`${ apiUrl }/launches/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch)
    })
  } catch (error) {
    return {
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {
 try {
   return await fetch(`${ apiUrl }/launches/${id}`, {
    method: "DELETE"
  })
 } catch (error) {
  console.log(error.message)
 }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
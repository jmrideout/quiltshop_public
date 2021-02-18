// UserAPI
// Fetch calls to django
const ADDRESS_URL = "http://localhost:8000/authentication";

const login = async (userCredentials) => {
  const options = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userCredentials)
  }
  let response = await fetch(`${ADDRESS_URL}/token`, options);
  return response;
}

const getLoggedInUser = async () => {
  const token = localStorage.getItem("token");
  console.log(`getloggedinuser found token: ${token}`)
  const options = {
    "headers": {
      "Content-Type": "application/json",
      'Authorization': `JWT ${token}`
    }
  }
  let response = await fetch(`${ADDRESS_URL}/current_user`, options);
  return response;
}


export {login, getLoggedInUser}

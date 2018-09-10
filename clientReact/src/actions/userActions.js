export const registerUser = (registerData) => dispatch => {
  fetch('http://localhost:4000/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })
    .then(res => res.json())
    .then(load => {
      if(load.success){
        dispatch({
          type: "SET_USER",
          payload: load
        })
        localStorage.setItem('token', load.token);
        localStorage.setItem('user', JSON.stringify(load.user));
      } else {
        // console.log(load);
        dispatch({
          type: "SET_ERROR",
          payload: load.msg
        })
      }
    });
};

export const loginUser = (loginData) => dispatch => {
  fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(res => res.json())
    .then(load => {
      if(load.success){
        dispatch({
          type: "SET_USER",
          payload: load
        })
        // console.log(load.token, load.user);
        localStorage.setItem('token', load.token);
        localStorage.setItem('user', JSON.stringify(load.user));
      } else {
        // console.log(load);
        dispatch({
          type: "SET_ERROR",
          payload: load.msg
        })
      }
    });
};

export const clearError = () => {
  return {type: "CLEAR_ERROR"}
}

export const logOut = () => {
  localStorage.clear();
  return {type: "LOGOUT"}
}

export const loadTokenAndUser = () => {
  return {type: "LOAD_TOKEN&USER"}
}

export const validateToken = (token) => dispatch => {
  fetch('http://localhost:4000/profile', {    
    headers: {
    'content-type': 'application/json',
    'Authorization': token
    }
  })
  .then(res => {
    // console.log(res.ok);
    if (!res.ok) {
      localStorage.clear();      
      dispatch({type: "LOGOUT"});
      return console.log(res.statusText);
    }
    return res.json();
  })
  // .then(res => res.json())
  .then(res => {
    // console.log(res);
    if (res.tokenIsValid) {
      // console.log(res.tokenIsValid)
      dispatch({type: "LOAD_TOKEN&USER"});
    }
    else dispatch({type: "LOGOUT"});
  })
  // .then(res => {res.json()})
  // .then(load => console.log(load, typeof load))
  .catch(err => console.log(err)) //cia manau galima dispatchinti LOGOUT
}
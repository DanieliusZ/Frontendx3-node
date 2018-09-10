export const fetchPanels = () => dispatch => {
    fetch('http://localhost:4000/home')
      .then(res => res.json())
      .then(load =>
        dispatch({
          type: "GET_ALL_PANELS",
          payload: load
        })
      );
  };

export const saveNewPanel = (newPanelData, token) => dispatch => {
  fetch('http://localhost:4000/newpanel', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(newPanelData)
  })
    .then(res => res.json())
    .then(load => {
      if(load.success){
        dispatch({
          type: "PANEL_SAVED",
        })
      } else {
        console.log(load);
        dispatch({
          type: "SET_ERROR",
          payload: load.msg
        })
      }
    });
};

export const clearPanelSaveStatus = () => {
  return {type: "PANEL_SAVE_CLEARED"}
}
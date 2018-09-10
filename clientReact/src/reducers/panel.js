const panel = (state = {
    panels: [],
    panelSaved: false,
    // errorMsg : null
}, action) => {
    switch (action.type) {
        case "GET_ALL_PANELS":
            state = {
                ...state,
                panels: action.payload
            };
            break;
        case "PANEL_SAVED":
            state = {
                ...state,
                panelSaved: true
            };
            break;
        case "PANEL_SAVE_CLEARED":
            state = {
                ...state,
                panelSaved: false
            };
            break;
        default:
            return state;
    }
    return state;
};

export default panel;
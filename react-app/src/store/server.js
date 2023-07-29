


/*************** TYPES **************************/
const GET_ALL_SERVERS = "server/GET_ALL_SERVERS"
const GET_USER_SERVERS = "server/GET_USER_SERVERS"
const GET_SERVER = "server/GET_SERVER"
const CREATE_SERVER = "server/CREATE_SERVER"
const UPDATE_SERVER = "server/UPDATE_SERVER"
const DELETE_SERVER = "server/DELETE_SERVER"




/*************** ACTIONS CREATOR **************************/
export const getAllServersAction = (servers) => {
    console.log("hello")
    return {
        type: GET_ALL_SERVERS,
        payload: servers
    };
};


/******/


export const getServerAction = (server) => {
    return {
        type: GET_SERVER,
        payload: server
    };
};


/******/


export const getUserServersAction = (servers) => {
    return {
        type: GET_USER_SERVERS,
        payload: servers
    };
};


/******/


export const createServerAction = (server) => {
    return {
        type: CREATE_SERVER,
        payload: server
    };
};


/******/


export const updateServerAction = (server) => {
    return {
        type: UPDATE_SERVER,
        payload: server
    };
};

/******/


export const deleteServerAction = (server) => {
    return {
        type: DELETE_SERVER,
        payload: server
    };
};


/*************** THUNK ACTIONS CREATOR **************************/

export const getAllServersThunk = () => async (dispatch) => {
    const res = await fetch("/api/servers");
    if (res.ok) {
        const servers = await res.json();
        dispatch(getAllServersAction(servers));
        return servers;
    }
}



/******/





// REDUCER
// const initialState = {};

export default function serverReducer(state = {}, action) {
    let newState;

	switch (action.type) {
		case GET_ALL_SERVERS:
            newState = {};
            const allServers = action.payload;
            allServers.forEach((server) => {
                newState[server.id] = server
            })
			return newState;
		// case REMOVE_USER:
		// 	return { user: null };
		default:
			return state;
	}
}



// window.store.dispatch(window.serverActions.getAllServersThunk());
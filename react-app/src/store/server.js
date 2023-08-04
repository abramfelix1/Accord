/*************** TYPES **************************/
const GET_ALL_SERVERS = "server/GET_ALL_SERVERS"
// const GET_USER_SERVERS = "server/GET_USER_SERVERS"
const GET_SERVER = "server/GET_SERVER"
const CREATE_SERVER = "server/CREATE_SERVER"
const UPDATE_SERVER = "server/UPDATE_SERVER"
const DELETE_SERVER = "server/DELETE_SERVER"



/*************** ACTIONS CREATOR **************************/
export const getAllServersAction = (servers) => {
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


// export const getUserServersAction = (servers) => {
//     return {
//         type: GET_USER_SERVERS,
//         payload: servers
//     };
// };


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


export const deleteServerAction = (server_id) => {
    return {
        type: DELETE_SERVER,
        payload: server_id
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


export const getServerThunk = (server_id) => async (dispatch) => {
    const res = await fetch(`/api/servers/${server_id}`);

    if(res.ok) {
        const server = await res.json();
        dispatch(getServerAction(server));
        return server;
    }
}

export const createServerThunk = (server_name) => async (dispatch) => {
    const reqBody = JSON.stringify({
        server_name,
    })

    const res = await fetch("/api/servers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: reqBody,
    });

    // if the response is good. recall the get all servers thunk
    // to get the redux updated with all the servers again to
    // prevent loading issues
    if (res.ok) {
        const newServer = await res.json();
        await dispatch(getAllServersThunk());
        return newServer
    } else {
        const error = await res.json();
        return error;
    }
}


export const updateServerThunk = (server_id, server_name, server_image) => async (dispatch) => {
    const reqBody = JSON.stringify({
        server_name,
        server_image
    })

    const res = await fetch(`/api/servers/${server_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: reqBody,
    });

    // if the response is good. recall the get all servers thunk
    // to get the redux updated with all the servers again to
    // prevent loading issues
    if (res.ok) {
        const updatedServer = await res.json();
        await dispatch(getAllServersThunk());
        return updatedServer
    } else {
        const error = await res.json();
        return error;
    }
}

export const deleterServerThunk = (server_id) => async (dispatch) => {
    const res = await fetch(`/api/servers/${server_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // if the response is good. recall the get all servers thunk
    // to get the redux updated with all the servers again to
    // prevent loading issues
    if (res.ok) {
        dispatch(deleteServerAction(server_id))
    }
}



// REDUCER

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
		case GET_SERVER:
            newState = {}
            newState[action.payload.id] = action.payload
			return newState;
        case DELETE_SERVER:
            newState = state;
            delete newState[action.payload];
            return newState;
		default:
			return state;
	}
}



// window.store.dispatch(window.serverActions.getAllServersThunk());
// window.store.dispatch(window.serverActions.createServerThunk("1", "NEWNAME"));

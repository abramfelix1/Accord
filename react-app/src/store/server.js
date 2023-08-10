
import { getUserServersThunk } from "./user";
import * as userActions from "./user";
import * as channelActions from "./channels";
import * as messageActions from "./message";
import * as memberActions from "./members";

/*************** TYPES **************************/
export const GET_ALL_SERVERS = "server/GET_ALL_SERVERS";
// const GET_USER_SERVERS = "server/GET_USER_SERVERS"
export const GET_SERVER = "server/GET_SERVER";
export const CREATE_SERVER = "server/CREATE_SERVER";
export const UPDATE_SERVER = "server/UPDATE_SERVER";
export const DELETE_SERVER = "server/DELETE_SERVER";

/*************** ACTIONS CREATOR **************************/
export const getAllServersAction = (servers) => {
  return {
    type: GET_ALL_SERVERS,
    payload: servers,
  };
};

/******/

export const getServerAction = (server) => {
  return {
    type: GET_SERVER,
    payload: server,
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
    payload: server,
  };
};

/******/

export const updateServerAction = (server) => {
  return {
    type: UPDATE_SERVER,
    payload: server,
  };
};

/******/

export const deleteServerAction = (server_id) => {
  return {
    type: DELETE_SERVER,
    payload: server_id,
  };
};

/*************** THUNK ACTIONS CREATOR **************************/

export const getAllServersThunk = () => async (dispatch) => {
  const res = await fetch("/api/servers/");

  if (res.ok) {
    const servers = await res.json();
    dispatch(getAllServersAction(servers));
    return servers;
  }
};

/******/

export const getServerThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server_id}`);
  const res2 = await fetch(`/api/users/servers`);

  if (res.ok) {
    const server = await res.json();
    const userServers = await res2.json();
    let isAllowed = userServers.find((server) => server.id == server_id);
    if (isAllowed) {
      dispatch(getServerAction(server));
      return server;
    } else {
      throw new Error("NOT ALLOWED");
    }
  } else {
    throw new Error("NOT ALLOWED");
  }
};



/******/


export const createServerThunk =
  (owner_id, server_name, image_url) => async (dispatch) => {
    const res = await fetch("/api/servers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner_id: owner_id,
        server_name: server_name,
        server_image: image_url,
      }),
    });

    // if the response is good. recall the get all the users servers thunk
    // to get the redux updated with all the servers again to
    // prevent loading issues
    if (res.ok) {
      const newServer = await res.json();
      await dispatch(getUserServersThunk());
      return newServer;
    } else {
      const error = await res.json();
      return error;
    }
  };

/******/


export const updateServerThunk =
  (server_id, server_name, server_image) => async (dispatch) => {
    const reqBody = JSON.stringify({
      server_name,
      server_image,
    });

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
      return updatedServer;
    } else {
      const error = await res.json();
      return error;
    }
  };


export const deleteServerThunk = (server_id) => async (dispatch) => {
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
    const data = res.json()
    dispatch(deleteServerAction(server_id));
    return data
  }
};

// REDUCER

const initialState = {
  state: {},
};

export default function serverReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SERVERS:
      newState = {};
      const allServers = action.payload;
      allServers.forEach((server) => {
        newState[server.id] = server;
      });
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

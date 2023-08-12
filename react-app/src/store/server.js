import { getUserServersThunk } from "./user";
import * as userActions from "./user";
import * as channelActions from "./channels";
import * as messageActions from "./message";
import * as memberActions from "./members";

/*************** TYPES **************************/
export const GET_ALL_SERVERS = "server/GET_ALL_SERVERS";
// const GET_USER_SERVERS = "server/GET_USER_SERVERS"
export const GET_SERVER = "server/GET_SERVER";
export const GET_SERVER2 = "server/GET_SERVER2";
export const CREATE_SERVER = "server/CREATE_SERVER";
export const UPDATE_SERVER = "server/UPDATE_SERVER";
export const DELETE_SERVER = "server/DELETE_SERVER";
export const UPDATE_SERVER_IMAGE = "server/UPDATE_SERVER_IMAGE";

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

export const getServerAction2 = (server) => {
  return {
    type: GET_SERVER2,
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

/******/

export const updateServeImageAction = (server) => {
  return {
    type: UPDATE_SERVER_IMAGE,
    payload: server,
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

export const getServer = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server_id}`);

  if (res.ok) {
    const server = await res.json();
    dispatch(getServerAction2(server));
    return server;
  }
};

//update get server route
export const getServerThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server_id}`);

  if (res.ok) {
    const server = await res.json();
    return server;
  } else {
    throw new Error("NOT ALLOWED");
  }
};

/******/

export const createServerThunk =
  (owner_id, server_name) => async (dispatch) => {
    const res = await fetch("/api/servers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner_id: owner_id,
        server_name: server_name,
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
  (server_id, server_name) => async (dispatch) => {
    const reqBody = JSON.stringify({
      server_name,
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
      await dispatch(updateServerAction(updatedServer));
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
    const data = await res.json();
    console.log(data, "4444444444444");
    dispatch(deleteServerAction(server_id));
    return data;
  }
};

export const uploadServerImageThunk =
  (server_id, image) => async (dispatch) => {
    const res = await fetch(`/api/servers/${server_id}/image`, {
      method: "PUT",
      body: image,
    });

    if (res.ok) {
      const updatedServer = await res.json();
      dispatch(userActions.getUserServersThunk());
      return updatedServer;
    } else {
      const error = await res.json();
      return error;
    }
  };

export const removeServerImageThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server_id}/image/remove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
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
    // case DELETE_SERVER:
    //   newState = { ...state };
    //   console.log(action.payload, "4444444444444444444444")
    //   delete newState[action.payload];
    //   return newState;
    case UPDATE_SERVER:
      newState = { ...state };
      console.log(newState, "newState");
      newState[action.payload.id] = action.payload;
      console.log(action.payload, "action payload");
      console.log(newState[action.payload.id], "newstate payload");

      return newState;
    default:
      return state;
  }
}

// window.store.dispatch(window.serverActions.getAllServersThunk());
// window.store.dispatch(window.serverActions.createServerThunk("1", "NEWNAME"));

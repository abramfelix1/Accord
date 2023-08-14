import { io } from "socket.io-client";

const socket = io();

/* TODO
-implement chatUpdate to Chat.js (chatUpdate accounts for all CRUD)
  --Update reducers to corresponding thunks
---BONUS---
-create channelUpdate for realtime CRUD
  --Only when viewing a server
-create serverUpdate for realtime CRUD
  --Global
-create memberUpdate for realtime CRUD
  --Only when viewing a server
-setup online/offline feature
  --On login establish all listeners for server wide use
  --On logout disconnect sockets
*/

/*
If BE emits "update_chat_response", send channelID and serverID to FE, Update listener for "update_chanel_response" logic for handle messages
dispatches to only dispatch get messages if the param channel id == channelID send from the backend. If so, dispatch, if not, send data update to other state or give that channel/server an alert icon.
Implement has read or view emitter/listener? if that happens.
*/

/*
Before working withs server(s) reducer, try update thunks to work with current socket set up,
If not, check send message from client to backend for other clients to recieve what type of update to dispatch
*/

export function startListeners(user) {
  console.log("***LISTENING FOR SEND MESSAGE RESPONSE***");
  socket.on("disconnect_response", (data) => {
    console.log(data["Message"]);
    console.log(data["Users"]);
  });
}

export function disconnectSockets() {
  socket.disconnect();
}

export function joinServer(user_id) {
  console.log("***EMIT JOIN SERVER***");
  socket.emit("join_server", { user_id });
  console.log("***LISTENING FOR JOIN SERVER RESPONSE***");
  socket.on("join_server_response", (data) => {
    console.log(data["Message"]);
    console.log(data["Users"]);
  });
}

export function addServer(server_id) {
  console.log("***EMIT ADD SERVER***");
  socket.emit("add_server", { server_id: server_id });
}

export function chatUpdate(payload) {
  socket.emit("chat_update", payload);
}

export function handleChatUpdates(callbacks, chid) {
  socket.on("chat_update_response", (data) => {
    const {
      server_id,
      channel_id,
      message_id,
      Action_Type: actionType,
      message: message,
    } = data;
    if (channel_id == chid && callbacks[actionType]) {
      callbacks[actionType](data);
    }
  });
}

export function channelUpdate(payload) {
  console.log("***EMIT CHANNEL UPDATE***");
  socket.emit("channel_update", payload);
}

export function handleChannelUpdates(callbacks, chid) {
  console.log("***LISTENING FOR CHANNEL UPDATES***");

  socket.on("channel_update_response", (data) => {
    const {
      server_id,
      channel_id,
      Action_Type: actionType,
      channel: channel,
      channel_name: channel_name,
    } = data;
    if (callbacks[actionType]) {
      console.log(`${actionType} CHANNEL SOCKET EMITTED`);
      callbacks[actionType](data);
    }
  });
}

export function memberUpdate(payload) {
  console.log("***EMIT MEMBER UPDATE***");
  console.log(payload);
  socket.emit("member_update", payload);
}

export function handleMemberUpdates(callbacks, chid) {
  console.log("***LISTENING FOR MEMBER UPDATES***");

  socket.on("member_update_response", (data) => {
    const {
      server_id,
      member_id: member_id,
      Action_Type: actionType,
      member: member,
    } = data;
    if (callbacks[actionType]) {
      console.log(`${actionType} MEMBER SOCKET EMITTED`);
      callbacks[actionType](data);
    }
  });
}

export default socket;

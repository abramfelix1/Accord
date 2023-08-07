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
  socket.on("chat_update_response", (data) => {
    console.log(data["Message"]);
  });
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

export function chatUpdate(server_id, channel_id) {
  console.log("***EMIT CHAT UPDATE***");
  socket.emit("chat_update", { server_id, channel_id });
}

export function handleChatUpdates(callback, chid) {
  console.log("***LISTENING FOR CHAT UPDATES***");
  socket.on("chat_update_response", (data) => {
    console.log("***CHAT UPDATES EVENT DATA***");
    const channel_id = data.channel_id;
    if (channel_id == chid) {
      console.log("******************************");
      console.log(channel_id, chid);
      callback(channel_id);
    }
  });
}

export default socket;

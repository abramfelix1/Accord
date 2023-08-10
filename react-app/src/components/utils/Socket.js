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
    console.log(data["Action_Type"]);
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

export function chatUpdate(
  server_id,
  channel_id,
  action_type,
  message_id = null
) {
  console.log("***EMIT CHAT UPDATE***");
  socket.emit("chat_update", {
    server_id,
    channel_id,
    action_type,
    message_id,
  });
}

export function handleChatUpdates(callbacks, chid) {
  console.log("***LISTENING FOR CHAT UPDATES***");
  socket.on("chat_update_response", (data) => {
    const server_id = data.server_id;
    const channel_id = data.channel_id;
    const message_id = data.message_id;
    const actionType = data.Action_Type;
    console.log(server_id, channel_id, message_id, actionType);
    if (channel_id == chid && actionType == "CREATE") {
      console.log("CREATING SOCKET EMITTED");
      callbacks[actionType](channel_id);
    }
    if (channel_id == chid && actionType == "DELETE") {
      console.log("DELETING SOCKET EMITTED");
      console.log("DELETEING:");
      callbacks[actionType]({ server_id, channel_id, message_id });
    }
  });
}

export default socket;

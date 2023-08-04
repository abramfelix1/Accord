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

export function startListeners(user) {
  console.log("***LISTENING FOR SEND MESSAGE RESPONSE***");
  socket.on("chat_update_response", (data) => {
    console.log(data["Message"]);
  });
}

export function joinServer(user_id) {
  console.log("***EMIT JOIN SERVER***");
  socket.emit("join_server", { user_id });
  console.log("***LISTENING FOR JOIN SERVER RESPONSE***");
  socket.on("join_server_response", (data) => {
    console.log(data["Message"]);
  });
}

export function chatUpdate(server_id, channel_id) {
  console.log("***EMIT CHAT UPDATE***");
  socket.emit("chat_update", { server_id, channel_id });
}

export function handleChatUpdates(callback) {
  console.log("***LISTENING FOR CHAT UPDATES***");
  socket.on("chat_update_response", (data) => {
    console.log("***CHAT UPDATES EVENT DATA***");
    console.log(data.channel_id);
    const channel_id = data.channel_id;
    callback(channel_id);
  });
}

export default socket;

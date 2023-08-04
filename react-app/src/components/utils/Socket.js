import { io } from "socket.io-client";

const socket = io();

export function joinServer(user_id) {
  console.log("***EMIT JOIN SERVER***");
  socket.emit("join_server", { user_id });
  socket.on("join_server_response", (data) => {
    console.log(data["Message"]);
  });
}

export function handleNewMessages(callback) {
  console.log("***LISTENING FOR NEW MESSAGE***");
  socket.on("new_message", (data) => {
    console.log("***NEW_MESSAGE EVENT DATA***");
    console.log(data.channel_id);
    console.log("***NEW_MESSAGE EVENT DATA***");
    const channel_id = data.channel_id;
    callback(channel_id);
  });
}

export default socket;

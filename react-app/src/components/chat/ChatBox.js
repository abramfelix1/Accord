import Chat from "./Chat";
import MessageContainer from "./MessageContainer";

function ChatBox() {
  return (
    <div
      style={{
        backgroundColor: "#323338",
        color: "white",
        height: "100vh",
        flex: "1 1 auto",
      }}
    >
      CHAT BOX
      <MessageContainer />
      <Chat />
    </div>
  );
}

export default ChatBox;

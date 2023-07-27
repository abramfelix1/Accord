function ChatInputField({ sendChat, chatInput, updateChatInput }) {
  return (
    <form onSubmit={sendChat}>
      <input value={chatInput} onChange={updateChatInput} />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInputField;

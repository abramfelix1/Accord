import { dateFormat } from "./ChatHelperFunctions";
import logo from "../../images/accord-logo.png";

function ChatFullStyle({ message }) {
    return (
        <div className="message-wrapper">
            {message.image_url !== null && message.image_url.length >= 1 ? (
                <img
                className="chatbox-image"
                src={message.image_url}
                alt="chatbox-user-img"
                />
            ) : (
            <div className="chatbox-logo-wrapper">
            <img className="chatbox-logo" src={logo} alt="logo" />
            </div>
            )}
            <div className="chat-box-name-date-message-wrapper">
                <div className="chat-box-name-date-wrapper">
                <span className="chat-box-name">
                    {message.display_name ? message.display_name : message.username}
                </span>
                <span className="chat-box-date">
                    {dateFormat(message.created_at)}
                </span>
                </div>
                <div className="chat-box-message">{message.message}</div>
            </div>
        </div>
    );
}

export default ChatFullStyle;
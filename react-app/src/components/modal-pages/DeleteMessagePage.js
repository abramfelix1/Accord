import React from "react";
import "./modal-css/DeleteMessagePage.css";

function DeleteMessagePage(mesasgeInfo) {
  return (
    <div className="delete-message-container">
      <div className="delete-message-header">
        <p>Delete Message</p>
      </div>
      <div className="delete-message-sub-header">
        <p>Are you sure you want to delete this message?</p>
      </div>
      <div className="delete-message-info">
        <p>Message info here</p>
      </div>
      <div className="delete-message-footer">
        <button>Delete</button>
        <p>Cancel</p>
      </div>
    </div>
  );
}

export default DeleteMessagePage;

import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useContext } from "react";
import { leaveServerThunk } from "../../store/members";
import { ModalContext } from "../../context/modalContext";

import "./modal-css/DeleteServerConfirmation.css";
import { deleteServerThunk } from "../../store/server";

function DeleteServerConfirmation({ setType }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverid } = useParams();
  const server = useSelector((state) => state.servers[serverid]);

  const { serverSettingModal } = useContext(ModalContext);

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const deleteServerHandleSubmit = async () => {
    if (name === server.name) {
      await dispatch(deleteServerThunk(server.id));
      setType(null);
      return history.push("/app");
    } else {
      setError(true);
    }
  };

  return server ? (
    <div className="leave-server-container">
      <div className="inner-delete-server">
        <div style={{ padding: "3px 10px 0px 15px" }}>
          <h1 style={{ color: "#F2F3F5", fontSize: "19px", textAlign: "left" }}>
            Delete '{server.name}'
          </h1>
        </div>
        <div style={{ padding: "10px 15px 0px 15px" }}>
          <div
            style={{
              backgroundColor: "#D79E2D",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <p
              style={{
                color: "#f2f3f5",
                fontSize: "16px",
                width: "390px",
                margin: "0px",
                lineHeight: "20px",
                fontWeight: "thin",
              }}
            >
              Are you sure you want to delete{" "}
              <span style={{ fontWeight: "900" }}>{server.name}</span>? This
              action cannot be undone.
            </p>
          </div>
        </div>
        {/* input section */}
        <div className="enter-server-name-wrapper">
          <p className="enter-server-name">ENTER SERVER NAME</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="enter-server-name-input"
          />
          {error && (
            <div className="server-delete-error">
              You didn't enter the server name correctly
            </div>
          )}
        </div>

        <div className="delete-server-cancel-submit">
          <div style={{ display: "flex", padding: "15px 15px 15px 20px" }}>
            <p
              className="cancel-leave-server"
              onClick={(e) => serverSettingModal()}
            >
              Cancel
            </p>
            <button
              className="leave-server-button"
              onClick={(e) => deleteServerHandleSubmit()}
            >
              Leave Server
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default DeleteServerConfirmation;

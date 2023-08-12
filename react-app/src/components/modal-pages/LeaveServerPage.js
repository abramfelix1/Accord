import { useSelector, useDispatch } from "react-redux";
import { InfoContext } from "../../context/infoContext";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { leaveServerThunk } from "../../store/members";
import { useHistory } from "react-router-dom";

import "./modal-css/LeaveServerPage.css";
import { useParams } from "react-router-dom";

function LeaveServerPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverid, channelid } = useParams();
  // const { server } = useContext(InfoContext);
  const server = useSelector((state) => state.servers[serverid]);
  const { setType } = useContext(ModalContext);

  const leaveServerHandleSubmit = async () => {
    await dispatch(leaveServerThunk(server.id));
    setType(null);
    return history.push("/app");
  };

  return server ? (
    <div className="leave-server-container">
      <div className="inner-leave-server">
        <div style={{ padding: "3px 10px 0px 15px" }}>
          <h1 style={{ color: "#F2F3F5", fontSize: "19px", textAlign: "left" }}>
            Leave '{server.name}'
          </h1>
        </div>
        <div style={{ padding: "10px 10px 0px 15px" }}>
          <p
            style={{
              color: "#DBDEE1",
              fontSize: "15px",
              width: "390px",
              margin: "0px",
              marginBottom: "25px",
              lineHeight: "20px",
            }}
          >
            Are you sure you want to leave{" "}
            <span style={{ fontWeight: "bold" }}>{server.name}</span>? You wont
            be able to rejoin this server unless you are re-invited.
          </p>
        </div>
        <div className="leave-server-cancel-submit">
          <div style={{ display: "flex", padding: "15px 15px 15px 20px" }}>
            <p className="cancel-leave-server" onClick={(e) => setType(null)}>
              Cancel
            </p>
            <button
              className="leave-server-button"
              onClick={(e) => leaveServerHandleSubmit()}
            >
              Leave Server
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>hi</div>
  );
}

export default LeaveServerPage;

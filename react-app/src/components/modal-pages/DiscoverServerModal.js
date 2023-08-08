import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";

import "./modal-css/DiscoverServer.css"


function DiscoverServerModal() {
    const dispatch = useDispatch()

    const servers = Object.values(useSelector(state => state.server))

    useEffect(() => {
        (async () => {
            await dispatch(serverActions.getAllServersThunk());
          })();
    }, [dispatch])

    console.log(servers, 'servers')
  return (
    <div className="discover-server">
        {
            servers.map((server) => {
                return (
                    <li className="discover-server-list">{server.name}</li>
                )
            })
        }
    </div>
  );
}

export default DiscoverServerModal;

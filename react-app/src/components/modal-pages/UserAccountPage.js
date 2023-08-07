import UserAccountFormPage from "./UserAccountFormPage";
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom"
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";

function UserAccountPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { setType } = useContext(ModalContext)
      // Handlers
  const logoutHandler = async () => {
    await dispatch(logout());
    setType(null)
    return history.push('/login')
  };

  return (
    <div className="user-main-container">
      <div className="user-inner-container">
        <div className="account-nav-container">
          <div>
            <div className="account-nav-user-setting">User Settings</div>
            <div className="my-account-nav">My Account</div>
            <div className="account-separator"></div>
          </div>
          <div>
          <div className="account-separator"></div>
            <p className="account-logout" onClick={e => logoutHandler()}>Logout <span><RiLogoutBoxRFill style={{marginTop: '5px'}}/></span></p>
          </div>
        </div>
        <UserAccountFormPage />
      </div>
    </div>
  );
}

export default UserAccountPage;

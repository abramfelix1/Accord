import './UserNav.css'


function UserNav() {
  return (
    <div className="usermenu-container">
      <div className="usermenu">
        <div className="usermenu-pfp"></div>
        <div>
            <div style={{color: '#F2F3EA', fontSize: '14px'}}>
                username
            </div>
            <div style={{color: '#ADADAD', fontSize: '12px'}}>
                status
            </div>
        </div>
        </div>
    </div>
  );
}

export default UserNav;

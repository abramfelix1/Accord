import { Link } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import {RiHashtag} from 'react-icons/ri'
import {FaHashtag} from 'react-icons/fa'
import {BiPlus} from 'react-icons/bi'
import './channel-css/Channel.css'


function Channel() {



  return (
    <div className="channel-container">
      <div>
        <ul className="channel-list">
          <li className="channel-list-title-container">
            <div style={{ display: "flex", alignItems: 'center' }}>
              <IoIosArrowDown className='.text-channel-drop-down-icon'/>
              <p className='channel-list-title'>Text Channels</p>
            </div>
            <BiPlus className='text-channel-add-icon'/>
          </li>
          <li>
            <div>
              <Link className="channel-flex" to="/app">
                <FaHashtag/>
                <div>general</div>
              </Link>
              {

              }

            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Channel;

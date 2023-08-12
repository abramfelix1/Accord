import "./instruction-css/Instruction.css";
import { ModalContext } from "../../context/modalContext";
import { useContext } from "react";
import { MdGroups, MdKeyboardArrowRight } from "react-icons/md";
import { BsGlobe } from 'react-icons/bs'



function Instructions() {
  const { setType, createServerModal, discoverServerModal} =
    useContext(ModalContext);

  return (
    <div className="instructions-container">
      <h1>Welcome to Accord!</h1>
      <h3>Here are some steps to help you get started!</h3>
      <div
        onClick={(e) => {
          discoverServerModal();
        }}
        className="discover-server-instruction"
      >
        <div className="instruction-button">
          <BsGlobe className="instructions-icon" />
          <div>
            <p>Discover Communities</p>
            <MdKeyboardArrowRight style={{height: '30px', width: '30px',color: '#b5bac1'}}/>
          </div>
        </div>
      </div>
      <div
        onClick={(e) => {
          createServerModal();
        }}
        className="discover-server-instruction"
      >
        <div className="instruction-button">
          <MdGroups className="instructions-icon" />
          <div>
            <p>Create a Server</p>
            <MdKeyboardArrowRight style={{height: '30px', width: '30px', color: '#b5bac1'}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructions;

import "./instruction-css/Instruction.css";
import { ModalContext } from "../../context/modalContext";
import { useContext } from "react";


function Instructions() {
    const { setType, createServerModal, discoverServerModal } = useContext(ModalContext);

    return (
        <div className="instructions-container">
        <h1>Welcome to Accord</h1>
        <h3>Here are some ways to get started!</h3>
        <button             
            onClick={(e) => {
            discoverServerModal();
            }}>Join Server</button>
        <button
            onClick={(e) => {
            createServerModal();
            }}
        >
            Create Server
        </button>
        </div>
    );
}

export default Instructions;

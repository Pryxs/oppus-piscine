const Modal = (props) =>{
    if(!props.modalIsOpen){
        return null;
    }

    return(
        <div className="modal">
            <button onClick={() => props.setModalIsOpen(false)}>x</button>
            {props.children}
        </div>
    )
}

export default Modal;
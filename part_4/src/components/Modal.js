import styled from '@emotion/styled'

const Div = styled.div`
height: 100vh;
width: 100vw;
background-color: rgba(170,170,170,0.6);
position: fixed;
top: 0;
left: 0;

.modal{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    background-color: ${props => props.theme.secondary};
    padding: 1rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 200px;

    button{
        width: fit-content;
        align-self: end;
        cursor: pointer;
    }
}
`

const Modal = (props) =>{
    if(!props.modalIsOpen){
        return null;
    }

    return(
        <Div className="modal-container">
            <div className="modal"> 
                <button onClick={() => props.setModalIsOpen(false)}>x</button>
                {props.children}
            </div>
        </Div>
    )
}

export default Modal;
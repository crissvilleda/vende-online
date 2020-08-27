import React, { Component } from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "70%",
    },
};

Modal.setAppElement("#app-container");

class ReactModal extends Component {
    state = {
        modalIsOpen: false,
    };

    subtitle = React.createRef();

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    afterOpenModal = () => {
        this.subtitle.current.style.color = "#f00";
    };

    render() {
        const { showModal, titulo } = this.props;
        return (
            <div>
                <Modal
                    isOpen={showModal}
                    /* isOpen={showModal} */
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    /* shouldCloseOnOverlayClick={false} */
                >
                    <h3
                        //ref={_subtitle => (subtitle = _subtitle)}
                        ref={this.subtitle}
                    >
                        {titulo}
                    </h3>
                    {this.props.children}
                </Modal>
            </div>
        );
    }
}

export default ReactModal;

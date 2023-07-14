import React from "react";
import Modal from "react-modal";
import "./NavModal.css";

const overlayStyle = {
    zIndex: 4,
}

const contentStyle = {
    zIndex: 4,
    padding: "4.5rem 2.5rem 1.5rem 2.5rem",
    margin: "0 auto",
    width: "40rem",
    maxWidth: "100%",
    backgroundColor: "rgba(27, 31, 34, 0.85)",
    borderRadius: "4px",
}

const NavModal = ({ children, opened } : { children: React.ReactNode, opened: boolean })=> (
    <Modal
        isOpen={opened}
        style={{
            overlay: overlayStyle,
            content: contentStyle
        }}
    >
        <>
            {children}
        </>
    </Modal>
);

export default NavModal;
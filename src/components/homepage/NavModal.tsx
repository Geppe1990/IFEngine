import React from "react";
import Modal from "react-modal";
import "./NavModal.css";
const NavModal = ({ children, opened } : { children: React.ReactNode, opened: boolean })=> (
    <Modal isOpen={opened}>{children}</Modal>
);

export default NavModal;
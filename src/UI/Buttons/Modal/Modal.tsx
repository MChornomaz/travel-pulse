import React from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.scss';

type BackdropProps = {
    onClick: () => void;
};

type ModalOverlayProps = {
    children: React.ReactElement;
};

type ModalProps = {
    onClick: () => void;
    children: React.ReactElement;
    onClose: () => void;
};

const Backdrop = (props: BackdropProps) => {
    return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
    return (
        <div className={styles.modal}>
            <>{props.children}</>
        </div>
    );
};

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal: React.FC<ModalProps> = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default Modal;

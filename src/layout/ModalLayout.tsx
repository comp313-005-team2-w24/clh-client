import { useEffect } from "react";
import styled from "styled-components";
type ModalLayoutProps = {
    open: boolean;
    closeModal: () => void;
    children: React.ReactNode;
};
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: rgb(0, 0, 0, 50%);
`;
const ModalLayout = ({ open, closeModal, children }: ModalLayoutProps) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [open]);
    return (
        <>
            {open && (
                <ModalContainer
                    id="modal"
                    onClick={(e) => {
                        const modal = e.target as HTMLDivElement;
                        if (modal.id === "modal") {
                            closeModal();
                        }
                    }}
                >
                    {children}
                </ModalContainer>
            )}
        </>
    );
};

export default ModalLayout;

import {Toast, ToastContainer} from "react-bootstrap";

function ShowToast({ toast, setToast}) {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                onClose={() => setToast({ ...toast, show: false })}
                show={toast.show}
                delay={3000}
                autohide
                bg={toast.variant}
            >
                <Toast.Body className="text-white">{toast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ShowToast;
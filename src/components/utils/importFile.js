import Swal from "sweetalert2";
import {decryptString} from "./crypto.js";

export const handleImportFile = (event, dispatchCallBack, setToast) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const fileText = e.target.result;
        let success = false;
        try {
            const wrapper = JSON.parse(fileText);
            let dataToDispatch;

            if (wrapper.isEncrypted) {
                const {value: password } = await Swal.fire({
                    title: 'Insert the file password',
                    input: 'password',
                    inputPlaceholder: 'password123',
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Submit',
                    showLoaderOnConfirm: true,
                    inputValidator: (value) => {
                        if (!value) return 'It can not be empty';
                    },
                });

                if (password) {
                    try {
                        const decryptedText = decryptString(wrapper.content, password);
                        dataToDispatch = JSON.parse(decryptedText);
                    } catch (err) {
                        await Swal.fire('Error', 'Invalid password.', 'error');
                        return;
                    }
                }
            } else {
                dataToDispatch = JSON.parse(wrapper.content);
            }

            if (dataToDispatch) {
                success = dispatchCallBack(file, dataToDispatch);
            }

        } catch (err) {
            try {
                const oldFormatData = JSON.parse(fileText);
                success = dispatchCallBack(file, oldFormatData);
            } catch (err2) {
                console.error("Error importing the file", err);
                setToast({
                    show: true,
                    message: "File is corrupted or not a valid JSON.",
                    variant: 'danger'
                })
            }

        }
        if (success) {
            setToast({
                show: true,
                message: `File imported ✅`,
                variant: "success",
            });
        } else {
            setToast({
                show: true,
                message: `An error occurred while importing the file`,
                variant: "danger",
            });
        }
    };
    reader.readAsText(file);
    event.target.value = null;
};
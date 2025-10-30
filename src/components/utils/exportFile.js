import Swal from "sweetalert2";
import {encryptString} from "./crypto.js";

const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const handleRequestExport = async(fileName, blocks) => {
    const {value: password } = await Swal.fire({
        title: '¿Do you want to protect the file(s) with a password ?',
        text: "¡Increase the security of your files!",
        input: 'password',
        inputPlaceholder: 'password123',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
            if (!value) return 'It can not be empty';
        },
    });
    const jsonString = JSON.stringify(blocks);
    let jsonData;
    if (password) {
        jsonData = {
            isEncrypted: true,
            content: encryptString(jsonString, password)
        }
    } else {
        jsonData = {
            isEncrypted: false,
            content: jsonString
        }
    }
    const finalJsonData = JSON.stringify(jsonData, null, 2);
    downloadFile(fileName, finalJsonData);
}
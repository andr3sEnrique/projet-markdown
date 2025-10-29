import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { addImage } from '../../features/imagesSlice';

function ImageUploader() {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files) return;

        Array.from(files).forEach(file => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64 = event.target.result;
                const name = file.name;
                dispatch(addImage({ name, base64 }));
            };

            reader.readAsDataURL(file);
        });

        e.target.value = null;
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="p-3 mb-3" style={{ border: '2px dashed #ccc', borderRadius: '5px' }}>
            <Button onClick={handleClick}>
                Import Images (Click)
            </Button>
            <Form.Control
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            >
            </Form.Control>
            <p className="mt-2 text-muted">
                The images will be converted to Base64 and saved in the browser.
            </p>
        </div>
    );
}

export default ImageUploader;
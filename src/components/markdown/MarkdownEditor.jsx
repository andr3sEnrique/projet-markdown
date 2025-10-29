import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { updateFileContent } from '../../features/filesSlice.js';

function MarkdownEditor() {
    const { tree, currentFileId } = useSelector((state) => state.files);
    const dispatch = useDispatch();
    const currentFile = tree[currentFileId];

    const handleChange = (e) => {
        const newContent = e.target.value;
        dispatch(updateFileContent({ content: newContent }));
    };

    return (
        <Form.Control
            as="textarea"
            value={currentFile ? currentFile.content : 'Select file...'}
            onChange={handleChange}
            disabled={!currentFile || currentFile.isFolder}
            style={{ height: 'calc(100% - 40px)', resize: 'none' }}
        />
    );
}

export default MarkdownEditor;
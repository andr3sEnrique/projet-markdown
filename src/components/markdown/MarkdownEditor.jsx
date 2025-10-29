import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { updateFileContent } from '../../features/filesSlice.js';
import { useEffect, useRef } from 'react';

function MarkdownEditor({ onInsertImage }) {
    const { tree, currentFileId } = useSelector((state) => state.files);
    const dispatch = useDispatch();
    const currentFile = tree[currentFileId];
    const textareaRef = useRef(null);

    const insertImageText = (markdownSyntax) => {
        if (!currentFile) return;

        const textArea = textareaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;

        const newContent = currentFile.content.substring(0, start) + markdownSyntax + currentFile.content.substring(end);

        dispatch(updateFileContent({ content: newContent }));

        setTimeout(() => {
            textArea.focus();
            textArea.selectionStart = textArea.selectionEnd = start + markdownSyntax.length;
        }, 0);
    };

    useEffect(() => {
        if (onInsertImage) {
            onInsertImage.current = insertImageText;
        }
    }, [onInsertImage, insertImageText]);

    const handleChange = (e) => {
        const newContent = e.target.value;
        dispatch(updateFileContent({ content: newContent }));
    };

    return (
        <Form.Control
            as="textarea"
            ref={textareaRef}
            value={currentFile ? currentFile.content : 'Select file...'}
            onChange={handleChange}
            disabled={!currentFile || currentFile.isFolder}
            style={{ height: 'calc(100% - 40px)', resize: 'none' }}
        />
    );
}

export default MarkdownEditor;
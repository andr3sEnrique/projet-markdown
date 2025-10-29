import { useSelector } from 'react-redux';
import { marked } from 'marked';
import {resolveImageRefs} from "../utils/imageResolver.js";
import './MarkdownPreview.css';

function MarkdownPreview() {
    const { tree, currentFileId } = useSelector((state) => state.files);
    const images = useSelector((state) => state.images.items);
    const currentFile = tree[currentFileId];

    let htmlContent = '';
    if (currentFile) {
        const resolvedContent = resolveImageRefs(currentFile.content, images);
        htmlContent = marked(resolvedContent);
    }

    return (
        <div
            className="p-2 markdown-preview-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}

export default MarkdownPreview;
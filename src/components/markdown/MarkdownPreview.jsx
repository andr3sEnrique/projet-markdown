import { useSelector } from 'react-redux';
import { marked } from 'marked';

function MarkdownPreview() {
    const { tree, currentFileId } = useSelector((state) => state.files);
    const currentFile = tree[currentFileId];

    let htmlContent = '';
    if (currentFile) {
        htmlContent = marked(currentFile.content);
    }

    return (
        <div
            className="p-2"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}

export default MarkdownPreview;
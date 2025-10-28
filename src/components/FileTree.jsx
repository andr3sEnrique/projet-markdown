import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { setCurrentFile } from '../features/filesSlice';

function FileTree() {
    const { tree, currentFileId } = useSelector((state) => state.files);
    const dispatch = useDispatch();

    const root = tree.root;
    const rootChildren = root.children.map(id => tree[id]);

    const handleFileClick = (fileId) => {
        dispatch(setCurrentFile(fileId));
    };

    return (
        <ListGroup>
            {rootChildren.map((file) => (
                <ListGroup.Item
                    key={file.id}
                    action
                    active={file.id === currentFileId}
                    onClick={() => handleFileClick(file.id)}
                    style={{ cursor: 'pointer' }}
                >
                    {file.isFolder ? '📁' : '📄'} {file.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default FileTree;
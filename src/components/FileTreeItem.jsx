import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button, Form, InputGroup, Collapse } from 'react-bootstrap';
import { setCurrentFile, deleteEntry, renameEntry } from '../features/filesSlice';

function FileTreeItem({ entryId, selectedId, setSelectedId }) {
    const dispatch = useDispatch();
    const { tree, currentFileId } = useSelector((state) => state.files);
    const entry = tree[entryId];

    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(entry.name);

    const [isOpen, setIsOpen] = useState(true);

    if (!entry) return null;

    const handleSelect = () => {
        setSelectedId(entry.id);
        if (entry.isFolder) {
            setIsOpen(!isOpen);
        } else {
            dispatch(setCurrentFile(entry.id));
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`¿Are you sure you want to delete "${entry.name}"?`)) {
            dispatch(deleteEntry({ entryId: entry.id }));
        }
    };

    const handleRename = (e) => {
        e.stopPropagation();
        if (isRenaming) {
            dispatch(renameEntry({ entryId: entry.id, newName: newName }));
            setIsRenaming(false);
        } else {
            setIsRenaming(true);
        }
    };

    const handleRenameChange = (e) => {
        setNewName(e.target.value);
    };

    return (
        <div className='d-flex flex-column'>
            <ListGroup.Item

                active={entry.id === currentFileId}
                onClick={handleSelect}
                style={{
                    cursor: 'pointer',
                    backgroundColor: entry.id === selectedId ? '#e7f1ff' : 'transparent'
                }}
                className="d-flex justify-content-between align-items-center"
            >
                {isRenaming ? (
                    <InputGroup size="sm" onClick={(e) => e.stopPropagation()}>
                        <Form.Control
                            value={newName}
                            onChange={handleRenameChange}
                            autoFocus
                        />
                        <Button variant="success" onClick={handleRename}>✓</Button>
                    </InputGroup>
                ) : (
                    <>
                        <span>
                          {entry.isFolder ? (isOpen ? '📂' : '📁') : '📄'} {entry.name}
                        </span>
                        {entry.id !== 'root' && (
                            <div onClick={(e) => e.stopPropagation()}>
                                <Button variant="outline-primary" className="ms-1" size="sm" onClick={handleRename}>✏️</Button>{' '}
                                <Button variant="outline-danger" size="sm" onClick={handleDelete}>🗑️</Button>
                            </div>
                        )}
                    </>
                            )}
            </ListGroup.Item>

            <Collapse in={isOpen}>
                <div style={{ paddingLeft: '20px' }}>
                    {entry.isFolder &&
                        entry.children.map((childId) => (
                            <FileTreeItem
                                key={childId}
                                entryId={childId}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                            />
                        ))}
                </div>
            </Collapse>
        </div>
    );
}

export default FileTreeItem;
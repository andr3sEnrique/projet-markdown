import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, Form, InputGroup, Collapse } from "react-bootstrap";
import { setCurrentFile, deleteEntry, renameEntry } from "../../features/filesSlice.js";
import { useDnd } from "./hooks/dndHook.js";
import Swal from "sweetalert2";

function FileTreeItem({ entryId, selectedId, setSelectedId }) {
  const dispatch = useDispatch();
  const { tree, currentFileId } = useSelector((state) => state.files);
  const entry = tree[entryId];

  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(entry.name);

  const [isOpen, setIsOpen] = useState(true);
  const { setNodeRef, transform, isDragging, isOver, attributes, listeners } = useDnd({ entry });

  if (!entry) return null;

  const handleSelect = () => {
    setSelectedId(entry.id);
    if (entry.isFolder) {
      setIsOpen(!isOpen);
    } else {
      dispatch(setCurrentFile(entry.id));
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: `Are you sure you want to delete "${entry.name}"?`,
      text: "You cannot undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
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

  const dndStyles = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isOver ? "#d0e3ff" : entry.id === selectedId ? "#e7f1ff" : "transparent",
    cursor: "pointer",
  };

  return (
    <div className="d-flex flex-column">
      <ListGroup.Item ref={setNodeRef} active={entry.id === currentFileId} onClick={handleSelect} style={dndStyles} {...attributes} {...listeners} className="d-flex justify-content-between align-items-center">
        {isRenaming ? (
          <InputGroup size="sm" onClick={(e) => e.stopPropagation()} {...listeners} {...attributes}>
            <Form.Control value={newName} onChange={handleRenameChange} autoFocus />
            <Button variant="success" onClick={handleRename}>
              ✓
            </Button>
          </InputGroup>
        ) : (
          <>
            <span>
              {entry.isFolder ? (isOpen ? "📂" : "📁") : "📄"} {entry.name}
            </span>
            {entry.id !== "root" && (
              <div onClick={(e) => e.stopPropagation()}>
                <Button variant="outline-primary" className="ms-1" size="sm" onClick={handleRename}>
                  ✏️
                </Button>{" "}
                <Button variant="outline-danger" size="sm" onClick={async (e) => handleDelete(e)}>
                  🗑️
                </Button>
              </div>
            )}
          </>
        )}
      </ListGroup.Item>

      <Collapse in={isOpen}>
        <div style={{ paddingLeft: "20px" }}>{entry.isFolder && entry.children.map((childId) => <FileTreeItem key={childId} entryId={childId} selectedId={selectedId} setSelectedId={setSelectedId} />)}</div>
      </Collapse>
    </div>
  );
}

export default FileTreeItem;

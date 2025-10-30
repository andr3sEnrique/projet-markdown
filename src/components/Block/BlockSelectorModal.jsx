import { useSelector } from "react-redux";
import { Modal, Button, ListGroup } from "react-bootstrap";

function BlockSelectorModal({ show, onHide, onInsert }) {
  const blocks = useSelector((state) => state.blocks.items);
  const blockList = Object.values(blocks);

  const handleBlockClick = (block) => {
    onInsert(block.content);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Custom Block</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <ListGroup>
          {blockList.length > 0 ? (
            blockList.map((block) => (
              <ListGroup.Item action key={block.id} onClick={() => handleBlockClick(block)}>
                <div className="d-flex justify-content-between">
                  <strong>{block.name}</strong>
                  {block.shortcut && <small>Shortcut: {block.shortcut}</small>}
                </div>
                <pre style={{ fontSize: "0.8rem", maxHeight: "50px", overflow: "hidden", marginBottom: 0 }}>{block.content}</pre>
              </ListGroup.Item>
            ))
          ) : (
            <p>There are no custom blocks. Go to the “Blocks” tab to add them.</p>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlockSelectorModal;

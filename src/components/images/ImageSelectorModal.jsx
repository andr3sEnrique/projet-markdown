import { useSelector } from "react-redux";
import { Modal, Row, Col, Card, Button } from "react-bootstrap";
import { selectCurrentProfil } from "../../features/profilsSlice";
import { useMemo } from "react";

function ImageSelectorModal({ show, onHide, onInsert }) {
  const images = useSelector((state) => state.images.items);
  const activeProfil = useSelector(selectCurrentProfil);
  const imageList = useMemo(() => {
    const allImages = Object.values(images || {});
    if (activeProfil) {
      return allImages.filter((image) => image.linkedProfil === activeProfil.id);
    }
    return allImages.filter((image) => !image.linkedProfil);
  });
  const handleImageClick = (img) => {
    const markdownSyntax = `![${img.name}](@img/${img.id})`;
    onInsert(markdownSyntax);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Image</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Row>
          {imageList.length > 0 ? (
            imageList.map((img) => (
              <Col md={4} key={img.id} className="mb-3">
                <Card onClick={() => handleImageClick(img)} style={{ cursor: "pointer" }} className="h-100">
                  <Card.Img variant="top" src={img.base64} style={{ height: "150px", objectFit: "cover" }} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>There are no images in the library. Go to the “Images” tab to add some.</p>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageSelectorModal;

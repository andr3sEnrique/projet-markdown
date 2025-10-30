import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ImageUploader from "../images/ImageUploader";
import { deleteImage, renameImage } from "../../features/imagesSlice";
import Swal from "sweetalert2";
import { handleExportAll, handleExportOne } from "../utils/exportFile.js";

function ImageLibraryPage() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.items);
  const imageList = Object.values(images);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this image?",
      text: "You cannot undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      dispatch(deleteImage({ id }));
    }
  };

  const handleRename = async (id, oldName) => {
    const { value: newName } = await Swal.fire({
      title: `New name for the image`,
      input: "text",
      inputPlaceholder: "cat.jpg",
      inputValue: oldName,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Rename",
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) return "It can not be empty";
      },
    });
    if (newName && newName !== oldName) {
      dispatch(renameImage({ id, newName }));
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3" style={{ whiteSpace: "nowrap" }}>
        <h2>Image Library</h2>
        <Button variant="outline-primary" size="lg" onClick={() => handleExportAll(images)}>
          Export All
        </Button>
      </div>
      <ImageUploader />

      <hr />

      <h4>Saved Images</h4>
      <Row>
        {imageList.length > 0 ? (
          imageList.map((img) => (
            <Col md={4} key={img.id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={img.base64} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.name}</Card.Title>
                  <Button variant="primary" size="sm" className="me-1" onClick={async () => await handleRename(img.id, img.name)}>
                    Rename
                  </Button>
                  <Button variant="danger" size="sm" className="me-1" onClick={async () => await handleDelete(img.id)}>
                    Delete
                  </Button>
                  <Button variant="info" size="sm" onClick={() => handleExportOne(img)}>
                    Export
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>There are no images in the library</p>
        )}
      </Row>
    </Container>
  );
}

export default ImageLibraryPage;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card, ListGroup } from "react-bootstrap";
import { addProfil, deleteProfil, setActiveProfil, selectCurrentProfil, selectAllProfils } from "../../features/profilsSlice.js";
import Swal from "sweetalert2";
import ShowToast from "../utils/ShowToast.jsx";

function ProfilPage() {
  const dispatch = useDispatch();
  const profilList = useSelector(selectAllProfils);
  const activeProfil = useSelector(selectCurrentProfil);
  const [name, setName] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name is required. Please fill it and try again",
      });
      return;
    }
    dispatch(addProfil({ name }));

    setToast({
      show: true,
      message: "Profil created ✅",
      variant: "succes",
    });

    handleClear();
  };

  const handleClear = () => {
    setName("");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this profil ?",
      text: "You cannont undo this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      dispatch(deleteProfil({ id }));
      setToast({
        show: true,
        message: "Profil deleted ✅",
        variant: "succes",
      });
    }
  };

  const handleActiveProfil = (id) => {
    dispatch(setActiveProfil({ id }));
    setToast({ show: true, message: "Profil activated ✅", variant: "success" });
  };

  const handleDesactivateProfil = () => {
    dispatch(setActiveProfil({}));
    setToast({ show: true, message: "Profil desactivated ✅", variant: "success" });
  };

  const isCurrentProfil = (id) => dispatch(isCurrentProfil);

  return (
    <div>
      <Container className="mt-4">
        <Row>
          <Col md={5}>
            <Card>
              <Card.Header>
                <h4>Create new Profil</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Profil name</Form.Label>
                    <Form.Control type="text" placeholder="Ex: work" value={name} onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save Profil
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            <h4>Existing Profils</h4>
            <ListGroup>
              {profilList.length > 0 ? (
                profilList.map((profil) => (
                  <ListGroup.Item key={profil.id}>
                    <h5>{profil.name}</h5>
                    {activeProfil && profil.id === activeProfil.id ? (
                      <Button variant="outline-danger" className="me-1" size="sm" onClick={() => handleDesactivateProfil()}>
                        Desactivate
                      </Button>
                    ) : (
                      <Button variant="outline-info" className="me-1" size="sm" onClick={() => handleActiveProfil(profil.id)}>
                        Activate
                      </Button>
                    )}
                    <Button variant="outline-danger" className="me-1" size="sm" onClick={async () => await handleDelete(profil.id)}>
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <p>There are no existing profils.</p>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <ShowToast setToast={setToast} toast={toast} />
    </div>
  );
}

export default ProfilPage;

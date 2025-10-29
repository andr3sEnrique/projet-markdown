// src/pages/BlockLibraryPage.jsx

import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card, ListGroup, ButtonGroup } from "react-bootstrap";
import { addBlock, updateBlock, deleteBlock, importBlocks } from "../../features/blocksSlice";

const downloadJson = (filename, jsonData) => {
  const content = JSON.stringify(jsonData, null, 2); // Formatea el JSON
  const element = document.createElement("a");
  const file = new Blob([content], { type: "application/json" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

function BlockLibraryPage() {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.blocks.items);
  const blockList = Object.values(blocks);
  const fileInputRef = useRef(null); // Ref para el input de importación

  // Estados del formulario
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [shortcut, setShortcut] = useState("");
  const [editingId, setEditingId] = useState(null); // ID del bloque que estamos editando

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !content) {
      alert("El nombre y el contenido son obligatorios.");
      return;
    }

    if (editingId) {
      // Estamos actualizando un bloque existente
      dispatch(updateBlock({ id: editingId, name, content, shortcut }));
    } else {
      // Estamos creando un nuevo bloque
      dispatch(addBlock({ name, content, shortcut }));
    }

    // Limpiar formulario
    handleClear();
  };

  // Cargar un bloque en el formulario para editarlo
  const handleEdit = (block) => {
    setEditingId(block.id);
    setName(block.name);
    setContent(block.content);
    setShortcut(block.shortcut);
  };

  // Limpiar el formulario y salir del modo edición
  const handleClear = () => {
    setEditingId(null);
    setName("");
    setContent("");
    setShortcut("");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que quieres borrar este bloque?")) {
      dispatch(deleteBlock({ id }));
      if (id === editingId) {
        handleClear(); // Si estábamos editando el bloque borrado
      }
    }
  };

  const handleShortcutKeyDown = (event) => {
    // 1. Prevenir que el navegador ejecute el atajo (ej. 'Ctrl+S' de guardar)
    event.preventDefault();

    // 2. Construir la cadena del atajo
    let shortcutString = "";

    if (event.ctrlKey) shortcutString += "Ctrl+";
    if (event.altKey) shortcutString += "Alt+";
    if (event.shiftKey) shortcutString += "Shift+";
    if (event.metaKey) shortcutString += "Meta+"; // Para la tecla Cmd en Mac

    // 3. Añadir la tecla principal (ej. 'B', '1', 'S')
    // Nos aseguramos de no añadir las teclas modificadoras como la tecla principal
    const key = event.key.toLowerCase();
    if (key !== "control" && key !== "alt" && key !== "shift" && key !== "meta") {
      // Usamos event.code para obtener 'KeyB' en lugar de 'b' o 'shift+b'
      // O usamos event.key para algo simple. Usemos event.key por ahora.
      shortcutString += event.key.toUpperCase();
    }

    // 4. Actualizar el estado
    setShortcut(shortcutString);
  };

  const handleExportAll = () => {
    downloadJson("todos-los-bloques.parts.mdlc", blocks); // Exporta el objeto 'items'
  };

  const handleExportOne = (block) => {
    downloadJson(`${block.name}.part.mdlc`, block); // Exporta solo el objeto de bloque
  };

  // --- LÓGICA DE IMPORTACIÓN ---
  const handleImportClick = () => {
    fileInputRef.current.click(); // Dispara el input oculto
  };

  const handleImportFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (file.name.endsWith(".parts.mdlc")) {
          // Es una lista (nuestro formato 'items')
          // Usamos 'importBlocks' para fusionar
          dispatch(importBlocks(data));
        } else if (file.name.endsWith(".part.mdlc")) {
          // Es un solo bloque
          // Usamos 'addBlock' (creará uno nuevo con nuevo ID)
          dispatch(
            addBlock({
              name: data.name || "Importado",
              content: data.content || "",
              shortcut: data.shortcut || "",
            })
          );
        } else {
          alert("Formato de archivo no reconocido. Use .part.mdlc o .parts.mdlc");
        }
      } catch (err) {
        console.error("Error al importar el archivo", err);
        alert("El archivo está corrupto o no es un JSON válido.");
      }
    };
    reader.readAsText(file);
    event.target.value = null; // Limpiar el input
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Columna 1: Formulario de Creación/Edición */}
        <Col md={5}>
          <Card>
            <Card.Header>
              <h4>{editingId ? "Editar Bloque" : "Crear Nuevo Bloque"}</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Bloque</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Alerta Info" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contenido (HTML/Markdown)</Form.Label>
                  <Form.Control as="textarea" rows={6} placeholder="<div class='alert alert-info'>...</div>" value={content} onChange={(e) => setContent(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Atajo de Teclado</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Ctrl+1" value={shortcut} onChange={(e) => setShortcut(e.target.value)} onKeyDown={handleShortcutKeyDown} />
                  <Form.Text>Define un atajo (ej: Ctrl+1, Alt+B). Aún no se valida.</Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  {editingId ? "Actualizar Bloque" : "Guardar Bloque"}
                </Button>
                {editingId && (
                  <Button variant="secondary" onClick={handleClear} className="ms-2">
                    Cancelar Edición
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna 2: Lista de Bloques */}
        <Col md={7}>
          <h4>Bloques Guardados</h4>
          <ButtonGroup>
            <Button variant="success" size="sm" onClick={handleImportClick}>
              Importar
            </Button>
            <Button variant="primary" size="sm" onClick={handleExportAll}>
              Exportar Todo
            </Button>
          </ButtonGroup>
          {/* Input oculto */}
          <input type="file" ref={fileInputRef} onChange={handleImportFile} accept=".mdlc" style={{ display: "none" }} />
          <ListGroup>
            {blockList.length > 0 ? (
              blockList.map((block) => (
                <ListGroup.Item key={block.id}>
                  <h5>{block.name}</h5>
                  <pre style={{ fontSize: "0.8rem", maxHeight: "50px", overflow: "hidden" }}>{block.content}</pre>
                  <p className="mb-1">
                    <strong>Atajo:</strong> {block.shortcut || "Ninguno"}
                  </p>
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(block)}>
                    Editar
                  </Button>{" "}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(block.id)}>
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <p>No hay bloques personalizados.</p>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default BlockLibraryPage;

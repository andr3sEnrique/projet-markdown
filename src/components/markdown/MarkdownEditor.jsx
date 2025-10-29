import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { updateFileContent } from "../../features/filesSlice.js";
import { useEffect, useRef } from "react";

const isShortcutMatch = (shortcut, event) => {
  if (!shortcut || !event) return false;
  const parts = shortcut
    .toLowerCase()
    .split("+")
    .map((p) => p.trim());

  const key = parts.pop();
  if (event.key.toLowerCase() !== key) {
    return false;
  }

  const modifiers = {
    ctrl: parts.includes("ctrl") || parts.includes("meta"),
    alt: parts.includes("alt"),
    shift: parts.includes("shift"),
  };

  if (event.ctrlKey !== modifiers.ctrl && event.metaKey !== modifiers.ctrl) {
    return false;
  }
  if (event.altKey !== modifiers.alt) {
    return false;
  }
  if (event.shiftKey !== modifiers.shift) {
    return false;
  }
  return true;
};

function MarkdownEditor({ onInsertText }) {
  const { tree, currentFileId } = useSelector((state) => state.files);
  const blocks = useSelector((state) => state.blocks.items);
  const dispatch = useDispatch();
  const currentFile = tree[currentFileId];
  const textareaRef = useRef(null);

  const insertText = (markdownSyntax) => {
    if (!currentFile) return;

    const textArea = textareaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const newContent = currentFile.content.substring(0, start) + markdownSyntax + currentFile.content.substring(end);

    dispatch(updateFileContent({ content: newContent }));

    setTimeout(() => {
      textArea.focus();
      textArea.selectionStart = textArea.selectionEnd = start + markdownSyntax.length;
    }, 0);
  };

  useEffect(() => {
    if (onInsertText) {
      onInsertText.current = insertText;
    }
  }, [onInsertText, insertText]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    dispatch(updateFileContent({ content: newContent }));
  };

  const handleKeyDown = (event) => {
    console.log(blocks);
    // Itera sobre todos los bloques
    for (const block of Object.values(blocks)) {
      if (isShortcutMatch(block.shortcut, event)) {
        console.log("match");
        // ¡Coincidencia!
        event.preventDefault(); // Evita la acción del navegador
        insertText(block.content); // Inserta el contenido
        return;
      }
    }
  };

  return <Form.Control as="textarea" ref={textareaRef} value={currentFile ? currentFile.content : "Select file..."} onChange={handleChange} disabled={!currentFile || currentFile.isFolder} style={{ height: "calc(100% - 40px)", resize: "none" }} onKeyDown={handleKeyDown} />;
}

export default MarkdownEditor;

import { useSelector, useDispatch } from 'react-redux';
import {Button, ButtonGroup} from 'react-bootstrap';
import {createEntry} from '../features/filesSlice';
import FileTreeItem from './FileTreeItem';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2'

function FileTree() {
    const tree = useSelector((state) => state.files.tree);
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState('root');
    const fileInputRef = useRef(null);

    const handleCreate = async(isFolder) => {
        const parentId = getParentId(selectedId);

        const defaultName = isFolder ? "New folder" : "new.md";
        const {value: name } = await Swal.fire({
            title: `Name of the ${isFolder ? 'folder' : 'file'}:`,
            input: 'text',
            inputPlaceholder: 'ReadMe.md',
            inputValue: defaultName,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
                if (!value) return 'It can not be empty';
            },
        });
        console.log(name);


        if (name) {
            dispatch(createEntry({ name, isFolder, parentId }));
        }
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const getParentId = (selectedId) => {
        const selectedEntry = tree[selectedId];
        let parentId = 'root';
        if (selectedEntry) {
            if (selectedEntry.isFolder) {
                parentId = selectedEntry.id;
            } else {
                const parent = Object.values(tree).find(
                    (e) => e.isFolder && e.children.includes(selectedEntry.id)
                );
                if (parent) {
                    parentId = parent.id;
                }
            }
        }
        return parentId;
    }

    const handleFileImport = (e) => {
        const file = e.target.files[0];

        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const name = file.name;

            const parentId = getParentId(selectedId);

            dispatch(createEntry({ name, isFolder: false, parentId, content }));
        };
        reader.readAsText(file);

        e.target.value = null;
    }

    return (
        <div>
            <ButtonGroup size="sm" className="w-100 mb-2">
                <Button className="me-1" onClick={async() => await handleCreate(false)}>+ File</Button>
                <Button className="me-1" onClick={async() => await handleCreate(true)}>+ Folder</Button>
            </ButtonGroup>
            <Button variant="outline-success" size="sm" className="w-100 mb-2" onClick={handleImportClick}>Import .md</Button>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileImport} accept=".md" />

            <div className="d-flex overflow-auto" style={{ whiteSpace: 'nowrap',  padding: '10px' }}>
                <FileTreeItem entryId="root" selectedId={selectedId} setSelectedId={setSelectedId} />
            </div>
        </div>
    );
}

export default FileTree;
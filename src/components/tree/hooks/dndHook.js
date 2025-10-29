import { useDraggable, useDroppable } from '@dnd-kit/core';

export const useDnd = ({ entry }) => {
    const {
        attributes,
        listeners,
        setNodeRef: setDraggableRef,
        transform,
        isDragging,
    } = useDraggable({
        id: entry.id,
        disabled: entry.id === 'root',
    });

    const {
        isOver,
        setNodeRef: setDroppableRef,
    } = useDroppable({
        id: entry.id,
        disabled: !entry.isFolder,
    });

    const setNodeRef = (node) => {
        setDraggableRef(node);
        if (entry.isFolder) {
            setDroppableRef(node);
        }
    };

    return {
        setNodeRef,
        transform,
        isDragging,
        isOver,
        attributes,
        listeners,
    }
}
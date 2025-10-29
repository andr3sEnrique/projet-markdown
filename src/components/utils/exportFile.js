const downloadJson = (filename, jsonData) => {
    const content = JSON.stringify(jsonData, null, 2);
    const element = document.createElement("a");
    const file = new Blob([content], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const handleExportAll = (items) => {
    downloadJson("todos-los-bloques.parts.mdlc", items);
};

export const handleExportOne = (item) => {
    downloadJson(`${item.name}.part.mdlc`, item);
};
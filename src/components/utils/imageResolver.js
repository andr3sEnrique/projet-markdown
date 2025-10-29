export const resolveImageRefs = (content, images) => {
    if (!content) return '';

    const regex = /!\[(.*?)\]\(@img\/(.*?)\)/g;

    return content.replace(regex, (match, alt, id) => {
        const image = images[id];

        if (image) {
            return `![${alt}](${image.base64})`;
        }
        return `![${alt}](IMAGE-NOT-FOUND)`;
    });
};
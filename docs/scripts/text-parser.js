export function textToCollectionIds(inputText) {
    // TODO Add basic yt videos support
    if (!inputText) return [];
    
    const regex = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(inputText)) !== null) {
        matches.push(match[1]);
    }
    
    return matches;
}
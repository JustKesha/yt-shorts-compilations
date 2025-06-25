export function splitByLength(str, mlength) {
    let segments = [];
    for (let i = 0; i < str.length; i += mlength) {
        segments.push(str.slice(i, i + mlength));
    }
    return segments;
}
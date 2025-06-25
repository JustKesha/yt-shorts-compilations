import { config } from './config.js';

export async function getYouTubeVideoAccentColor(
    ytVideoID, onErr = config.AMBIENT_COLORS.DEFAULT,
    opac = config.AMBIENT_COLORS.OPACITY,
    ) {
    if (!ytVideoID) return onErr;
    // Using video thumbnail*
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = `https://img.youtube.com/vi/${ytVideoID}/maxresdefault.jpg`;
        
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = canvas.height = 1;
            ctx.drawImage(img, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            resolve(`rgbA(${r}, ${g}, ${b}, ${opac})`);
        };
        img.onerror = () => resolve(onErr);
    });
}

export async function updateAmbientColors(ytVideoID, cssVar = config.AMBIENT_COLORS.CSS_VAR) {
    const color = await getYouTubeVideoAccentColor(ytVideoID);
    $(':root').css(cssVar, color);
}
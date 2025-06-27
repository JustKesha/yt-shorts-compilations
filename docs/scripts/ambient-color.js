import { config } from './config.js';
import { getDominantColor } from './utils.js';

export async function getYouTubeVideoAccentColor(
    ytVideoID, onErr = config.AMBIENT_COLORS.DEFAULT,
    opac = config.AMBIENT_COLORS.OPACITY,
    ) {
    if (!ytVideoID) return onErr;
    // Using video thumbnail*
    return new Promise((resolve) => {
        getDominantColor(
            `https://img.youtube.com/vi/${ytVideoID}/maxresdefault.jpg`,
            resolve,
            true,
            config.AMBIENT_COLORS.VIBRANT
            );
    });
}

export async function updateAmbientColors(ytVideoID, cssVar = config.AMBIENT_COLORS.CSS_VAR) {
    const color = await getYouTubeVideoAccentColor(ytVideoID);
    $(':root').css(cssVar, color);
}
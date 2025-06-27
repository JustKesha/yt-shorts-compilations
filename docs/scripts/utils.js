export function splitByLength(str, mlength) {
    let segments = [];
    for (let i = 0; i < str.length; i += mlength) {
        segments.push(str.slice(i, i + mlength));
    }
    return segments;
}

function makeColorVibrant(rgbStr, vibrancy = 1.3) {
    // Extract RGB values
    const [r, g, b] = rgbStr.match(/\d+/g).map(Number);
    
    // Convert to HSL (better for color manipulation)
    let [h, s, l] = rgbToHsl(r, g, b);
    
    // Increase saturation
    s = Math.min(100, s * vibrancy);
    
    // Slightly adjust lightness for better vibrancy
    if (l > 50) {
      l = Math.max(60, l * 0.9); // Darken light colors a bit
    } else {
      l = Math.min(40, l * 1.1); // Lighten dark colors slightly
    }
    
    // Convert back to RGB
    const [nr, ng, nb] = hslToRgb(h, s, l);
    return `rgb(${Math.round(nr)}, ${Math.round(ng)}, ${Math.round(nb)})`;
}
  
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return [h * 360, s * 100, l * 100];
}
  
function hslToRgb(h, s, l) {
    h /= 360, s /= 100, l /= 100;
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return [r * 255, g * 255, b * 255];
}

export function getDominantColor( imageUrl, callback,
    makeVibrant = true, vibrantMult = 1.5, usedImageWidthPercent = 35 ) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 50;
        
        // Using middle X% width to crop out yt shorts thumbnail dark edges
        const cropWidth = img.width/100*usedImageWidthPercent;
        const cropX = (img.width - cropWidth) / 2;
        
        ctx.drawImage(
            img,
            cropX, 0,
            cropWidth, img.height,
            0, 0,
            canvas.width, canvas.height
        );
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        const colorCounts = {};
        let maxCount = 0;
        let dominantColor = [0, 0, 0];
        
        // Skip fully black pixels (RGB 0,0,0) which might be from remaining edges
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            
            // Ignore pure black pixels
            if (r === 0 && g === 0 && b === 0) continue;
            
            const key = `${r},${g},${b}`;
            colorCounts[key] = (colorCounts[key] || 0) + 1;
            
            if (colorCounts[key] > maxCount) {
                maxCount = colorCounts[key];
                dominantColor = [r, g, b];
            }
        }
        
        let out = `rgb(${dominantColor.join(',')})`;
        if (makeVibrant) out = makeColorVibrant(out, vibrantMult)
        callback(out);
    };
    
    img.onerror = () => callback(null);
}
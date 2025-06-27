export function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

export function choose(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

export function rand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function lightness(Rint,Gint,Bint) {  // takes sRGB channels as 8 bit integers
    var Rlin = (Rint / 255.0) ** 2.218;     // Convert int to decimal 0-1 and linearize
    var Glin = (Gint / 255.0) ** 2.218;    // ** is the exponentiation operator, older JS needs Math.pow() instead
    var Blin = (Bint / 255.0) ** 2.218;   // 2.218 Gamma for sRGB linearization. 2.218 sets unity with the piecewise sRGB at #777 .... 2.2 or 2.223 could be used instead
    var Ylum = Rlin * 0.2126 + Glin      //
        * 0.7156 + Blin * 0.0722;       // convert to Luminance Y
    return Math.pow(Ylum, 0.68) * 100; // Convert to lightness (0 to 100) 
                                      // Note: 2024 edit changed from 0.43 to 0.68
                                     // to place the returned mid point (50) around 0.36 Y
                                    // https://stackoverflow.com/questions/59603278/how-to-determine-colors-perceived-brightness
}
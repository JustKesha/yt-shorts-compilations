import { splitByLength } from './utils.js';
import { config } from './config.js';

export function parseUrlActions(player, url) {
    const searchParams = new URL(url).searchParams;

    Array.from(searchParams).forEach(searchParam => {
        const paramName = searchParam[0];
        const paramValue = searchParam[1];

        switch (paramName) {
            case 'r':
            case 'request':
            case 'i':
            case 'ids':
                const ytVideoIDs = splitByLength(paramValue, config.YT_VIDEO_ID_LENGTH);

                ytVideoIDs.forEach(ytVideoID => {
                    player.queueUp(ytVideoID);
                });

                // TODO Should instead be put in player class in case videos are added not via inital url
                let progressOnhoverFlex = 1, progressActiveFlex = 1, progressGap ="4px";

                // (TODO Replace with a switch case)
                // (TODO Place all hardcoded values in config)
                if (ytVideoIDs.length > 10) // Threshold

                    if (ytVideoIDs.length < 25) {
                        progressActiveFlex = 1.5;
                        progressOnhoverFlex = 1.5;
                    } else
                    if (ytVideoIDs.length < 50) {
                        progressActiveFlex = 1.75;
                        progressOnhoverFlex = 1.75;
                        progressGap = "2px";
                    } else {
                        progressActiveFlex = 2;
                        progressOnhoverFlex = 2;
                        progressGap = "2px";
                    }

                $(':root').css('--progress-gap', progressGap);
                $(':root').css('--progress-active-flex', progressActiveFlex);
                $(':root').css('--progress-onhover-flex', progressOnhoverFlex);
                break;
            case 's':
            case 'start':
            case 'startat':
                const paramNumber = Number(paramValue);
                if(paramNumber >= 0)
                    player.config.startat = Number(paramValue);
                break;
            
            // Experimental
            case 'p':
            case 'params':
                // Wide
                // TODO Better support for smaller screen sizes
                if (paramValue.includes('w')) {
                    $(':root').css('--video-width', '160vh');
                    $(':root').css('--next-preview-height', '10vh');
                }
                break;
        }
    });
}
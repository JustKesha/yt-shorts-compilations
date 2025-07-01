import { splitByLength } from './utils.js';
import { config } from './config.js';

export function parseUrlActions(player, url) {
    const searchParams = new URL(url).searchParams;

    Array.from(searchParams).forEach(searchParam => {
        const paramName = searchParam[0];
        const paramValue = searchParam[1];

        switch (paramName) {
            case 'r':
            case 'i':
            case 'ids':
                const ytVideoIDs = splitByLength(paramValue, config.YT_VIDEO_ID_LENGTH);

                ytVideoIDs.forEach(ytVideoID => {
                    player.queueUp(ytVideoID);
                });
                break;
            case 's':
                const paramNumber = Number(paramValue);
                if(paramNumber >= 0)
                    player.config.startat = Number(paramValue);
                break;
        }
    });
}
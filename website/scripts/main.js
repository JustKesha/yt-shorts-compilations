import { ShortsPlayer } from './shorts-player.js';
import { initInputHandlers } from './input-handler.js';
import { initYouTubeIFrameAPI } from './yt-iframe-api.js';

const player = new ShortsPlayer({
	queue: [
        "dNKSxTYxB0E",
        "Jn7Y0jeP8gY",
        "DYeJtD8uXEA",
    ],
    autoskip: true,
});

initYouTubeIFrameAPI(player);
initInputHandlers(player);
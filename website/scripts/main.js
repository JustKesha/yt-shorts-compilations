import { ShortsPlayer } from './shorts-player.js';

const player = new ShortsPlayer({
	queue: [
        "dNKSxTYxB0E",
        "Jn7Y0jeP8gY",
        "DYeJtD8uXEA",
    ],
    autoskip: true,
});

player.init();
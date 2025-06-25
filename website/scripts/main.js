import { ShortsPlayer } from './shorts-player.js';
import { initYouTubeIFrameAPI } from './yt-iframe-api.js';
import { initInputHandlers } from './input-handler.js';
import { config } from './config.js';

const player = new ShortsPlayer(config.SHORTS_PLAYER_CONFIG);

initYouTubeIFrameAPI(player);
initInputHandlers(player);
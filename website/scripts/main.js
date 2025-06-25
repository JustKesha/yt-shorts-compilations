import { config } from './config.js';
import { ShortsPlayer } from './shorts-player.js';
import { initYouTubeIFrameAPI } from './yt-iframe-api.js';
import { initInputHandlers } from './input-handler.js';
import { parseUrlActions } from './url-parser.js';

const player = new ShortsPlayer(config.SHORTS_PLAYER_CONFIG);

initYouTubeIFrameAPI(player);
initInputHandlers(player);
parseUrlActions(player, window.location.href);
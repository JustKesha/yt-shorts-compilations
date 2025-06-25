import { config, InputConfig } from './config.js';
import { ShortsPlayer } from './shorts-player.js';
import { initYouTubeIFrameAPI } from './yt-iframe-api.js';
import { InputHandler } from './input-handler.js';
import { parseUrlActions } from './url-parser.js';

const player = new ShortsPlayer(config.SHORTS_PLAYER_CONFIG);

initYouTubeIFrameAPI(player);
new InputHandler(player, InputConfig);
parseUrlActions(player, window.location.href);
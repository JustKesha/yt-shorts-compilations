import { config, InputConfig } from './config.js';
import { ShortsPlayer } from './shorts-player.js';
import { initYouTubeIFrameAPI } from './yt-iframe-api.js';
import { InputHandler } from './input-handler.js';
import { parseUrlActions } from './url-parser.js';
import { connectActionButtons } from './actions.js';
import { initControlsLock } from './controls-lock.js';
import { initHomePage } from './no-queue.js';

const player = new ShortsPlayer(config.SHORTS_PLAYER_CONFIG);

initYouTubeIFrameAPI(player);
parseUrlActions(player, window.location.href);
connectActionButtons(player);
initControlsLock();
if (!initHomePage(player))
    new InputHandler(player, InputConfig);
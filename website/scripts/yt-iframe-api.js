function _onYouTubeIFrameAPIStateChange(player, event) {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            player.video.duration = player.YTPlayer.getDuration();
            break;
        case YT.PlayerState.ENDED:
            if (player.config.autoskip) {
                player.next();
            } else
            if (player.config.loop) {
                player.YTPlayer.seekTo(0);
            }
            break;
    }
}

function _onYouTubeIFrameAPIReady(player, resolve) {
    player.YTPlayer = new YT.Player(player.element, {
        events: {
            'onStateChange': (event) => _onYouTubeIFrameAPIStateChange(player, event),
            'onReady': () => {
                player.init();
                resolve();
            },
        }
    });
}

export function initYouTubeIFrameAPI(player) {
    return new Promise((resolve) => {
        // Load YouTube IFrame API (if not loaded)
        if (!window.YT) {
            window.onYouTubeIframeAPIReady = () => {
                _onYouTubeIFrameAPIReady(player, resolve);
            };

            $('<script>', {
                src: player.config.urlapi,
            }).appendTo('body');
        } else {
            _onYouTubeIFrameAPIReady(player, resolve);
        }
    });
}
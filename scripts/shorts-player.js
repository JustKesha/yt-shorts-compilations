export class ShortsPlayer {
	constructor(options) {
		const {
			id,
			element,
			queue = [],
			autostart = true,
			startat = 0,
			loop = true,
			autoskip = false,
			urlapi = "https://www.youtube.com/iframe_api",
			urlbase = "https://www.youtube.com/embed/",
		} = options;
		
		this.element = element || $(`#${id || "shorts-player"}`)[0];
		this.config = { loop, autoskip, autostart, startat, urlbase, urlapi };
		this.queue = queue;
		this.video = { index: 0, id: "" };
		this.youtube_player = null;
	}

	// YouTube IFrame API 
	_onYouTubeAPIReady(resolve) {
		this.youtube_player = new YT.Player(this.element, {
			events: {
				'onStateChange': (event) => this._onStateChange(event),
				'onReady': () => resolve(),
			}
		});
	}
    _initYouTubeAPI() {
        return new Promise((resolve) => {
            // Load YouTube IFrame API (if not loaded)
            if (!window.YT) {
				window.onYouTubeIframeAPIReady = () => {
					this._onYouTubeAPIReady(resolve);
				};

                $('<script>', {
                    src: this.config.urlapi,
                }).appendTo('body');
            } else {
                this._onYouTubeAPIReady(resolve);
            }
        });
    }
	_onStateChange(event) {
		switch (event.data) {
			case YT.PlayerState.ENDED:
				if (this.config.autoskip) {
					this.next();
				} else
				if (this.config.loop) {
					this.youtube_player.seekTo(0);
				}
				break;
		}
	}

	// Controls
	_initControls() {
		// Keyboard
		window.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					this.next();
					break;
				case "ArrowLeft":
				case "ArrowUp":
					this.back();
					break;
			}
		});
	}

	// General
	init(autostart = this.config.autostart, at = this.config.startat) {
		this._initYouTubeAPI().then(() => {
			this._initControls();
			if (autostart) this.start(at);
		});
	}
	play(index = this.video.index) {
		if (!this.youtube_player) return;

		this.video.index = index;
		if (this.youtube_player) {
			this.youtube_player.loadVideoById(this.queue[index]);
		}
	}
	skip(dir = 1) {
		this.play(
			(this.video.index + dir + this.queue.length)
			% this.queue.length
		);
	}

	// Sugar
	start(at = this.config.startat) { this.play(at); }
	next() { this.skip(1); }
	back() { this.skip(-1); }
}
import { config } from './config.js';
import { updateAmbientColors } from './ambient-color.js';
import { initProgressBar } from './progress-bar.js';
import { updateNextVideoThumb } from './next-preview.js';

export class ShortsPlayer {
	constructor(options) {
		const {
			id, element, queue = [], autostart = true,
			startat = 0, loop = true, autoskip = false,
			urlapi = "https://www.youtube.com/iframe_api",
			urlbase = "https://www.youtube.com/embed/",
			noduplicates = true, skipdelay = 0,
		} = options;
		
		this.element = element || $(`#${id || "shorts-player"}`)[0];
		this.config = { loop, autoskip, autostart, startat,
			urlbase, urlapi, noduplicates, skipdelay };
		this.queue = queue;
		this.video = { index: 0, id: "", duration: -1, };
		this.updateProgressBar = initProgressBar(this);
		this.YTPlayer = null;
		this.lastSkipTime = 0;
	}

	init(autostart = this.config.autostart, at = this.config.startat) {
		if (autostart) this.start(at);
	}
	play(index = this.video.index) {
		if (!this.YTPlayer) return;

		this.video.index = index;
		this.video.id = this.queue[index];
		this.YTPlayer.loadVideoById(this.video.id);
		updateAmbientColors(this.video.id);
        if (this.updateProgressBar) this.updateProgressBar();
		updateNextVideoThumb(this);
		$(document).prop('title', `(${this.queue.length}) ${config.WEBISTE_NAME}`);
		const url = new URL(window.location.href);
		url.searchParams.set('s', this.video.index);
		window.history.replaceState(null, '', url);
	}
	skip(dir = 1) {
		const now = Date.now();
		if (now - this.lastSkipTime < this.config.skipdelay) return;
		this.lastSkipTime = now;
		this.play(
			(this.video.index + dir + this.queue.length)
			% this.queue.length
		);
	}

	queueUp(new_video_id, forcestart = true) {
		if(this.config.noduplicates && this.queue.includes(new_video_id)) return;
		this.queue.push(new_video_id);
		if(forcestart && this.queue.length == 1)
			this.play(0);
		if (this.updateProgressBar) this.updateProgressBar();
	}

	// Sugar
	start(at = this.config.startat) { this.play(at); }
	next() { this.skip(1); }
	back() { this.skip(-1); }
}
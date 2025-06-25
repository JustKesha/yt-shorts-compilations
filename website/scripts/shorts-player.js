import { updateAmbientColors } from './ambient-color.js';

export class ShortsPlayer {
	constructor(options) {
		const {
			id, element, queue = [], autostart = true,
			startat = 0, loop = true, autoskip = false,
			urlapi = "https://www.youtube.com/iframe_api",
			urlbase = "https://www.youtube.com/embed/",
			noduplicates = true,
		} = options;
		
		this.element = element || $(`#${id || "shorts-player"}`)[0];
		this.config = { loop, autoskip, autostart, startat, urlbase, urlapi, noduplicates };
		this.queue = queue;
		this.video = { index: 0, id: "", duration: -1, };
		this.YTPlayer = null;
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
	}
	skip(dir = 1) {
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
	}

	// Sugar
	start(at = this.config.startat) { this.play(at); }
	next() { this.skip(1); }
	back() { this.skip(-1); }
}
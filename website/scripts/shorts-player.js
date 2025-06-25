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

	init(autostart = this.config.autostart, at = this.config.startat) {
		if (autostart) this.start(at);
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
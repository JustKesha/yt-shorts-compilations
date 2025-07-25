export const config = {
    GITHUB: "https://github.com/JustKesha/yt-shorts-compilations",
    WEBISTE_NAME: "YT Shorts Collection",
    YT_VIDEO_ID_LENGTH: 11,
    SHORTS_PLAYER_CONFIG: {
        autoskip: true,
        skipdelay: 500,
    },
    AMBIENT_COLORS: {
        DEFAULT: "#ffffff80",
        VIBRANT: 1.5,
        CSS_VAR: "--video-ambient-color",
    }
}

export const InputConfig = {
    wheel: {
        threshold: 100,
        resetDelay: 300,
        preventDefault: true
    },
    touch: {
        minSwipeDistance: 50,
        preventDefault: true
    },
    keyboard: {
        nextKeys: ['ArrowRight', 'ArrowDown'],
        prevKeys: ['ArrowLeft', 'ArrowUp'],
        preventDefault: true
    }
};
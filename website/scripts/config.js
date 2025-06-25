export const config = {
    YT_VIDEO_ID_LENGTH: 11,
    SHORTS_PLAYER_CONFIG: {
        autoskip: true,
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
export function updateNextVideoThumb(player) {
    const nextVideoId = player.queue[player.video.index + 1] || player.queue[0];
    $('#next-preview')
        .css('background-image', `url(https://i.ytimg.com/vi/${nextVideoId}/maxresdefault.jpg)`)
        .off('click')
        .on('click', () => player.next());
}
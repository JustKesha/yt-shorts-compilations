export function initProgressBar(player) {
    const $container = $('#queue-progress');
    
    function updateProgressBar() {
        $container.empty();
        
        for (let i = 0; i < player.queue.length; i++) {
            $('<div>')
                .addClass('queue-progress-element')
                .toggleClass('active', i === player.video.index)
                .on('click', () => player.play(i))
                .appendTo($container);
        }
    }
    // Initial setup
    updateProgressBar();
    
    // Return function to update later
    return updateProgressBar;
}
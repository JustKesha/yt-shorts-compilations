import { config } from './config.js';

export function connectActionButtons(player) {
    if (!player) return;
    // After player initialization
    $(document).ready(() => {
        // Button actions
        $('#action-next').click(() => player.next());
        $('#action-back').click(() => player.back());
        
        $('#action-github').click(() => {
            window.open(config.GITHUB, '_blank');
        });
        
        $('#action-share').click(async () => {
            try {
                const currentUrl = window.location.href;
                await navigator.clipboard.writeText(currentUrl);
                alert('URL copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy URL: ', err);
                alert('Failed to copy URL');
            }
        });
        
        $('#action-yt').click(() => {
            if (player.video.id) {
                window.open(`https://youtube.com/watch?v=${player.video.id}`, '_blank');
            }
        });
    });
}
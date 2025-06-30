import { textToCollectionIds } from './text-parser.js';

function onHomePageGenerate(inputText, event) {
    const videoIds = textToCollectionIds(inputText);
    if (videoIds.length <= 0) return;
    const idsString = videoIds.join('');
    const currentUrl = window.location.href.split('?')[0];
    const newUrl = `${currentUrl}?r=${encodeURIComponent(idsString)}`;
    window.location.href = newUrl;
}

export function initHomePage(player) {
    // To get off home page reload will be required
    if (player.queue.length > 0) return false;

    $('.hide-on-empty-queue').addClass('hidden');
    $('.show-on-empty-queue').removeClass('hidden');

    $('#home-generate-button').click(function(e) {
        onHomePageGenerate($('#home-text-input').val(), e);
    });

    return true;
}
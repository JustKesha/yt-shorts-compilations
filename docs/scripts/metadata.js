const ytVideoIdLength = 11;
  
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const request = urlParams.get('r');

    if (request == null)
        return;

    const videosCount = Math.floor(request.length / ytVideoIdLength);

    if (videosCount <= 0)
        return;

    const new_title = `Collections of ${videosCount} YouTube Shorts`;
  
    $('meta[name="title"]').attr('content', new_title);
    $('meta[property="og:title"]').attr('content', new_title);
    $('meta[property="twitter:title"]').attr('content', new_title);
});
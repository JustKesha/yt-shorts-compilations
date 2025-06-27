const USE_CHROME_NOTIFY = false;

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  // Get the current active tab (should be YouTube Shorts)
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab.url.includes('youtube.com/shorts')) {
    return;
  }
  
  // Extract video ID from URL (format: youtube.com/shorts/VIDEO_ID)
  const videoId = tab.url.split('/shorts/')[1].slice(0, 11);
  
  if (!videoId) {
    return;
  }
  
  // Get current playlists
  const { playlists = [] } = await chrome.storage.local.get('playlists');
  
  let playlistIndex;
  
  // DEPRECATED
  // save-to-playlist-next removed due to manifest commands count limitation of 4
  if (command === 'save-to-playlist-next') {
    // Find the first playlist that doesn't have this video
    for (let i = 0; i < playlists.length; i++) {
      if (!playlists[i].videos.includes(videoId)) {
        playlistIndex = i;
        break;
      }
    }
    
    // If video exists in all playlists, use the first one
    if (playlistIndex === undefined) {
      playlistIndex = 0;
    }
  } else {
    playlistIndex = parseInt(command.split('-').pop()) - 1;
  }
  
  // Add video to the selected playlist if not already there
  if (playlists[playlistIndex])
  if (!playlists[playlistIndex].videos.includes(videoId)) {
    playlists[playlistIndex].videos.push(videoId);
    await chrome.storage.local.set({ playlists });
    
    // Show notification
    if (chrome.notifications && USE_CHROME_NOTIFY)
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Video Added',
      message: `Added to ${playlists[playlistIndex].name}`
    });
  } else {
    if (chrome.notifications && USE_CHROME_NOTIFY)
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Video Already Exists',
      message: `This video is already in ${playlists[playlistIndex].name}`
    });
  }
});
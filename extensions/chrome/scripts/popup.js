import { config } from './config.js';
import { hexToRgb, choose, rand, lightness } from './util.js';

function getColorPattern(color, index) {
    if (![0,1,2,3].includes(index)) index = rand(0,3);

    switch (index) {
        case 0:
            return `background:
            radial-gradient(circle, transparent 20%, ${color} 21%, ${color} 24%, transparent 25%),
            radial-gradient(circle, transparent 30%, ${color} 31%, ${color} 34%, transparent 35%),
            radial-gradient(circle, transparent 40%, ${color} 41%, ${color} 44%, transparent 45%);
            background-size: 150%;`;
        case 1:
            return `background:
            linear-gradient(135deg, ${color} 25%, transparent 25%) -50px 0,
            linear-gradient(225deg, ${color} 25%, transparent 25%) -50px 0,
            linear-gradient(315deg, ${color} 25%, transparent 25%),
            linear-gradient(45deg, ${color} 25%, transparent 25%);`;
        case 2:
            return `background:
            linear-gradient(45deg, ${color} 25%, transparent 25%),
            linear-gradient(-45deg, ${color} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${color} 75%),
            linear-gradient(-45deg, transparent 75%, ${color} 75%);`;
        case 3:
            return `background:
            linear-gradient(0deg, transparent 24%, ${color} 25%, ${color} 26%, transparent 27%),
            linear-gradient(90deg, transparent 24%, ${color} 25%, ${color} 26%, transparent 27%),
            linear-gradient(45deg, transparent 39%, ${color} 40%, ${color} 41%, transparent 42%),
            linear-gradient(-45deg, transparent 39%, ${color} 40%, ${color} 41%, transparent 42%);`;
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const playlistsContainer = document.getElementById('playlists-container');
    const optionsButton = document.getElementById('options-button');
    
    // Load playlists from storage
    let { playlists = [] } = await chrome.storage.local.get('playlists');
    
    // Initialize default playlists if none exist
    if (playlists.length === 0) {
        const defaultPlaylists = [
            { id: 1, name: 'Collection 1', videos: [], icon: choose(Object.keys(config.ICONS)), color: choose(config.PLAYLIST_STANDART_COLORS) },
            { id: 2, name: 'Collection 2', videos: [], icon: choose(Object.keys(config.ICONS)), color: choose(config.PLAYLIST_STANDART_COLORS) },
            { id: 3, name: 'Collection 3', videos: [], icon: choose(Object.keys(config.ICONS)), color: choose(config.PLAYLIST_STANDART_COLORS) },
        ];
        await chrome.storage.local.set({ playlists: defaultPlaylists });
        playlists = defaultPlaylists;
    }
    
    // Display each playlist
    playlists.forEach(playlist => {
        const colorVals = hexToRgb(playlist.color);
        const colorRgba = `rgba(${colorVals.r}, ${colorVals.g}, ${colorVals.b}, ${config.PLAYLIST_BG_COLOR_OPAC})`;
        const bgSize = choose(config.PLAYLIST_BG_SIZES);
        const colorLightness = lightness(colorVals.r, colorVals.g, colorVals.b);

        playlistsContainer.innerHTML +=

`<div class="playlist ${colorLightness >= config.PLAYLIST_DARK_FONT_LIGHTNESS_CAP ? 'dark-font' : ''}" id="playlist-embed-${playlist.id}">
<div class="playlist-background" style="background-color: ${colorRgba};">
<div class="playlist-content" style="${getColorPattern(playlist.color)}; background-size: ${bgSize};">
    <div class="playlist-header">
        <div class="playlist-icon">${config.ICONS[playlist.icon]}</div>
        <h2>${playlist.name}</h2>
    </div>
    <p>${playlist.videos.length} videos</p>
    <div class="actions">
        <button id="open-paylist-button-${playlist.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19l9-7l-9-7zM2 19l9-7l-9-7z"/></svg>
        </button>
        <button id="copy-paylist-button-${playlist.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></g></svg>
        </button>
        <button id="edit-paylist-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1l1-4z"/></g></svg>
        </button>
        <button id="delete-paylist-button-${playlist.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
    </div>
</div></div></div>`;

    });

    playlists.forEach(playlist => {
        document.getElementById(`open-paylist-button-${playlist.id}`).addEventListener('click', () => {
            openPlaylist(playlist);
        });
        document.getElementById(`copy-paylist-button-${playlist.id}`).addEventListener('click', () => {
            copyPlaylistLink(playlist);
        });
        document.getElementById(`delete-paylist-button-${playlist.id}`).addEventListener('click', () => {
            deletePlaylist(playlist);
        });
    });

    document.getElementById(`edit-paylist-button`).addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });
    
    optionsButton.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });
    
    function copyPlaylistLink(playlist) {
        if (playlist.videos.length === 0) {
            alert('This playlist is empty!');
            return;
        }
        
        const videoIds = playlist.videos.join('');
        const url = `${config.WEBSITE_BASE_URL}?r=${videoIds}`;
        
        navigator.clipboard.writeText(url)
            // .then(() => alert('Link copied to clipboard!'))
            // .catch(err => console.error('Failed to copy: ', err));
    }
    
    function openPlaylist(playlist) {
        if (playlist.videos.length === 0) {
            alert('This playlist is empty!');
            return;
        }
        
        const videoIds = playlist.videos.join('');
        const url = `${config.WEBSITE_BASE_URL}?r=${videoIds}`;
        chrome.tabs.create({ url });
    }

    async function deletePlaylist(playlist) {
        const index = playlists.findIndex(p => p.id === playlist.id);

        if (index !== -1) 
            playlists.splice(index, 1);

        await chrome.storage.local.set({ playlists: playlists });
        document.getElementById(`playlist-embed-${playlist.id}`).remove();
    }
});
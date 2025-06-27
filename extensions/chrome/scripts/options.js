import { config } from './config.js';
import { choose } from './util.js';

document.addEventListener('DOMContentLoaded', async function() {
    const playlistOptions = document.getElementById('playlist-options');
    const saveButton = document.getElementById('save-button');
    
    const { playlists = [] } = await chrome.storage.local.get('playlists');
    
    playlists.forEach((playlist, index) => {
        let iconsHTML = '';
        Object.keys(config.ICONS).forEach(icon_name => {
            const isSelected = playlist.icon === icon_name;
            iconsHTML += `
<label class="icon-option ${isSelected ? 'selected' : ''}">
    <div class="icon-preview">${config.ICONS[icon_name]}</div>
    <input type="radio" name="playlist-${playlist.id}-icon" value="${icon_name}" ${isSelected ? 'checked' : ''}>
</label>`;
        });

        let colorsHTML = '';
        config.PLAYLIST_STANDART_COLORS.forEach(color => {
            colorsHTML += `
<button class="color-option" data-color="${color}" style="background-color: ${color};"></button>`;
        });

        playlistOptions.innerHTML += `
<div class="option" data-playlist-id="${playlist.id}">
    <h2>Collection ${index + 1}</h2>
    <label>
        Name:
        <input type="text" class="playlist-name" value="${playlist.name}">
    </label>
    <label>
        Icon:
    </label>
    <div class="icon-preview-container">
        ${iconsHTML}
    </div>
    <label>
        Color:
    </label>
    <div class="quick-colors">
        ${colorsHTML}
    </div>
    <input type="color" class="playlist-color" value="${playlist.color || '#ffffff'}">
</div>`;
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('color-option')) {
            const colorInput = e.target.closest('.option').querySelector('.playlist-color');
            colorInput.value = e.target.dataset.color;
        }
        
        if (e.target.closest('.icon-option')) {
            const iconOptions = e.target.closest('.icon-preview-container').querySelectorAll('.icon-option');
            iconOptions.forEach(option => option.classList.remove('selected'));
            e.target.closest('.icon-option').classList.add('selected');
        }
    });

    function getNextAvailableId(plsts) {
        const usedIds = new Set(plsts.map(p => p.id));
        let id = 1;
        while (usedIds.has(id)) {
            id++;
        }
        return id;
    }

    document.getElementById(`new-button`).addEventListener('click', async () => {
        if (playlists.length >= 4) {
            alert('Cannot create more than 4 collections')
            return;
        }

        const id = getNextAvailableId(playlists);
        
        playlists.push(
            {
                id: id,
                // Videos are added using playlists array indexes, not ids
                name: 'New Collection',
                // name: 'Collection ' + id, // Missleading
                videos: [],
                icon: choose(Object.keys(config.ICONS)),
                color: choose(config.PLAYLIST_STANDART_COLORS)
            }
        );
        await chrome.storage.local.set({ playlists: playlists });
        window.location.reload();
    });

    document.getElementById(`reset-button`).addEventListener('click', async () => {
        await chrome.storage.local.set({ playlists: [] });
        window.location.reload();
    });

    document.getElementById(`about-button`).addEventListener('click', () => {
        chrome.tabs.create({ url: config.GITHUB });
    });

    document.getElementById(`controls-button`).addEventListener('click', () => {
        console.log(config.CONTROLS_MESSAGE);
        alert(config.CONTROLS_MESSAGE);
    });
    
    saveButton.addEventListener('click', async function() {
        const updatedPlaylists = [];
        const optionDivs = document.querySelectorAll('.option');
        
        optionDivs.forEach(optionDiv => {
            const playlistId = parseInt(optionDiv.dataset.playlistId);
            const originalPlaylist = playlists.find(p => p.id === playlistId);
            
            if (!originalPlaylist) return;
            
            const nameInput = optionDiv.querySelector('.playlist-name');
            const selectedIconOption = optionDiv.querySelector('.icon-option.selected');
            const colorInput = optionDiv.querySelector('.playlist-color');
            
            updatedPlaylists.push({
                id: playlistId,
                name: nameInput.value,
                videos: originalPlaylist.videos,
                icon: selectedIconOption ? selectedIconOption.querySelector('input').value : originalPlaylist.icon,
                color: colorInput.value
            });
        });
        
        try {
            await chrome.storage.local.set({ playlists: updatedPlaylists });
            alert('Playlist settings saved successfully!');
        } catch (error) {
            console.error('Error saving playlists:', error);
            alert('Failed to save playlist settings!');
        }
    });
});
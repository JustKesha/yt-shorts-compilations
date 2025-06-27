export function initControlsLock() {
    const lockOnBtn = document.getElementById('controls-lock-on-button');
    const lockOffBtn = document.getElementById('controls-lock-off-button');
    const controlsLockCover = document.getElementById('controls-lock-cover-id');
    let areControlsLocked = localStorage.getItem('are_controls_locked') === "true";
    
    function updateButtonStates() {
        if (areControlsLocked) {
            lockOnBtn.style.display = 'none';
            lockOffBtn.style.display = 'block';
            controlsLockCover.style.display = 'block';
        } else {
            lockOnBtn.style.display = 'block';
            lockOffBtn.style.display = 'none';
            controlsLockCover.style.display = 'none';
        }
    }
    
    updateButtonStates();
    
    lockOnBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        areControlsLocked = true;
        localStorage.setItem('are_controls_locked', "true");
        updateButtonStates();
    });
    
    lockOffBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        areControlsLocked = false;
        localStorage.setItem('are_controls_locked', "false");
        updateButtonStates();
    });
}
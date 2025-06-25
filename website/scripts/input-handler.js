export function initInputHandlers(player) {
    // Keyboard
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowRight":
            case "ArrowDown":
                player.next();
                break;
            case "ArrowLeft":
            case "ArrowUp":
                player.back();
                break;
        }
    });

    // Mouse Wheel
    let lastScrollTime = 0;
    const scrollDelay = 350; // ms
    
    window.addEventListener("wheel", (e) => {
        const now = Date.now();
        if (now - lastScrollTime < scrollDelay) return;

        lastScrollTime = now;
        player.skip(e.deltaY > 0 ? 1 : -1);
    });

    // Touch
    let touchStartY = 0;

    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    window.addEventListener("touchend", (e) => {
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 50) player.skip(diff > 0 ? 1 : -1);
    });
}
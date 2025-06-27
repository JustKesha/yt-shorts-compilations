/**
 * Handles all user input interactions for video navigation
 * @class
 * @param {Player} player - Player instance to control
 * @param {InputConfig} config - Configuration object
 * 
 * @listens window:wheel
 * @listens window:touchstart
 * @listens window:touchend
 * @listens window:keydown
 */
export class InputHandler {
  constructor(player, config) {
    this.player = player;
    this.config = config;
    this.accumulatedDelta = 0;
    this.resetTimeout = null;
    this.touchStartY = 0;
    
    this.keyboardConfig = {
      nextKeys: new Set(['ArrowRight', 'ArrowDown']),
      prevKeys: new Set(['ArrowLeft', 'ArrowUp']),
      preventDefault: true
    };

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener(
      'wheel', 
      this.handleWheel.bind(this), 
      { passive: false }
    );
    window.addEventListener(
      'touchstart', 
      this.handleTouchStart.bind(this), 
      { passive: false }
    );
    window.addEventListener(
      'touchend', 
      this.handleTouchEnd.bind(this)
    );
    window.addEventListener(
      'keydown', 
      this.handleKeyDown.bind(this)
    );
  }

  handleWheel(e) {
    if (this.config.wheel.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    clearTimeout(this.resetTimeout);
    this.accumulatedDelta += e.deltaY;

    if (Math.abs(this.accumulatedDelta) > this.config.wheel.threshold) {
      this.player.skip(this.accumulatedDelta > 0 ? 1 : -1);
      this.accumulatedDelta = 0;
    }

    this.resetTimeout = setTimeout(() => {
      this.accumulatedDelta = 0;
    }, this.config.wheel.resetDelay);
  }

  handleTouchStart(e) {
    if (this.config.touch.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }
  
  handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    
    const diffX = this.touchStartX - endX;
    const diffY = this.touchStartY - endY;
    
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);
    
    if (absDiffX > this.config.touch.minSwipeDistance || 
        absDiffY > this.config.touch.minSwipeDistance) {
      
      if (absDiffX > absDiffY) {
        // Horizontal swipe - left/right takes priority
        if (diffX > 0) {
          this.player.next(); // Right to left
        } else {
          this.player.back(); // Left to right
        }
      } else {
        // Vertical swipe - up/down
        if (diffY > 0) {
          this.player.next(); // Bottom to top
        } else {
          this.player.back(); // Top to bottom
        }
      }
    }
  }

  handleKeyDown(e) {
    if (this.keyboardConfig.preventDefault) {
      e.preventDefault();
    }

    if (this.keyboardConfig.nextKeys.has(e.key)) {
      this.player.next();
    } else if (this.keyboardConfig.prevKeys.has(e.key)) {
      this.player.back();
    }
  }

  destroy() {
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('keydown', this.handleKeyDown);
    clearTimeout(this.resetTimeout);
  }
}
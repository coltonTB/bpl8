const POLL_INTERVAL = 200;
let instance;


function doWhileScrolling(onScrollStart, onScrollEnd) {
  let lock = false;
  window.addEventListener('scroll', e => {
    scroll_position = window.scrollY;
    if (lock) {
      return;
    }
    window.requestAnimationFrame(() => {
      // If scrollPosition has not changed
      if (scroll_position === window.scrollY) {
        return onScrollEnd();
      }
      onScrollStart();
      lock = false;
    });
    lock = true;
  });
}

class EventManager {

  constructor() {
    this.events = [];
    this.count = 100;
    this.started = false;
  }

  startLoop() {
    window.setInterval(this.processEvents.bind(this), POLL_INTERVAL)
  }

  addEvent(fn) {
    const uuid = String(this.count);
    this.count ++;
    this.events.push({
      uuid,
      fn
    });
    if (!this.started) {
      this.startLoop();
    }
    return uuid;
  }

  removeEvent(uuid) {
    this.events = this.events.filter(e => e.uuid !== uuid);
  }

  processEvents() {
    this.events.forEach(e => e.fn())
  }
}

export function getEventManagerInstance() {
  instance = instance || new EventManager();
  return instance;
}

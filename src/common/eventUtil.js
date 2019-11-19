const event = {
  on: (target, type, handler) => {
    if (target.addEventListener) {
      target.addEventListener(type, handler, true);
    } else {
      target.attachEvent(
        'on' + type,
        (event) => handler.call(target, event),
        false,
      );
    }
  },
  off: (target, type, handler) => {
    if (target.removeEventListener) {
      target.removeEventListener(type, handler, true);
    } else {
      target.detachEvent(
        'on' + type,
        (event) => handler.call(target, event),
        false
      );
    }
  },
};

export default event;


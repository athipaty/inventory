export function useSwipe(onRight) {
  let startX = 0;

  return {
    onTouchStart: e => (startX = e.touches[0].clientX),
    onTouchEnd: e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 80) onRight();
    },
  };
}

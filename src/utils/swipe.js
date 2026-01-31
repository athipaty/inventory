export function useSwipe(onRight) {
  let startX = 0;
  let startY = 0;

  return {
    onTouchStart: (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    onTouchEnd: (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = Math.abs(
        e.changedTouches[0].clientY - startY
      );

      // prevent scroll gestures
      if (dy > 40) return;

      if (dx > 60) {
        onRight();
      }
    },
  };
}

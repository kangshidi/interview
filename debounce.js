/*
 * 防抖 单位时间内事件触发会被重置，避免多次下发。
 */
function debounce(fn, timeout = 1000) {
  let timer;
  let context;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, arguments);
    }, timeout);
  }
}
window.addEventListener("resize", debounce(() => {
  console.log('--- resize');
}));

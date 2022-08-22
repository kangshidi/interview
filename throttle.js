/* 
 * 节流 单位时间内只执行一次。
 */
function throttle(fn, timeout = 1000) {
  let timer;
  let context;
  return () => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(context, arguments);
      timer = null; // 十分重要
    }, timeout);
  }
}
window.addEventListener("resize", throttle(() => {
  console.log('--- resize');
}));

// 使用延时器实现定时器
let i = 0
function fn() {
  console.log(`使用setTimeout实现定时器每秒i+1:  ${i++}`);
}
function dinshiqi(fn, duration) {
  dinshiqi.id = setTimeout(() => {
    fn()
    clearTimeout(dinshiqi.id)
    dinshiqi(fn, duration)
  }, duration)
}
dinshiqi(fn, 1000)
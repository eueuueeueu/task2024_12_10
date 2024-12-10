function cubicBezier(x1, y1, x2, y2, t) {
  // let x = 3 * t * Math.pow(1 - t, 2) * x1 + 3 * Math.pow(t, 2) * (1 - t) * x2 + Math.pow(t, 3)
  let y = 3 * t * Math.pow(1 - t, 2) * y1 + 3 * Math.pow(t, 2) * (1 - t) * y2 + Math.pow(t, 3)
  return y
}
// 假设运动总时长10s 每一循环代表3s
// 总距离800
// for (let i = 1; i <= 10; i++) {
//   console.log(cubicBezier(0.5, 0.5, 0.5, 0.5, i / 10) * 800);
// }
let move = document.querySelector('.move')
let step = 1
let p = document.querySelector('p')
let flag = true
let timer = setInterval(() => {
  if (step <= 10 && flag) {
    p.innerHTML = `animation progress ${Math.floor(cubicBezier(0.5, 0.5, 0.5, 0.5, step / 10) * 500)}`
    move.style.transform = `translateX(${cubicBezier(0.5, 0.5, 0.5, 0.5, step / 10) * 500}px)`;
  } else {
    flag = false
    step -= 2
    p.innerHTML = `animation progress ${Math.floor(cubicBezier(0.5, 0.5, 0.5, 0.5, step / 10) * 500)}`
    move.style.transform = `translateX(${cubicBezier(0.5, 0.5, 0.5, 0.5, step / 10) * 500}px)`;
    // clearInterval(timer)
    if (step <= 0) {
      flag = true
    }
  }
  step++
}, 300)
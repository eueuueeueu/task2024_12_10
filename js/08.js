function cubicBezier(x1, y1, x2, y2, t) {
  // let x = 3 * t * Math.pow(1 - t, 2) * x1 + 3 * Math.pow(t, 2) * (1 - t) * x2 + Math.pow(t, 3)
  let y = 3 * t * Math.pow(1 - t, 2) * y1 + 3 * Math.pow(t, 2) * (1 - t) * y2 + Math.pow(t, 3)
  return y
}
let p = document.querySelector('p')
let move = document.querySelector('.move')
let flagDiv = document.querySelector('.flag')
let currentPosition = 200
let flag2 = true
flagDiv.addEventListener('click', () => {
  let flag = true
  let timer = setInterval(() => {
    if (currentPosition > 0 && flag) {
      currentPosition -= 5
      move.style.transform = `translate(0, -${currentPosition}px)`
    } else {
      flag = false
      currentPosition += 5
      move.style.transform = `translate(0, -${currentPosition}px)`
      currentPosition === 200 ? clearInterval(timer) : ''
    }
  }, 1)
  if (flag2) {
    flag2 = false
    p.style.color = '#ccc'
    document.documentElement.style.backgroundColor = 'black'
  } else {
    flag2 = true
    p.style.color = '#111'
    document.documentElement.style.backgroundColor = '#fff'
  }
})
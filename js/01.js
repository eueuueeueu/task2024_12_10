function getDate(time) {
  let residueTime = new Date(time).getTime() - Date.now()
  let day = Math.floor(residueTime / (1 * 24 * 60 * 60 * 1000))
  let hourFull = Math.floor(residueTime / (1 * 60 * 60 * 1000))
  let hour = Math.floor(residueTime / (1 * 60 * 60 * 1000) % 24)
  let minute = Math.floor(residueTime / (1 * 60 * 1000) % 60)
  let second = Math.floor(residueTime / (1 * 1000) % 60)
  let ms = parseInt(residueTime % 1000) < 100 ? '0' + residueTime % 1000 : parseInt(residueTime % 1000)
  let countDown = document.querySelector('.countDown h2')
  countDown.innerHTML = `${hourFull}:${minute}:${second}`
  let millionSeconds = document.querySelector('.millionSeconds h2')
  millionSeconds.innerHTML = `${hourFull}:${minute}:${second}:${ms}`
  let dayLevel = document.querySelector('.dayLevel h2')
  dayLevel.innerHTML = `${day}天${hour}时${minute}分${second}秒`
}
getDate('2024/12/16')
setInterval(() => {
  getDate('2024/12/16')
}, 100)
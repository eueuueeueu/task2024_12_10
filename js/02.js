let btn = document.querySelector('button')
btn.addEventListener('click', () => {
  if (btn.textContent === '1000') {
    btn.textContent = 0
    let timer = setInterval(() => {
      btn.textContent = parseInt(btn.textContent) + 1
      btn.textContent === '1000' ? clearInterval(timer) : ''
    }, 1)
  } else {
    btn.style.pointerEvents = 'none'
    // btn.style.cursor = 'not-allowed'
  }
})
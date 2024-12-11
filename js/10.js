let flagDiv = document.querySelector('.flag')
let p = document.querySelector('p')
let flag = true
let box = document.querySelector('.flag div')
let none = document.querySelector('.none')
let block = document.querySelector('.block')
flagDiv.addEventListener('click', () => {
  if (flag) {
    block.style.transform = `rotate(360deg)`
    document.documentElement.style.backgroundColor = 'black'
    p.style.color = '#fff'
    none.style.opacity = '1'
    box.style.opacity = '1'
    flag = false
  } else {
    block.style.transform = `rotate(0deg)`
    document.documentElement.style.backgroundColor = '#fff'
    p.style.color = '#111'
    none.style.opacity = '0'
    box.style.opacity = '0'
    flag = true
  }
})
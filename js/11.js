let a = document.querySelector('.a')
let b = document.querySelector('.b')
let c = document.querySelector('.c')
let d = document.querySelector('.d use')
let color = document.querySelector('.color')
let menu = document.querySelector('.menu')
let menu2 = document.querySelector('.menu2')
let bgDiv = document.querySelector('.bgDiv')
a.addEventListener('mouseenter', () => {
  color.style.display = 'block'
})
a.addEventListener('mouseleave', () => {
  color.style.display = 'none'
})
b.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block'
})
menu.addEventListener('mouseleave', () => {
  menu.style.display = 'none'
})
c.addEventListener('click', () => {
  menu2.style.display = menu2.style.display === 'block' ? 'none' : 'block'
})
menu2.addEventListener('mouseleave', () => {
  menu2.style.display = 'none'
})
d.addEventListener('click', () => {

  if (bgDiv.style.width === '' || bgDiv.style.width === '0px') {
    bgDiv.style.width = 4000 + 'px'
    bgDiv.style.height = 4000 + 'px'
    d.href.baseVal = '#icon5'
  } else {
    bgDiv.style.width = 0 + 'px'
    bgDiv.style.height = 0 + 'px'
    d.href.baseVal = '#icon4'
  }
  console.log(bgDiv.style.width);
})
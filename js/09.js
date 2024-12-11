let flagDiv = document.querySelector('.flag')
let p = document.querySelector('p')
let flag = true
let svg = document.querySelector('.flag svg')
let none = document.querySelector('.none')
flagDiv.addEventListener('click', () => {
  if (flag) {
    document.documentElement.style.backgroundColor = 'black'
    flagDiv.style.transform = `translateX(36px)`
    p.style.color = '#fff'
    none.style.opacity='0'
    flag = false
  } else {
    document.documentElement.style.backgroundColor = '#fff'
    flagDiv.style.transform = `translateX(0px)`
    p.style.color = '#111'
    none.style.opacity = '1'
    flag = true
  }
})
let flagDiv = document.querySelector('.flag')
let p=document.querySelector('p')
let flag = true
flagDiv.addEventListener('click', () => {
  if (flag) {
    document.documentElement.style.backgroundColor = 'black'
    flagDiv.style.transform = `translateX(36px)`
    p.style.color='#fff'
    flag=false
  }else{
    document.documentElement.style.backgroundColor = '#fff'
    flagDiv.style.transform = `translateX(0px)`
    p.style.color = '#111'
    flag = true
  }
})
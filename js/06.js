let quxiao = document.querySelector('.quxiao')
let header_right_user = document.querySelector('.header_right_user')
header_right_user.addEventListener('click',()=>{
  quxiao.style.display='block'
})
quxiao.addEventListener('click',(e)=>{
  if (e.target.className ==='quxiao'){
    quxiao.style.display='none'
  }
  
})
let top1 = document.querySelector('.top')
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 800) {
    top1.style.display = 'block'
  } else {
    top1.style.display = 'none'
  }
})
top1.addEventListener('click', () => {
  let html = document.documentElement
  // 方法1
  const i = setInterval(() => {
    html.scrollTop === 0 ? clearInterval(i) : html.scrollTop -= 20
  }, 1)

  // 方法2  这个方法搭配css  scroll-behavior: smooth;
  // html.style.scrollBehavior = 'smooth'
  // let htmlActiveStyle = getComputedStyle(html)
  // if (htmlActiveStyle.scrollBehavior === 'smooth') {
  //   html.scrollTop = 0
  // }
  // 方法3
  // html.style.scrollBehavior = 'smooth'
  // let htmlActiveStyle = getComputedStyle(html)
  // if (htmlActiveStyle.scrollBehavior === 'smooth') {
  //   html.scrollIntoView()
  // }
})
// 全局方法
// 获取dom元素计算后的样式表
// let divElement = document.querySelector('.a')
// let styleObj = getComputedStyle(divElement)
// console.log(styleObj.width);
// console.log(styleObj.height);
// console.log(styleObj.backgroundColor);
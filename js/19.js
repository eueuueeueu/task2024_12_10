// 获取日历年月信息栏
let p = document.querySelector('.calendar h1 p')
// 获取所有的单元格
let td = document.querySelectorAll('tbody td')
// 获取左右点击按钮
let previous = document.querySelector('.previous')
previous.innerHTML = '<'
let next = document.querySelector('.next')
// 日历数组函数,参数默认为0,传1返回下个月的所有天数数组，传-1返回上个月的所有天数数组
function getCalendarArr(num = 0) {
  // 获取当前时间
  let date = new Date()
  // 获取当前年份
  let year
  if (num >= 0) {
    year = date.getFullYear() + Math.floor((date.getMonth() + num) / 12)
  } else {
    let yearValue = date.getMonth() + num > 0 ? Math.floor((date.getMonth() + num) / 12) : Math.ceil(Math.abs((date.getMonth() + num) / 12))
    year = date.getFullYear() - yearValue
  }
  // 获取当前月份
  monthObj = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }
  let monthValue = (date.getMonth() + num) % 12
  let month = monthObj[monthValue]
  // 获取当前月的天数----------new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
  let thisMonthDay = new Date(year, monthValue + 1, 0).getDate()
  // 获取上个月的天数----------new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
  let prevMonthDay = new Date(year, monthValue, 0).getDate()
  // 获取这个月的1号是星期几
  let thisWeek = new Date(year, monthValue, 1).getDay()
  let thisArr = []
  for (let i = 0; i < thisWeek; i++) {
    // 将上个月的天数插进来
    thisArr.unshift(prevMonthDay - i)
  }
  for (let j = 1; j <= thisMonthDay; j++) {
    thisArr.push(j)
  }
  let surplus = 35 - thisArr.length
  for (let k = 1; k <= surplus; k++) {
    thisArr.push(k)
  }
  p.innerHTML = `${month} ${year}`
  let res = {
    resYear:year,
    resMonth:month,
    resDay:thisArr
  }
  return res
}
console.log(getCalendarArr(-12));
let RenderArray
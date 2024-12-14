// 渲染一个日历
// 把任何一年的任何一月的布局动态渲染到页面上
// 把2024年12月的布局动态渲染到页面上
// 1.获取11月有多少天
// 2.获取12月有多少天
// 3.7-(计算第一步+第二步)%7
// 4.将以上3步，分别生成html

function getDateOfMonth(year, month) {
  let dateInstance = new Date(year, month, 0)
  let dateCount = dateInstance.getDate()
  return dateCount;
}
function getDayOfMonthFirstDate(year, month) {
  let dateInstance = new Date(year, month - 1, 1)
  let day = dateInstance.getDay()
  return day;
}
// 创建日期单元格文档片段的方法
const PREV_TYPE = 'PREV'
const CURRENT_TYPE = 'CURRENT'
const NEXT_TYPE = 'NEXT'
const WEEK_DATE_COUNT = 7
function creatDateCellFragment(start, end, type) {
  // 文档碎片，用来承载很多标签，可以节约性能
  let fragment = document.createDocumentFragment()
  for (let i = start; i <= end; i++) {
    let calendarDateElement = document.createElement('td')
    calendarDateElement.innerText = i
    switch (type) {
      case PREV_TYPE:
        calendarDateElement.classList.add('falseClicktd')
        break;
      case CURRENT_TYPE:
        calendarDateElement.classList.add('trueClicktd')
        break;
      case NEXT_TYPE:
        calendarDateElement.classList.add('falseClicktd')
        break;
      default:
        break;
    }
    fragment.appendChild(calendarDateElement)
  }
  return fragment
}
function addElement(ele1, ele2) {
  var tbody = document.querySelector(`${ele1}`);
  for (var i = 0; i < ele2.children.length / WEEK_DATE_COUNT; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < WEEK_DATE_COUNT; j++) {
      var index = i * WEEK_DATE_COUNT + j;
      // console.log(index)
      // js的节点是唯一的，只允许出现一个父节点，
      // 把mainFragment的子节点添加到tr上，就会出现添加到tr一个，mainFragment的子节点就少一个
      // 所以必须用克隆
      tr.appendChild(ele2.children[index].cloneNode(true))
    }
    tbody.appendChild(tr);
  }
}
function creatCalendar(year, month) {
  let mainFragment = document.createDocumentFragment()
  let currentMonthDateCount = getDateOfMonth(year, month)
  let PrevMonthDateCount = getDateOfMonth(year, month - 1)
  let dayOfcurrentMonthFirstDate = getDayOfMonthFirstDate(year, month)
  let prevMonthDatePadding = dayOfcurrentMonthFirstDate
  let nextMonthDatePadding = WEEK_DATE_COUNT - (prevMonthDatePadding + currentMonthDateCount) % WEEK_DATE_COUNT
  console.log(prevMonthDatePadding, currentMonthDateCount, nextMonthDatePadding, PrevMonthDateCount);
  // 创建1号前需要补的日期单元格
  let prevMonthDatePaddingFragment = creatDateCellFragment(PrevMonthDateCount - prevMonthDatePadding + 1, PrevMonthDateCount, PREV_TYPE)
  let currentMonthDateFragment = creatDateCellFragment(1, currentMonthDateCount, CURRENT_TYPE)
  let nextMonthDatePaddingFragment = creatDateCellFragment(1, nextMonthDatePadding, NEXT_TYPE)
  mainFragment.appendChild(prevMonthDatePaddingFragment)
  mainFragment.appendChild(currentMonthDateFragment)
  mainFragment.appendChild(nextMonthDatePaddingFragment)
  // console.log(mainFragment.children)
  // 添加到tbody
  addElement('tbody', mainFragment)
}

creatCalendar(2024, 12)

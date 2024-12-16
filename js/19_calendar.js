(function (window, document) {
  // 渲染一个日历
  // 把任何一年的任何一月的布局动态渲染到页面上
  // 把2024年12月的布局动态渲染到页面上
  // 1.获取11月有多少天
  // 2.获取12月有多少天
  // 3.7-(计算第一步+第二步)%7
  // 4.将以上3步，分别生成html
  // 定义全局常量----------->
  const PREV_TYPE = 'PREV'
  const CURRENT_TYPE = 'CURRENT'
  const NEXT_TYPE = 'NEXT'
  const WEEK_DATE_COUNT = 7
  // 获取当前的年月日------->
  let nowTimeDate = new Date()
  let currentYear = nowTimeDate.getFullYear()
  let currentMonth = nowTimeDate.getMonth() + 1
  let currentDate = nowTimeDate.getDate()
  let visible = false
  let configSelected = null
  let calendarRoot = document.querySelector('.calendar')
  function hideCalendar() {
    visible = false
    calendarRoot.style.display = 'none'
  }
  function blockCalendar() {
    visible = true
    calendarRoot.style.display = 'block'
  }
  // 计算传入月份的天数
  // 在JavaScript中，如果日期设置为0，Date对象会自动回退到上个月的最后一天
  // 那么获取下个月的第0天，也就是当前月的最后一天，就知道了当前月的天数
  function getDateOfMonth(year, month) {
    // 下个月-->month+1-->因为js的月份是从0开始的-->比如说11就是12月-->所以month又要-1-->所以这里就直接传month+1-1=month
    // 例：获取7月的天数,7+1=8，但js的8是9月，所以这里直接传month,直接传7(不加1)，那么js就获取8月的第0天，也就是7月的最后一天，也就是总天数
    let dateInstance = new Date(year, month, 0)//(简而言之，下个月的第0天=这个月的最后一天=这个月的总天数)
    let dateCount = dateInstance.getDate()
    return dateCount;
  }
  // 获取当前月的第一天是星期几
  function getDayOfMonthFirstDate(year, month) {
    // js月份从0开始，因为是当前月，所以month-1
    let dateInstance = new Date(year, month - 1, 1)
    let day = dateInstance.getDay()
    return day;
  }
  // 更新年月
  function updateYearAndMonth(newYear, newMonth) {
    let titleValue = document.querySelector('.calendar h1 p')
    titleValue.innerText = `${newMonth} ${newYear}`
    currentYear = newYear
    currentMonth = newMonth
  }

  // 创建日期单元格文档片段的方法
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
          calendarDateElement.customCalendarInfo = {
            year: currentYear,
            month: currentMonth,
            date: i
          }
          console.dir(calendarDateElement);

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
  // 添加元素到页面中
  function addElement(ele1, ele2) {
    let tbody = document.querySelector(`${ele1}`);
    for (let i = 0; i < ele2.children.length / WEEK_DATE_COUNT; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < WEEK_DATE_COUNT; j++) {
        let index = i * WEEK_DATE_COUNT + j;
        // console.log(index)
        // js的节点是唯一的，只允许出现一个父节点，
        // 把mainFragment的子节点添加到tr上，就会出现添加到tr一个，mainFragment的子节点就少一个
        // 所以必须用克隆
        // ---------------!!!cloneNode不会克隆节点的方法,因此要在下面手动给克隆过去的元素添加方法
        let td = ele2.children[index].cloneNode(true)
        // 手动给克隆过去的元素添加方法
        td.customCalendarInfo = ele2.children[index].customCalendarInfo
        tr.appendChild(td)
        console.log(tr.children);

      }
      tbody.appendChild(tr);
    }
  }
  // 当前日期天数显示高亮-->背景黑色
  function clickEvent(year, month) {
    let td = document.querySelectorAll('td')
    for (let i = 0; i < td.length; i++) {
      if (td[i].innerText === currentDate.toString() && year === nowTimeDate.getFullYear() && month === nowTimeDate.getMonth() + 1) {
        td[i].classList.add('thisDateBgc', 'clickBlack')
      }
    }
  }
  function creatCalendar(year, month) {
    let tbody = document.querySelector('tbody')
    let mainFragment = document.createDocumentFragment()
    let currentMonthDateCount = getDateOfMonth(year, month)
    let PrevMonthDateCount = getDateOfMonth(year, month - 1)
    let dayOfcurrentMonthFirstDate = getDayOfMonthFirstDate(year, month)
    let prevMonthDatePadding = dayOfcurrentMonthFirstDate
    let nextMonthDatePadding = WEEK_DATE_COUNT - (prevMonthDatePadding + currentMonthDateCount) % WEEK_DATE_COUNT
    if (nextMonthDatePadding === 7) nextMonthDatePadding = 0
    // 1号前上个月需要补的日期单元格
    let prevMonthDatePaddingFragment = creatDateCellFragment(PrevMonthDateCount - prevMonthDatePadding + 1, PrevMonthDateCount, PREV_TYPE)
    // 这个月需要的日期单元格
    let currentMonthDateFragment = creatDateCellFragment(1, currentMonthDateCount, CURRENT_TYPE)
    // 下个月需要补的日期单元格
    let nextMonthDatePaddingFragment = creatDateCellFragment(1, nextMonthDatePadding, NEXT_TYPE)
    // 添加到文档碎片上(好处：先不操作DOM元素,加到文档碎片上，后面一次性插进DOM中，节约了性能)
    mainFragment.appendChild(prevMonthDatePaddingFragment)
    mainFragment.appendChild(currentMonthDateFragment)
    mainFragment.appendChild(nextMonthDatePaddingFragment)
    // console.log(mainFragment.children[0].customCalendarInfo);//{year: 2024, month: 12, date: 1}此时还在

    // 添加到tbody
    tbody.innerHTML = ''
    addElement('tbody', mainFragment)
    console.log(tbody.children[0].children);//此时对象没了

    // 点击高亮函数
    clickEvent(year, month)
  }

  // 初始化年月
  function bindEvent() {
    // 先初始化页面，显示当前的那一页日历
    updateYearAndMonth(currentYear, currentMonth)
    creatCalendar(currentYear, currentMonth)
    // -->上面创建全局的currentMonth时，定的规则是现实的当前月，加了1，在这里js中，要减回来
    let dateInstance = new Date(currentYear, currentMonth - 1)
    // 给整个日历绑定点击事件，利用事件冒泡，给左右切换按钮绑定点击事件
    calendarRoot.addEventListener('click', function (e) {
      if (e.target.className === 'previous') {
        // setMonth方法用来改变当前月份-1,不用管年份,js对象会帮你处理好,2024年-2月自动处理为2023年10月
        dateInstance.setMonth(dateInstance.getMonth() - 1)
        currentYear = dateInstance.getFullYear()
        currentMonth = dateInstance.getMonth() + 1
        // 调用渲染日历表格日期函数
        creatCalendar(currentYear, currentMonth)
        // 调用渲染日历表头年月函数
        updateYearAndMonth(currentYear, currentMonth)
      }
      if (e.target.className === 'next') {
        dateInstance.setMonth(dateInstance.getMonth() + 1)
        currentYear = dateInstance.getFullYear()
        currentMonth = dateInstance.getMonth() + 1
        creatCalendar(currentYear, currentMonth)
        updateYearAndMonth(currentYear, currentMonth)
      }
      // 判断点击的是不是可以点击的日子
      if (e.target.className.indexOf('trueClicktd') !== -1) {
        // 点击之后，如果现在时间在当前的页面上，把黑色背景类名删掉
        if (document.querySelector('.clickBlack') !== null) document.querySelector('.clickBlack').classList.remove('clickBlack')
        // 点击的那个日子加上黑色背景
        e.target.classList.add('clickBlack')
        // console.log(e.target.customCalendarInfo);
        // selected(e.target.customCalendarInfo)
        if (typeof configSelected === 'function') {
          configSelected(e.target.customCalendarInfo)
        }
      }
    })
  }
  window.calendar = {
    getVisible: function () {
      return visible
    },
    hide: hideCalendar,
    show: blockCalendar,
    init: function (config) {
      configSelected = config.selected
      bindEvent()
    }
  }
})(window, document)
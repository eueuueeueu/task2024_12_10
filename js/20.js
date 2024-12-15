let inputAllElement = document.querySelectorAll('input')
let index = 0
let regNumber = /\d/
window.addEventListener('keyup', function (e) {
  if (e.key === 'Backspace' && index !== 0) {
    inputAllElement[index].value = ''
    index--
    inputAllElement[index].focus()
  }
  if (!regNumber.test(parseInt(e.key))) {
    inputAllElement[index].value = ''
  } else {
    if (inputAllElement[index].value !== '' && index !== inputAllElement.length - 1) index++
    inputAllElement[index].focus()
  }


})

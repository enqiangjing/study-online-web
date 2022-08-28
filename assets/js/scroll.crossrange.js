/**
 * ScrollCross
 */

class ScrollCross {
  constructor(ele) {
    this.scrollDiv = ele
    this.scrollCross()
  }

  scrollCross() {
    this.scrollDiv.addEventListener('DOMMouseScroll', this.handler, false)
    this.scrollDiv.addEventListener('mousewheel', this.handler, false)
  }

  handler(event) {
    let detail = event.wheelDelta || event.detail
    let moveForwardStep = 1
    let moveBackStep = -1
    let step = 0
    if (detail > 0) {
      step = moveForwardStep * 100
    } else {
      step = moveBackStep * 100
    }
    this.scrollLeft += step
    event.preventDefault()
  }

  explainText() {
    console.log('选集位置，设置鼠标滚轮横向滚动!')
  }
}

export { ScrollCross }

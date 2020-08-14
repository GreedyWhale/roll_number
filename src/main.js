/*
 * @Author: MADAO
 * @Date: 2020-08-13 11:21:28
 * @LastEditors: MADAO
 * @LastEditTime: 2020-08-14 14:12:06
 * @Description: main.js
 */
const app = {
  counts: [],
  template: '',
  columns: null,
  mountElement: null,

  setColumns (counts) {
    let columns = ''
    counts.forEach(value => {
      columns += `
        <div class="roll-number__viewport">
          ${
            Number.isNaN(parseInt(value, 10))
              ? '<ul><li>' + value + '</li></ul>'
              : '<ul>' + this.template + '</ul>'
          }
        </div>`
    })
    this.mountElement.innerHTML = `<div class="roll-number">${columns}</div>`
  },

  startRolling () {
    const { height } = document.querySelector('.roll-number__viewport > ul > li').getBoundingClientRect()
    this.counts.forEach((value, index) => {
      if (Number.isNaN(parseInt(value, 10))) {
        return
      }
      const translateY = `-${parseInt(value, 10) * height}px`
      this.columns[index].style = `transform: translateY(${translateY})`
    })
  },

  changeCounts (counts) {
    const newCounts = (counts).toLocaleString().split('')
    if (newCounts.length !== this.counts.length) {
      this.setColumns(newCounts)
      this.columns = document.querySelectorAll('.roll-number__viewport > ul')
    }
    this.counts = newCounts
    this.startRolling()
  },

  init (mountElement, counts) {
    Array.from({ length: 10 }).forEach((value, index) => {
      this.template += `<li>${index}</li>`
    })
    this.mountElement = mountElement
    this.changeCounts(counts)
  }
}
app.init(window.app, 100000000)
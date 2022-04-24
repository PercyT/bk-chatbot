/**
 * @file main utils
 * @author neolei <neolei@tencent.com>
 */
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function renderShortcuts () {
  return [
    {
      text: '近24小时',
      value () {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24)
        return [start, end]
      },
      onClick: picker => {
        console.error(picker)
      }
    },
    {
      text: '近7天',
      value () {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      }
    },
    {
      text: '近15天',
      value () {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
        return [start, end]
      }
    },
    {
      text: '近30天',
      value () {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      }
    }
  ]
}

export function generateTimeRange (s, e, amount) {
  const sTimestamp = Date.parse(s)
  const eTimestamp = Date.parse(e)
  const timeRange = eTimestamp - sTimestamp
  const timeGap = timeRange / amount
  const timeData = []

  for (let i = 0; i < amount; i++) {
    // const front = formatDate(new Date(sTimestamp + timeGap * i), fmt)
    const front = sTimestamp + timeGap * i
    const rear = sTimestamp + timeGap * (i + 1)
    timeData.push([front, rear])
  }

  return timeData
}

/**
 * @file main utils
 * @author neolei <neolei@tencent.com>
 */

export function handleTablePageChange (page, obj, tableName) {
  obj[tableName].pagination.current = page
  if (obj[tableName].searchData.query.length > 0 || obj[tableName].searchData.query !== '') {
    obj[tableName].data = obj[tableName].searchData.result.slice((page - 1) * obj[tableName].pagination.limit, page * obj[tableName].pagination.limit)
  } else {
    obj[tableName].data = obj[tableName].raw.slice((page - 1) * obj[tableName].pagination.limit, page * obj[tableName].pagination.limit)
  }
}

export function handleTablePageLimitChange (limit, obj, tableName) {
  obj[tableName].pagination.current = 1
  obj[tableName].pagination.limit = limit
  if (obj[tableName].searchData.query.length > 0 || obj[tableName].searchData.query !== '') {
    obj[tableName].data = obj[tableName].searchData.result.slice(0, limit)
  } else {
    obj[tableName].data = obj[tableName].raw.slice(0, limit)
  }
}

export function handleTableSelectionChange (selection, obj, tableName) {
  obj[tableName].multipleSelection = selection
}

export function handleTagSearchResult (obj, tableName) {
  obj[tableName].searchData.result = []
  for (let i = 0; i < obj[tableName].raw.length; i++) {
    const raw = obj[tableName].raw[i]
    let flag = true
    for (let j = 0; j < obj[tableName].searchData.query.length; j++) {
      const query = obj[tableName].searchData.query[j]
      const queryList = query.values.map(function (item, index, input) {
        return item.id
      })

      if (queryList.indexOf(raw[query.prop]) === -1) {
        flag = false
        break
      }
    }

    if (flag) {
      obj[tableName].searchData.result.push(raw)
    }
  }

  obj[tableName].pagination.count = obj[tableName].searchData.result.length
  obj[tableName].data = obj[tableName].searchData.result.slice(0, obj[tableName].pagination.limit)
  obj[tableName].pagination.current = 1
}

export function handleFuzzySearchResult (obj, tableName) {
  if (obj[tableName].searchData.query === '') {
    obj[tableName].pagination.count = obj[tableName].raw.length
    obj[tableName].data = obj[tableName].raw.slice(0, obj[tableName].pagination.limit)
    obj[tableName].pagination.current = 1
    return
  }

  obj[tableName].searchData.result = []
  for (let i = 0; i < obj[tableName].raw.length; i++) {
    const raw = obj[tableName].raw[i]
    for (const j in raw) {
      if ((raw[j] + '').search(obj[tableName].searchData.query) !== -1) {
        obj[tableName].searchData.result.push(raw)
      }
    }
  }

  obj[tableName].pagination.count = obj[tableName].searchData.result.length
  obj[tableName].data = obj[tableName].searchData.result.slice(0, obj[tableName].pagination.limit)
  obj[tableName].pagination.current = 1
}

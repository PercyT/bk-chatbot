import http from '@/api'
import { messageError, messageSuccess } from '@/common/bkmagic'

/**
 * @file main utils
 * @author neolei <neolei@tencent.com>
 */

// const methodsWithData = ['post', 'put', 'patch']

export async function submitRequest (mockUrl, params, dialog, obj, callback, method = 'post') {
  obj[dialog].loading = true
  try {
    const response = await http[method](mockUrl, params, {})
    if (response.result) {
      if (callback && typeof callback === 'function') {
        callback(obj)
      }
      messageSuccess(obj[dialog].msg)
    } else {
      messageError(response.message)
    }
  } catch (e) {
    if (e.hasOwnProperty('message') && e.message === 'OK') {
      if (callback && typeof callback === 'function') {
        callback(obj)
      }
      messageSuccess(obj[dialog].msg)
    }
  } finally {
    obj[dialog].loading = false
    obj[dialog].visible = false
  }
}

export function dialogOpen (obj, dialogName, callback) {
  if (callback && typeof callback === 'function') {
    callback(obj)
  }

  obj[dialogName].visible = true
}

export async function dialogValidate (obj, dialogName, formRef, callback) {
  if (callback && typeof callback === 'function') {
    callback(obj)
  }

  if (formRef !== '') {
    const result = await obj.$refs[formRef].validate().then(res => {
      return true
    }).catch(res => {
      return false
    })

    return result
  }

  return true
}

export async function dialogConfirm (obj, dialogName, formRef, method = 'post') {
  if (formRef !== '') {
    const result = await dialogValidate(obj, dialogName, formRef, null)
    if (!result) {
      return
    }
  }

  if (obj[dialogName].dataCallback && typeof obj[dialogName].dataCallback === 'function') {
    obj[dialogName].dataCallback(obj)
  }

  await submitRequest(obj[dialogName].mockUrl, obj[dialogName].params, dialogName, obj, obj[dialogName].submitCallback, method)
}

export function dialogClean (obj, dialogName) {
  if (obj[dialogName].tearCallback && typeof obj[dialogName].tearCallback === 'function') {
    obj[dialogName].tearCallback(obj)
  }
  obj.$refs[dialogName + 'Ref'].clearError()
}

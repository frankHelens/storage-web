import { isArray, cloneDeep } from 'lodash'
import md5 from 'md5'

export const URL = process.env.URL
export const API = process.env.API
export const VERSION = process.env.VERSION
export const TITLE = process.env.TITLE

// export const Env = process.prodEnv.URL
export function encrypt (password) {
  return md5(password)
}

export function getApi () {
  return URL + API
}

export function dataTypeFunc (value, type) {
  if (value === undefined || typeof value === type) {
    return value
  }
  if (type === 'number') {
    return Number(value)
  }
  if (type === 'boolean') {
    return Boolean(value)
  }
  if (type === 'string') {
    return String(value)
  }
  return value
}
export function treeFormat (list, key = 'value', parentKey = 'parentId', childKey = 'children') {
  let sNodes = cloneDeep(list)
  let i, j, k, l, len, len1, r, tmpMap
  if (isArray(sNodes)) {
    r = []
    tmpMap = []
    for (k = 0, len = sNodes.length; k < len; k++) {
      i = sNodes[k]
      i.text = i.label
      tmpMap[i[key]] = i
    }
    for (l = 0, len1 = sNodes.length; l < len1; l++) {
      j = sNodes[l]
      if (tmpMap[j[parentKey]] && j[key] !== j[parentKey]) {
        if (!tmpMap[j[parentKey]][childKey]) {
          tmpMap[j[parentKey]][childKey] = []
        }
        tmpMap[j[parentKey]][childKey].push(j)
      } else {
        r.push(j)
      }
    }
    return r
  } else {
    return [sNodes]
  }
}

export function treeFirstLeaf (tree) {
  if (tree[0].children) {
    return treeFirstLeaf(tree[0].children)
  }
  return tree[0]
}

// export function treeTableFormat (tree, key = 'id', parentKey = 'pid', childKey = 'children') {
//   let r = []
//   let sNodes = cloneDeep(tree)
//   sNodes.map(item => {
//     r.push(item)
//     r = [
//       ...treeTableFormat(item.children)
//     ]
//   })
//   return r
  // let i, j, k, l, len, len1, r, tmpMap
  // if (isArray(sNodes)) {
  //   r = []
  //   tmpMap = []
  //   for (k = 0, len = sNodes.length; k < len; k++) {
  //     i = sNodes[k]
  //     i.text = i.label
  //     tmpMap[i[key]] = i
  //   }
  //   for (l = 0, len1 = sNodes.length; l < len1; l++) {
  //     j = sNodes[l]
  //     if (tmpMap[j[parentKey]] && j[key] !== j[parentKey]) {
  //       if (!tmpMap[j[parentKey]][childKey]) {
  //         tmpMap[j[parentKey]][childKey] = []
  //       }
  //       tmpMap[j[parentKey]][childKey].push(j)
  //     } else {
  //       r.push(j)
  //     }
  //   }
  //   return r
  // } else {
  //   return [sNodes]
  // }
// }

export function rmb (num) {
  const numArray = num.split('.')
  const numList = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const radiceList = ['', '拾', '佰', '仟']
  const unitList = ['', '万', '亿', '兆']
  const decList = ['角', '分']
  const num1 = numArray[0].split('').reverse().map((num, index) => {
    const unit = unitList[index / 4] || ''
    return numList[Number(num)] + radiceList[index % 4] + unit
  }).reverse()
  const num2 = numArray[1] === '00' ? ['整'] : numArray[1].split('').map((num, index) => numList[Number(num)] + decList[index])
  return [
    ...num1,
    '元',
    ...num2
  ].join('')
}

export function getCallerName (id, data) {
  return data.stepInstances ? data.stepInstances.find(item => item.stepDefineId === id).callerName : ''
}

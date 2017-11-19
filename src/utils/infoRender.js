import moment from 'moment'
import { URL } from '@/utils/common'

export function selectRender (data, options) {
  const option = options.find(option => option.value === data)
  return option ? option.label : ''
}

export function multiselectRender (data, options) {
  return data.map(value => {
    const item = options.find(option => option.value === value)
    return item ? item.label : ''
  }).join(',')
}

export function timeRender (data, dateType = 'YYYY-MM-DD') {
  return data ? moment(data).format(dateType) : ''
}

export function customRender (data, column, full, index) {
  if (column.file) {
    return data ? data.split(',').map(item => URL + '/' + item) : ''
  } else {
    return column.customRender(data, full, column, index)
  }
}

export function fileRender (data, column, full, index) {
  return data
}

export function itemRender (data, column, full, index) {
  if (data === undefined && column.type !== 'custom') {
    return ''
  }
  if (!column.type) {
    return data
  }
  if (column.type === 'select') {
    return selectRender(data, column.options)
  } else if (column.type === 'multiselect') {
    return multiselectRender(data, column.options)
  } else if (column.type === 'time') {
    return timeRender(data, column.dateType || 'YYYY-MM-DD HH:mm:ss')
  } else if (column.type === 'custom') {
    return customRender(data, column, full, index)
  // } else if (column.type === 'file') {
  //   return fileRender(data, column, full, index)
  } else {
    return data
  }
}

export function infoRender (data, column, full, index) {
  const result = itemRender(data, column, full, index)
  return result === '' ? '-' : result
}

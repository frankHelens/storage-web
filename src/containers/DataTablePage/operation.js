import { cloneDeep } from 'lodash'

import { fetchDelete } from '@/utils/api'

export const operationCreate = {
  label: '新增',
  name: 'create',
  icon: 'plus',
  func: operationEventCreate
}

export const operationUpdate = {
  label: '编辑',
  name: 'update',
  icon: 'ios-compose',
  func: operationEventUpdate
}

export const operationDelete = {
  label: '删除',
  name: 'delete',
  icon: 'ios-trash',
  func: operationEventDelete
}

export function operationEventCreate (data, props) {
  const { table } = props
  const labelName = table.labelName ? '【' + data[table.labelName] + '】' : ''
  table.createDialogLabel = '新增' + labelName + '子' + table.label
  table.createDialogFormValues = table.createFormValues
  table.createDialogFormValues[table.pid] = data[table.cid]
  table.createDialogVisible = true
}

export function operationEventUpdate (data, props) {
  const { table } = props
  const labelName = table.labelName ? '【' + data[table.labelName] + '】' : ''
  table.updateDialogLabel = '编辑' + table.label + labelName
  table.updateDialogVisible = true
  table.updateDialogFormValues = cloneDeep(data)
}

export function operationEventDelete (data, props) {
  const { table } = props
  table.$confirm('删除' + table.label + '【' + data[table.labelName] + '】, 是否继续?', '提示', {
    confirmButtonText: '删除',
    confirmButtonClass: 'el-button el-button--danger',
    cancelButtonText: '取消'
  }).then(() => {
    fetchDelete({
      resource: table.resource,
      id: data.id
    }).then(data => {
      if (data) {
        table.getData()
        table.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    })
  }).catch(() => {})
}

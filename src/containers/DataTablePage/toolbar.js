import { fetchBatchDelete } from '@/utils/api'

export const toolbarCreate = {
  label: '新增',
  name: 'create',
  icon: 'plus',
  func: toolbarEventCreate
}
export const toolbarExport = {
  label: '导出',
  name: 'export',
  icon: 'download',
  func: toolbarEventExport
}
export const toolbarPrint = {
  label: '打印',
  name: 'print',
  icon: 'print',
  func: toolbarEventPrint
}

export const toolbarBack = {
  label: '返回',
  name: 'back',
  icon: 'angle-double-left',
  func: toolbarBackEvent
}

export const toolbarDelete = {
  label: '删除',
  name: 'delete',
  icon: 'ios-trash',
  disabled: true,
  func: toolbarDeleteEvent
}

export function toolbarBackEvent (data, props) {
  const { table } = props
  table.$router.go(-1)
}

export function toolbarDeleteEvent (data, props) {
  const { table } = props
  table.$confirm('确认删除所选数据?', '提示', {
    confirmButtonText: '删除',
    confirmButtonClass: 'el-button el-button--danger',
    cancelButtonText: '取消'
  }).then(() => {
    fetchBatchDelete({
      resource: table.resource,
      ids: table.deleteList
    }).then(data => {
      if (data) {
        table.getData()
        table.$message({
          type: 'success',
          message: data.message
        })
      }
    })
  }).catch(() => {})
}

export function toolbarEventCreate (data, props) {
  const { table } = props
  let formValues = {}
  table.createDialogLabel = '新增' + table.label
  table.createDialogVisible = true
  // 筛选掉parentId
  Object.keys(table.createFormValues).map(key => {
    if (key !== 'parentId') {
      formValues[key] = table.createFormValues[key]
    }
  })
  table.createDialogFormValues = formValues
}

export function toolbarEventPrint (data, props) {
  console.log(data, props)
}

export function toolbarEventExport (data, props) {
  console.log(data, props)
}

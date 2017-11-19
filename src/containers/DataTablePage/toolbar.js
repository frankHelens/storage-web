import { getLodop } from '@/utils/LodopFuncs'
import moment from 'moment'
import { getRealname } from '@/utils/auth'
import tableExport from 'table-export'
import { MessageBox } from 'element-ui'
import { fetchList, fetchBatchDelete } from '@/utils/api'
import { selectRender, multiselectRender, timeRender } from '@/utils/infoRender'

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
  dataTable(props, false, printEvent)
}

export function toolbarEventExport (data, props) {
  dataTable(props, true, exportEvent)
}

/* 获取数据（props, 是否为导出，回调） */
function dataTable (props, isExport, callbackFunc) {
  fetchList({
    resource: props.table.resource,
    orderBy: props.table.orderBy.map(item => item.name + '|' + item.sort).join(';'),
    filterBy: props.table.filterBy.map(item => item.name + '|' + item.type + '|' + item.value).join(';'),
    pageSize: 999999,
    pageIndex: 1
  })
  .then((data) => {
    const title = props.title || props.table.title
    if (props.detail) {
      if (isExport) {
        callbackFunc(exportDetail(props, renderTable(props, data.data), title), title)
      } else {
        callbackFunc(tableDetail(props, renderTable(props, data.data)), title)
      }
    } else {
      // 给所有值添加序号
      const renderData = data.data.map((item, index) => {
        return {
          ...item,
          serial: index + 1
        }
      })
      callbackFunc(renderTable(props, renderData), title, true)
    }
  }).catch(() => {
  })
}

/* 生成导出详情dom */
function exportDetail (props, renderTable, title) {
  const infoList = props.refs.info.infoList
  const formValues = props.refs.info.formValues
  const columns = props.refs.info.columns
  const relation = props.refs.info.relationList
  let tr = ''
  infoList.map((info, index) => {
    const value = getValue(formValues[info], columns[info], relation[info])
    if ((index) % 3 === 0) {
      tr += `<tr><td>${columns[info].label}</td><td>${value}</td><td></td>`
    } else {
      tr += `<td>${columns[info].label}</td><td>${value}</td><td></td>`
    }
  })
  // 获取列表的dom
  const filterTable = renderTable.html.split('<table id="exportData">')[1].split('</table>')[0]
  const table = `<table id="exportData">
  <thead><tr><td></td><td></td><td></td><td>${title}</td></tr>${tr}<tr><td></td></tr></thead>
  ${filterTable}
  </table>`
  return {
    html: table
  }
}

/* 生成打印详情dom */
function tableDetail (props, renderTable) {
  const dom = props.refs.info.$el.cloneNode(true)
  dom.querySelectorAll('.el-row>div:nth-last-child(1)')[0].setAttribute('class', 'last-style')
  const html = dom.innerHTML
  const css = `
    <style>
      .clear: {
        clear: both;
      }
      .important-info{
        width: 100%;
        margin: 10px auto;
        overflow:hidden;
        _zoom:1;
      }
      .important-info .el-col{
        width:33.3%;
        line-height: 30px;
        float:left;
      }
      .last-style{
        width: 95%;
        line-height: 30px;
        clear:left;
      }
    </style>
  `
  return {
    html: html + renderTable.html,
    css: css + renderTable.css
  }
}

/* 生成tabledom */
function renderTable (props, data) {
  const _this = props.table
  // 设置打印列表
  const printList = _this.printList.length ? _this.printList : _this.tableInitList
  let thead = ''
  printList.map((val) => {
    thead += `<td width="${_this.columns[val].printWidth || _this.columns[val].width}">${_this.columns[val].label}</td>`
  })
  // 表内容
  let tbody = ''
  data.map((data, key) => {
    let printValue = ''
    printList.map((val) => {
      const value = getValue(data[val], _this.columns[val], _this.relationList[val])
      // 关联relation
      printValue += `<td>${value || '-'}</td>`
    })
    tbody += `<tr>${printValue}</tr>`
  })
  // 表格
  const table = `<table id="exportData">
  <thead><tr>${thead}</tr></thead>
  <tbody>${tbody}</tbody>
  </table>`
  const css = `<style>
    table{width:95%;border-spacing:0;border-collapse:collapse;box-sizing:border-box;border: 1px solid #000;}
    tr{height:45px;}
    tr td,tr th{background-color:#fff;border:1px solid #000;text-align:center;}
    td{
      word-wrap:break-word;
      word-break:break-all;
    }
  </style>`
  return {
    html: table,
    css: css
  }
}

// 打印事件
export function printEvent (obj, title, isTable) {
  const { html, css } = obj
  // 初始化打印
  const LODOP = getLodop()
  // props.toolbar.print.direction ||
  const direction = 0 // 打印方向
  const footer = `<p><span>打印人：${basic().userName}</span><span>打印日期：${basic().nowDate}</span></p>`
  // 设置页面
  LODOP.SET_PRINT_PAGESIZE(direction, '100%', '100%', 'A4')
  // 横向时的正向显示
  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1)
  // 底图上有模拟走纸板的条纹线, 可以隐藏该条线
  LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', 1)
  // 设置适宽
  LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', 'Auto-Width')
  // 标题
  LODOP.ADD_PRINT_HTM(26, 0, '100%', 100, basic().titleStyle + `<h1>${title}</h1>`)
  LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
  // // 内容
  if (isTable) {
    LODOP.ADD_PRINT_TABLE(70, 20, '100%', '85%', css + html)
  } else {
    LODOP.ADD_PRINT_HTM(70, 20, '100%', '85%', css + html)
  }
  // 打印人 跟 时间
  LODOP.ADD_PRINT_HTM('95%', '5%', '80%', 100, basic().footerStyle + footer)
  LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
  // 分页
  LODOP.ADD_PRINT_HTM('95%', '75%', 300, 100, '总页号：<font color="#0000ff" format="0" style="color:#000;"><span tdata="pageNO">第##页</span>/<span tdata="pageCount">共##页</span></font>')
  LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
  /* 打印事件 */
  LODOP.PREVIEW()
}

// 导出事件
export function exportEvent (renderTable, title) {
  const { html } = renderTable
  MessageBox.confirm('确定导出数据?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // dom插入到body
    insertDom(parseDom(html))
    tableExport('exportData', title, 'csv')
    removeDom(parseDom(html))
  }).catch((err) => {
    console.log(err)
  })
}

// 获取value数据
function getValue (val, columns, relation) {
  let value = ''
  if (val) {
    if (relation) {
      if (columns.type === 'multiselect') {
        value = multiselectRender(val, columns.options)
      } else {
        value = selectRender(val, columns.options)
      }
    } else if (columns.type === 'time') {
      value = timeRender(val, columns.dateType)
    } else {
      value = val
    }
  } else if (columns.label === '序号') {
    console.log(columns)
    value = val
  } else {
    value = '-'
  }
  return value
}

// 获取基本信息
function basic () {
  return {
    userName: getRealname(),
    nowDate: moment().format('YYYY年MM月DD日'),
    titleStyle: `<style>h1{text-align:center;}</style>`,
    footerStyle: `<style>p span{margin-right:20px;}</style>`
  }
}

// 将dom字符串转成dom
function parseDom (arg) {
  let objE = document.createElement('div')
  objE.innerHTML = arg
  return objE.childNodes
}

/* 插入dom */
function insertDom (dom) {
  document.body.appendChild(dom[0])
}
/* 移除dom */
function removeDom (dom) {
  const exportData = document.getElementById('exportData')
  exportData.style.display = 'none'
  document.body.removeChild(exportData)
}

<template>
<div class="main">
  <SmartForm
    class="toolbar"
    :inline="true"
    :formList="formList"
    :values="values"
    :columns="columns"
    :buttonList="buttonList"
    :formLabelWidth="200"/>
  <DataTable
    :isLoading="isLoading"
    :tableInitList="tableInitList"
    :columns="columns"
    :tableData="tableData">
  </DataTable>
</div>
</template>

<script>
import SmartForm from '@/components/SmartForm'
import DataTable from '@/components/DataTable'
export default {
  components: {
    SmartForm,
    DataTable
  },
  data () {
    const getShortcutsTime = (day) => {
      const setTime = (time) => {
        return this.$moment(time).format()
      }
      const timeStamp = Number(this.$moment().format('x'))
      const start = timeStamp - 3600 * 1000 * 24 * day
      console.log(setTime(start))
      return [setTime(start), setTime(timeStamp)]
    }
    const currentMonth = [this.$moment().startOf('month').format(), this.$moment().endOf('month').format()]
    return {
      formList: ['timeRange'],
      values: {
        // timeRange: currentMonth
      },
      columns: {
        timeRange: {
          label: '时间',
          form: {
            type: 'daterange',
            dateStyle: {
              width: '200px'
            },
            placement: 'bottom-start',
            options: {
              shortcuts: [{
                text: '当月',
                value () {
                  return currentMonth
                }
              }, {
                text: '最近一周',
                value () {
                  return getShortcutsTime(7)
                }
              }, {
                text: '最近一月',
                value () {
                  return getShortcutsTime(30)
                }
              }]
            }
          }
        },
        productCode: {
          label: '商品编号',
          form: {
            type: 'input'
          }
        },
        deliveryNum: {
          label: '出库数量'
          // width: 200
        },
        deliveryPrice: {
          label: '出库金额'
          // width: 200
        },
        enterNum: {
          label: '入库数量'
          // width: 200
        },
        productId: {
          label: '商品id'
        }
      },
      buttonList: [{
        name: 'submit',
        label: '查询',
        func: ({timeRange}) => {
          this.isLoading = true
          if (timeRange) {
            this.$get({
              url: 'stat',
              params: {
                startTime: timeRange.start,
                endTime: timeRange.end
              }
            })
            .then(data => {
              this.tableData = data.data
              this.isLoading = false
            })
          }
        }
      }],
      isLoading: false,
      tableData: [],
      tableInitList: ['deliveryNum', 'deliveryPrice', 'enterNum', 'productId']
    }
  }
}
</script>

<style lang="sass" scoped>
</style>

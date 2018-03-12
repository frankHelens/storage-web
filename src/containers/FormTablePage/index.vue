<template lang="pug">
  .form-table-main(v-if="hasData")
    SmartForm(
      inline
      :formList="formList"
      :columns="columnsList"
      :values="values"
      :buttonList="buttonList")
    FormTable(
      :tableData="tableData"
      :tableList="tableList"
      :columns="formTableColumns")
</template>

<script>
import SmartForm from '@/components/SmartForm'
import FormTable from '@/components/FormTable'
import { cloneDeep } from 'lodash'
import { fetch } from '@/utils/api'

export default {
  components: {
    SmartForm,
    FormTable
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default: () => []
    },
    resource: {
      type: String,
      default: ''
    },
    submitResource: {
      type: String,
      default: ''
    },
    formList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => {}
    },
    values: {
      type: Object,
      default: () => {}
    },
    buttonList: {
      type: Array,
      default: () => [{
        name: 'submit',
        label: '提交',
        func: (data, props) => {
          const { $parent } = props.el
          $parent.$post({
            url: $parent.submitResource,
            data: {
              base: data,
              tableData: [{
                productId: 100,
                enterNum: 200,
                discount: 100,
                remark: '这个是单个的商品价格1'
              }]
            }
          })
          .then(data => {
            if (data) {
              $parent.$message({
                message: '添加成功！',
                type: 'success'
              })
              $parent.$router.push('/manage/enterStock')
            }
          })
        }
      }]
    },
    formTableColumns: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    this.getRelation()
  },
  data () {
    const columnsList = cloneDeep(this.columns)
    const columnsKeys = Object.keys(columnsList)
    const relationKeys = columnsKeys.filter(key => columnsList[key].relation).map(key => columnsList[key].relation)
    return {
      relationKeys: relationKeys,
      columnsList: columnsList,
      hasData: false,
      createList: ['productName']
    }
  },
  methods: {
    getRelation () {
      this.hasData = false
      fetch({
        url: 'relation',
        params: {
          relationList: this.relationKeys.join(',')
        }
      })
      .then((data) => {
        Object.keys(this.columnsList).map(key => {
          const relation = this.columnsList[key].relation
          if (data[relation]) {
            this.columnsList[key].options = [...this.columnsList[key].optionsInit || [], ...data[relation]].map(option => {
              const label = option[this.columnsList[key].labelName || 'label']
              return {
                value: option.value !== undefined ? option.value : option.id,
                label,
                ...option
              }
            })
          }
        })
        this.$emit('getRelation', this.columnsList)
        this.hasData = true
        // this.getData()
      }).catch(() => {
      })
    }
  }
}
</script>

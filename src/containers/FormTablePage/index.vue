<template lang="pug">
  .Detail
    SmartForm(
      :formList="formList"
      :columns="columns"
      :values="values"
      :buttonList="buttonList"
    )
</template>

<script>
import SmartForm from '@/components/SmartForm'
import { cloneDeep } from 'lodash'
import { fetch } from '@/utils/api'

export default {
  components: {
    SmartForm
  },
  props: {
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
        func: (data) => {
          console.log(this.submitResource)
          console.log(data)
        }
      }]
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
      relationKeys: relationKeys
    }
  },
  getRelation () {
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
            // const subtext = pinyinInitial(label)
            return {
              value: option.value !== undefined ? option.value : option.id,
              label,
              // subtext,
              ...option
            }
          })
        }
      })
      this.$emit('getRelation', this.columnsList)
      // this.getData()
    }).catch(() => {
    })
  }
}
</script>

<template>
  <div @keyup.enter="formEnter">
    <el-form
      v-if="isMounted"
      ref="form"
      :inline="inline"
      :model="formValues"
      :rules="formRules"
      :label-position="labelPosition"
      :label-width="labelWidth">
      <el-row v-if="!inline" :gutter="gutter">
        <el-col
          v-for="(columnName,index) in formList"
          :key="columnName"
          :span="columns[columnName].form.size || 24">
          <smart-form-item
            :columnName="columnName"
            :column="columns[columnName]"
            :value="formValues[columnName]"
            :values="formValues"
            @changeFormValue="changeFormValue"
          >
          </smart-form-item>
        </el-col>
      </el-row>
      <smart-form-item
        v-else
        v-for="(columnName,index) in formList"
        :key="columnName"
        :columnName="columnName"
        :column="columns[columnName]"
        :value="formValues[columnName]"
        :values="formValues"
        @changeFormValue="changeFormValue"
      >
      </smart-form-item>
      <el-form-item>
        <button-list
         :buttonList="formButtonList"
         :data="formValues"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { treeFormat, treeFirstLeaf } from '@/utils/common'
import { cloneDeep } from 'lodash'
import SmartFormItem from './SmartFormItem'
import ButtonList from '@/components/ButtonList'

export default {
  name: 'SmartForm',
  components: {
    SmartFormItem,
    ButtonList
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    formList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => ({})
    },
    values: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formLabelWidth: {
      type: Number,
      default: 100
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    formEnterIndex: {
      type: Number,
      default: 0
    },
    buttonList: {
      type: Array,
      default: () => []
    },
    gutter: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isMounted: false,
      labelWidth: this.inline ? null : this.formLabelWidth + 'px',
      formValues: cloneDeep(this.values),
      formRules: [],
      formButtonList: this.buttonList.map(button => {
        return {
          ...button,
          funcProps: {
            ...button.funcProps,
            el: this
          },
          func: (data, props, name, event) => {
            if (button.validate) {
              this.$refs['form'].validate((valid) => {
                if (valid) {
                  button.func(data, props, name, event)
                } else {
                  return false
                }
              })
            } else {
              button.func(data, props, name, event)
            }
          }
        }
      })
    }
  },
  mounted () {
    let formRules = {}
    this.formList.map(formItem => {
      const column = this.columns[formItem]
      const form = column.form
      const rules = form.rules
      if (rules) {
        if (this.formValues[formItem] === undefined && rules.filter(rule => rule.required).length > 0) {
          if (form.type === 'select' || (form.type === 'cascader' && form.onlySelectLeaf === false)) {
            this.changeFormValue(formItem, column.options[0].value)
          } else if (form.type === 'cascader') {
            this.changeFormValue(formItem, treeFirstLeaf(treeFormat(column.options, 'value')).value)
          }
        }
        formRules[formItem] = form.rules
      }
    })
    this.formRules = formRules
    this.isMounted = true
  },
  methods: {
    formEnter () {
      // 判断回车事件指针是否超出按钮数量
      if (this.formEnterIndex < this.formButtonList.length) {
        const button = this.formButtonList[this.formEnterIndex]
        return button.func(this.formValues, button.funcProps, button.name, button.event)
      }
    },
    changeFormValue (name, value) {
      this.formValues[name] = value
      this.$emit('changeFormValue', this.formValues)
    },
    resetFormValue () {
      this.formValues = {}
    }
  }
}
</script>

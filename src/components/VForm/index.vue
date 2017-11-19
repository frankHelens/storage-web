<template>
<div @keyup.enter="formEnter">
  <el-form
    ref="form"
    class="demo-ruleForm"
    :model="formValues"
    :rules="formRules"
    :label-width="formLabelWidth + 'px'">
    <el-row>
      <el-col
        v-for="column in columns"
        :key="column.name"
        :span="isColumn&&!column.form.large?12:24">
        <v-form-item
          :column="column"
          :value="formValues[column.name]"
          :values="formValues"
          @changeValue="changeFormValue"
          @changeChain="changeChain"
          @uploadFile="uploadFile"
        >
        </v-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        v-for="button in buttonList"
        :key="button.name"
        :type="button.style"
        @click="buttonListEvent(button.name, button.validate)">
        {{button.label}}
      </el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { treeFormat } from '../../utils/common'
import { isNumber, isNaN } from 'lodash'
import VFormItem from './VFormItem'
import ButtonList from '@/components/ButtonList'
export default {
  name: 'VForm',
  components: {
    VFormItem,
    ButtonList
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    values: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isColumn: {
      type: Boolean,
      default: false
    },
    formLabelWidth: {
      type: Number,
      default: 140
    },
    formEnterIndex: {
      type: Number
    },
    buttonList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    let values = {}
    let rules = {}
    this.columns.map(column => {
      if (column.form.type === 'tree') {
        column['treeData'] = treeFormat(column.options, 'value')
        values[column.name] = new Set(this.values[column.name])
      } else {
        if (column.form.type === 'input' && isNumber(this.values[column.name])) {
          values[column.name] = this.values[column.name] + ''
        } else if (column.form.type === 'switch') {
          values[column.name] = Boolean(this.values[column.name])
        } if (column.form.type === 'file') {
          values[column.name] = this.values[column.name] ? this.values[column.name].split(',') : []
        } else {
          values[column.name] = this.values[column.name]
        }
      }
      if (column.form.rules) {
        rules[column.name] = column.form.rules
      }
    })
    return {
      formValues: Object.assign(this.values, values),
      formRules: rules
    }
  },
  methods: {
    formEnter () {
      if (this.formEnterIndex !== undefined) {
        this.buttonListEvent(this.buttonList[this.formEnterIndex].name, this.buttonList[this.formEnterIndex].validate)
      }
    },
    uploadFile (name, value) {
      if (this.formValues[name]) {
        this.formValues[name].push(...value)
      } else {
        this.formValues[name] = value
      }
    },
    changeFormValue (name, value) {
      this.formValues[name] = value
    },
    changeChain (name, value, chain) {
      if (chain.type === 'equal') {
        this.formValues[chain.name] = value
      }
    },
    buttonListEvent (name, validate) {
      let formValues = this.formValues
      this.columns.map(column => {
        if (column.form.type === 'tree') {
          formValues[column.name] = Array.from(this.values[column.name])
        }
        if (column.form.dataType === 'number') {
          formValues[column.name] = this.values[column.name] === ''
          ? ''
          : isNumber(this.values[column.name]) || isNaN(Number(this.values[column.name]))
          ? this.values[column.name]
          : Number(this.values[column.name])
        }
      })
      if (validate) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$emit('buttonListEvent', name, formValues, this.columns)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$emit('buttonListEvent', name, formValues, this.columns)
      }
    }
  }
}
</script>

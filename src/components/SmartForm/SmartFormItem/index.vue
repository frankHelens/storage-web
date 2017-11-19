<template>
  <el-form-item
    :label="column.form.type === 'hidden' ? '' : column.label"
    :prop="columnName">
    <smart-input
      v-if="column.form.type === 'input'"
      :style="formStyle"
      :currentValue='value'
      :disabled="column.form.disabled"
      :placeholder="column.form.placeholder"
      :dataType="column.dataType"
      @changeValue="changeFormValue"
    />
    <smart-textarea
      v-else-if="column.form.type === 'textarea'"
      :style="formStyle"
      :disabled="column.form.disabled"
      :placeholder="column.form.placeholder"
      :currentValue='value'
      :dataType="column.dataType"
      @changeValue="changeFormValue"
    />
    <smart-password
      v-else-if="column.form.type === 'password'"
      :style="formStyle"
      :disabled="column.form.disabled"
      :placeholder="column.form.placeholder"
      :dataType="column.dataType"
      @changeValue="changeFormValue"
    />
    <smart-text
      v-else-if="column.form.type === 'text'"
      :dataType="column.dataType"
      :style="formStyle"
      :options="column.options"      
      :currentValue='value'
    />
    <smart-select
      v-else-if="column.form.type === 'select'"
      :style="formStyle"
      :currentValue="value"
      :disabled="column.form.disabled"
      :options="column.options"
      :dataType="column.dataType"
      :live="column.live"
      @changeValue="changeFormValue"
    />
    <smart-switch
      v-else-if="column.form.type === 'switch'"
      :style="formStyle"
      :currentValue="value"
      :disabled="column.form.disabled"
      :options="column.options"
      :dataType="column.dataType"
      @changeValue="changeFormValue"
    />
    <smart-number
      v-else-if="column.form.type === 'number'"
      :style="formStyle"
      :currentValue="value"
      :disabled="column.form.disabled"
      :dataType="column.dataType"
      :min="column.form.min"
      :max="column.form.max"
      :step="column.form.step"
      @changeValue="changeFormValue"/>
    <smart-cascader
      v-else-if="column.form.type === 'cascader'"
      :style="formStyle"
      :currentValue="value"
      :disabled="column.form.disabled"
      :options="column.options"
      :dataType="column.dataType"
      :onlySelectLeaf="column.form.onlySelectLeaf"
      @changeValue="changeFormValue"/>
    <smart-checkbox
      v-else-if="column.form.type === 'checkbox'"
      :currentValue="value"
      :style="formStyle"
      :disabled="column.form.disabled"
      :dataType="column.dataType"
      @changeValue="changeFormValue"/>
    <smart-date
      v-else-if="column.form.type === 'date'"
      :currentValue="value"
      :disabled="column.form.disabled"
      :dataType="column.dataType"
      :shortcuts="column.shortcuts"
      @changeValue="changeFormValue"
    />
    <smart-date-range
      v-else-if="column.form.type === 'daterange'"
      :currentValue="value"
      :disabled="column.form.disabled"
      :dataType="column.dataType"
      :shortcuts="column.shortcuts"
      @changeValue="changeFormValue"
    />
    <smart-tree
      v-else-if="column.form.type === 'tree'"
      :currentValue="value"
      :data="column.treeData"
      :disabled="column.form.disabled"
      :options="column.options"
      :dataType="column.dataType"
      :live="column.live"
      @changeValue="changeFormValue"
    />
    <smart-multiselect
      v-else-if="column.form.type === 'multiselect'"
      :style="formStyle"
      :currentValue="value"
      :disabled="column.form.disabled"
      :options="column.options"
      :dataType="column.dataType"
      :live="column.live"
      @changeValue="changeFormValue"
    />
    <smart-Upload
      v-else-if="column.form.type === 'file'"
      :url="column.form.url"
      :style="formStyle"
      :fileList="column.form.fileList"
      :currentValue="value"
      :hintContent="column.form.hintContent"
      :dataType="column.dataType"
      @changeValue="changeFormValue"
    />
    <smart-color
      v-else-if="column.form.type === 'color'"
      :currentValue="value"
      :disabled="column.form.disabled"
      @changeValue="changeFormValue"
    />
  </el-form-item>
</template>

<script>
import SmartInput from './SmartInput'
import SmartText from './SmartText'
import SmartTextarea from './SmartTextarea'
import SmartPassword from './SmartPassword'
import SmartSelect from './SmartSelect'
import SmartSwitch from './SmartSwitch'
import SmartNumber from './SmartNumber'
import SmartCascader from './SmartCascader'
import SmartCheckbox from './SmartCheckbox'
import SmartDate from './SmartDate'
import SmartDateRange from './SmartDateRange'
import SmartTree from './SmartTree'
import SmartMultiselect from './SmartMultiselect'
import SmartUpload from './SmartUpload'
import SmartColor from './SmartColor'

export default {
  props: {
    column: Object,
    columnName: String,
    value: String | Number | Object | Array | Set,
    values: Object
  },
  components: {
    SmartInput,
    SmartText,
    SmartTextarea,
    SmartPassword,
    SmartSelect,
    SmartSwitch,
    SmartCascader,
    SmartNumber,
    SmartCheckbox,
    SmartDate,
    SmartDateRange,
    SmartTree,
    SmartMultiselect,
    SmartUpload,
    SmartColor
  },
  data () {
    return {
      formStyle: {
        ...this.column.form.style,
        width: this.column.form.width + 'px'
      }
    }
  },
  methods: {
    changeFormValue (value) {
      this.$emit('changeFormValue', this.columnName, value)
    }
  }
}
</script>

<template>
  <!--判断是否是隐藏，是的话不显示label-->
  <el-form-item
    :label="column.form.type === 'hidden' ? '' : column.label"
    :prop="column.name" >
    <div
      class='text-value'
      v-if="column.form.type === 'text'">
      {{currentValue}}
    </div>
    <el-input
      v-else-if="column.form.type === 'input'"
      v-model="currentValue"
      :disabled="column.form.disabled"
      :placeholder="column.form.placeholder"
      :style="column.form.style"
      @change="changeValue"/>
    <el-input
      v-else-if="column.form.type === 'textarea'"
      type="textarea"
      :rows="3"
      v-model="currentValue"
      @change="changeValue"/>
    <el-input
      v-else-if="column.form.type === 'password'"
      type="password"
      v-model="currentValue"
      @change="changeValue"/>
    <el-input-number
      v-else-if="column.form.type === 'number'"
      v-model.number="currentValue"
      :min="column.form.isMin"
      :max="column.form.isMax"
      auto-complete="off"
      @change="changeValue" />
    <el-date-picker
      v-else-if="column.form.type === 'date'"
      v-model="currentValue"
      type="date"
      placeholder="选择日期"
      @change="dateChangeValue">
    </el-date-picker>
    <el-input
      v-else-if="column.form.type === 'date'"
      v-model="currentValue"
      @change="changeValue"/>
    <el-select
      v-else-if="column.form.type === 'select'"
      v-model="currentValue"
      :filterable="column.form.live"
      :width="column.form.width"
      :style="column.form.style"
      placeholder="请选择"
      @change="changeValue">
      <el-option
        v-for="option in optionsFilter"
        v-if="option.show"
        :key="option.value"
        :label="option.label"
        :value="option.value" />
    </el-select>
    <el-select
      v-else-if="column.form.type === 'multiselect'"
      class="v-form-multiselect"
      placeholder="请选择"
      v-model="currentValue"
      multiple
      :filterable="column.form.live"
      @change="changeValue">
      <el-option
        v-for="option in optionsFilter"
        v-if="option.show"
        :key="option.value"
        :label="option.label"
        :value="option.value" />
    </el-select>
    <el-switch
      v-else-if="column.form.type === 'switch'"
      v-model="currentValue"
      :width="column.form.width"
      :on-text="switchOptions[1].label"
      :off-text="switchOptions[0].label"
      :on-color="switchOptions[1].color"
      :off-color="switchOptions[0].color"
      @change="switchValue">
    </el-switch>
    <template
      v-else-if="column.form.type === 'tree'">
      <!-- <el-select
        class="v-form-multiselect"
        placeholder="请选择"
        v-model="currentValue"
        multiple
        :filterable="column.form.live"
        :filter-method="filterMethod"
        @change="changeValue">
        <el-option
          v-for="option in optionsFilter"
          v-if="option.show"
          :label="option.label"
          :value="option.value" />
      </el-select> -->
      <el-tree
        show-checkbox
        node-key="value"
        :accordion="true"
        :data="column.treeData"
        :default-checked-keys="Array.from(currentValue)"
        @check-change="treeChangeValue"
        >
      </el-tree>
    </template>
    <el-upload
      ref="upload"
      class="el-upload"
      v-else-if="column.form.type === 'file'"
      :action="upLoadUrl"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :on-remove="removeValue"
      list-type="picture"
      >
      <el-tooltip class="item" effect="dark" content="只能上传jpg/png文件，且不超过20M" placement="top-start">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-tooltip>
    </el-upload>
    <router-link
      v-else-if="column.form.type === 'button'"
      :to="column.form.url">
      <el-button
        size="small"
        type="primary">
        {{column.label}}
      </el-button>
    </router-link>
  </el-form-item>
</template>

<script>
import { API } from '@/utils/common'
import { isNaN } from 'lodash'
// import lrz from 'lrz'

export default {
  props: {
    column: Object,
    value: String | Number | Object | Array | Set,
    values: Object
  },
  data () {
    const origin = window.location.origin
    const options = this.column.options ? this.column.options.map(option => {
      return {
        ...option,
        show: true,
        label: option.optionLabel || option.label,
        value: option.value !== undefined ? option.value : option.id
      }
    }) : []
    let currentValue = this.value
    return {
      origin: origin,
      options: options,
      currentValue: currentValue,
      optionsFilter: options,
      successUrl: ''
    }
  },
  watch: {
    value (val) {
      if (this.column.form.type !== 'select') {
        this.currentValue = val
      }
    }
  },
  computed: {
    fileList () {
      if (this.column.form.type === 'file') {
        return this.value.map(item => {
          return {
            name: item,
            url: this.origin + item
          }
        })
      }
    },
    upLoadUrl () {
      return API + 'fileUpload/'
    },
    switchOptions () {
      if (this.column.form.type === 'switch') {
        return this.column.options.sort((a, b) => a.id - b.id).map(option => {
          let color = ''
          if (option.style === 'success') {
            color = '#58d68d'
          } else if (option.style === 'primary') {
            color = '#03a9f4'
          } else if (option.style === 'info') {
            color = '#03a9f4'
          } else if (option.style === 'warning') {
            color = '#ffcd14'
          } else if (option.style === 'danger') {
            color = '#fe6553'
          }
          return {
            ...option,
            color: color
          }
        })
      } else {
        return false
      }
    },
    twoDecimal (num) {
      return this.column.form.decimal ? parseFloat(num).toFixed(2) : num
    }
  },
  methods: {
    filterMethod (text) {
      // if (this.options.some(option => option.label === text)) {
      //   this.optionsFilter = this.options.map(option => {
      //     return {
      //       ...option,
      //       show: true
      //     }
      //   })
      // } else {
      //   this.optionsFilter = this.options.map(option => {
      //     return {
      //       ...option,
      //       show: option.label.indexOf(text) >= 0 || option.subtext.indexOf(text) >= 0
      //     }
      //   })
      // }
    },
    selectChangeVisible (value, a, b) {
    },
    selectChangeValue (value) {
    },
    changeValue (value) {
      this.$emit('changeValue', this.column.name, this.column.form.dataType === 'number' && !isNaN(Number(value)) ? Number(value) : value)
      if (this.column.form.chains) {
        this.column.form.chains.map(chain => {
          this.$emit('changeChain', this.column.name, this.column.form.dataType === 'number' ? Number(value) : value, chain)
        })
      }
    },
    dateChangeValue (value) {
      this.$emit('changeValue', this.column.name, value)
    },
    treeChangeValue (data, state, child) {
      let currentValue = this.currentValue
      state && !data.children ? currentValue.add(data.value) : currentValue.delete(data.value)
      console.log(this.currentValue)
      this.$emit('changeValue', this.column.name, currentValue)
    },
    switchValue (value) {
      const result = this.column.options[Number(value)].value !== undefined ? this.column.options[Number(value)].value : this.column.options[Number(value)].id
      this.$emit('changeValue', this.column.name, result)
    },
    uploadSuccess (response, file, fileList) {
      this.value = [
        ...this.value,
        ...response.data
      ]
      this.$emit('changeValue', this.column.name, this.value)
    },
    removeValue (file, fileList) {
      this.value.splice(this.value.indexOf(file.url.split(this.origin)[1]), 1)
      this.$emit('changeValue', this.column.name, this.value)
    },
    beforeUpload (value) {
      const isJPG = value.type === 'image/jpeg' || value.type === 'image/jpg' || value.type === 'image/png' || value.type === 'image/bmp'
      const isLt20M = value.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message({
          showClose: true,
          message: '上传失败,文件大小不能超过20m',
          type: 'error'
        })
      }
      if (!isJPG) {
        this.$message({
          showClose: true,
          message: '上传文件失败,只能上传jpg/png/bmp图片',
          type: 'error'
        })
      }
      return isJPG && isLt20M
    }
  }
}
</script>

<style scoped lang="sass">
.v-form-multiselect
  width: 100%
.onClass
  color: success
</style>

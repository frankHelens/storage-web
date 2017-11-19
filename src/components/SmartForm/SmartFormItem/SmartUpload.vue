<template>
    <!-- :before-upload="beforeUpload" -->
  <el-upload
    ref="upload"
    class="el-upload"
    v-else-if="column.form.type === 'file'"
    :action="upLoadUrl"
    :fileList="fileListArray"
    :on-success="uploadSuccess"
    :on-remove="removeValue"
    :before-upload="beforeUpload"
    list-type="listType"
    >
    <el-tooltip class="item" effect="dark" :content="hintContent" placement="top-start">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-tooltip>
  </el-upload>
</template>

<script>
import { getApi, URL } from '@/utils/common'

export default {
  props: {
    currentValue: {
      type: String,
      default: ''
    },
    dataType: {
      type: String,
      default: 'string'
    },
    url: String,
    hintContent: {
      type: String,
      default: '请上传文件'
    },
    listType: {
      type: String,
      default: 'picture'
    }
  },
  created () {
  },
  data () {
    let fileList = new Set()
    if (this.currentValue) {
      this.currentValue.split(',').map(item => fileList.add(item))
    }
    return {
      value: this.currentValue,
      fileList: fileList
    }
  },
  computed: {
    upLoadUrl () {
      return getApi() + this.url
    },
    fileListArray () {
      return Array.from(this.fileList).map(item => {
        const name = item.split('/')
        return {
          name: name[name.length - 1],
          url: URL + '/' + item
        }
      })
    }
  },
  methods: {
    removeValue (file, fileList) {
      this.fileList.delete(file.url.split(URL + '/')[1])
      const value = Array.from(this.fileList).join()
      this.$emit('changeValue', value)
    },
    uploadSuccess (response, file, fileList) {
      response.data.map(item => this.fileList.add(item))
      const value = Array.from(this.fileList).join()
      this.$emit('changeValue', value)
    },
    beforeUpload (value) {
      console.log(value)
      const isType = value.type === 'image/jpeg' || value.type === 'image/jpg' || value.type === 'image/png' || value.type === 'image/bmp' || value.type === 'application/msword' || value.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || value.type === 'application/vnd.ms-excel'
      const isLt20M = value.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message({
          showClose: true,
          message: '上传失败,文件大小不能超过20m',
          type: 'error'
        })
      }
      if (!isType) {
        this.$message({
          showClose: true,
          message: '上传文件失败,只能上传jpg/png/bmp图片',
          type: 'error'
        })
      }
      return isType && isLt20M
    }
  }
}
</script>


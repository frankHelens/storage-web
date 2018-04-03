<template>
  <div class="important-wrap">
    <div class="important-info">
      <el-row>
        <el-col
          v-for="columnName in infoList"
          :key="columnName"
          :span="columns[columnName].size||6"
        >
          <info-render
            v-if="formValues"
            :data="formValues[columnName]"
            :full="formValues"
            :column="columns[columnName]"
            :minLength="columns[columnName].minLength"
          >
            <template scope="props">
              <span class="label">{{columns[columnName].label}}：</span>{{ props.content }}
            </template>
          </info-render>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import InfoRender from '@/components/InfoRender'
export default {
  name: 'important-info',
  components: {
    InfoRender
  },
  props: {
    infoList: Array,
    formValues: Object,
    columns: Object
  }
}
</script>
<style scoped lang="sass">
$back: 10px
.icon
  margin-right: 2 * $back
%hover-div
  padding: $back
  cursor: pointer
.important-wrap
  font-size: 13px
  color: #424e67
  // padding: $back + 2px
  // border: 1px solid #ddd
  .important-info
    .important-info-item
      margin: $back 0;
      .label
        font-weight: bold
        margin-right: $back
</style>

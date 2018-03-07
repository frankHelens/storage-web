<template lang="pug">
    FormTablePage(
      :formList="formList"
      :columns="columns"
      :values="values"
    )
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import columns from './columns'

export default {
  components: {
    FormTablePage
  },
  data () {
    return {
      formList: ['origin', 'storageType', 'enterPrice', 'takePe', 'makePe', 'remark'],
      columns: {
        ...columns
      },
      values: {}
    }
  }
}
</script>

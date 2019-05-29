<template>
  <div>
    <ele-import
      :append="append"
      :fields="fields"
      :filepath="filepath"
      :formatter="formatter"
      :requestFn="requestFn"
      :rules="rules"
      :tips="tips"
      :title="title"
      :visible.sync="visible"
      @close="handleCloseImport"
      @finish="handleFinishImport"
    />
    <el-button
      @click="handleOpen"
      type="primary"
    >点我打开</el-button>
    <div>{{tableData}}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: '导入人员',
      tips: ['名字必填', '年龄必填'],
      fields: {
        name: '名字',
        age: '年龄',
        city: '所在城市'
      },
      append: {
        company: '腾讯',
        leader: '小马哥'
      },
      formatter: {
        city: {
          1: '深圳',
          2: '广州'
        },
        age: function (value, row) {
          return value + 1
        }
      },
      rules: {
        name: { type: 'string', required: true, message: '名字必填' },
        age: [
          { type: 'number', message: '年龄必须为数字' },
          { required: true, message: '年龄必须填写' }
        ]
      },
      filepath: 'https://raw.githubusercontent.com/dream2023/vue-ele-import/master/public/user.xlsx',
      visible: false,
      tableData: ''
    }
  },
  methods: {
    async requestFn (data) {
      this.tableData = JSON.stringify(data)
      console.log(data)
      // eslint-disable-next-line
      // return Promise.reject({ 1: { age: '名字错了' } })
      return Promise.resolve()
    },
    handleCloseImport () {
      console.log('弹窗关闭了~')
    },
    handleFinishImport () {
      console.log('导入完毕了~')
    },
    handleOpen () {
      this.visible = true
    }
  },
  mounted () {}
}
</script>

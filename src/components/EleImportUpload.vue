<template>
  <div>
    <!-- 提示列表 -->
    <div v-if="tips && tips.length">
      <el-alert
        show-icon
        type="warning"
      >
        <ol class="ele-import-upload-tips">
          <li
            :key="index"
            v-for="(item, index) of tips"
          >{{item}}</li>
        </ol>
      </el-alert>
    </div>

    <!-- 上传组件 -->
    <el-upload
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="fakeRequeset"
      :limit="1"
      :show-file-list="false"
      action="/"
      class="ele-import-upload-uploader"
      drag
      v-loading="isLoading"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将填写后的文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <!-- 操作 -->
    <div class="ele-import-action">
      <el-button @click="goPre">上一步</el-button>
      <el-button
        :loading="isLoading"
        @click="handleGoNext"
        type="primary"
      >下一步</el-button>
    </div>
  </div>
</template>

<script>
// 上传文件页面
import excel from '../excel'

export default {
  name: 'EleImportUpload',
  props: {
    tips: Array,
    fields: {
      type: Object,
      required: true
    }
  },
  inject: ['goNext', 'goPre'],
  data () {
    return {
      fileList: [],
      isLoading: false
    }
  },
  methods: {
    // 假上传
    fakeRequeset () {
      this.fileList = []
    },
    // 检测文件类型
    checkType (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      const extArr = ['xlsx', 'xls', 'csv']
      return extArr.includes(fileExt)
    },
    // 上传错处提示
    uploadError (message) {
      this.$notify.error({
        title: '上传出错了',
        message: message
      })
    },
    // 检测表头
    checkTableTitle (columns, fields) {
      const titles = Object.values(fields)
      titles.forEach((item) => {
        if (!columns.includes(item)) {
          this.$notify.error({
            title: '数据错处了',
            message: item + ' 列未找到'
          })
        }
      })
    },
    handleGoNext () {
      this.$notify.error({
        title: '提示',
        message: '请先上传数据'
      })
    },

    // 改变 tableData 的 key, 并且过滤掉不需要的字段
    changeDatakeyAndFilter (arr) {
      const fields = this.fields
      return arr.map((item) => {
        let res = {}
        for (const key in fields) {
          res[key] = item[fields[key]]
        }
        return res
      })
    },

    async beforeUpload (file) {
      if (this.isLoading) return

      // 检测文件类型
      if (!this.checkType(file)) {
        this.uploadError('文件：' + file.name + ' 文件类型错误，请在模板文件上修改后上传')
        return false
      }

      this.isLoading = true
      try {
        const { columns, tableData } = await excel(file)

        if (!(columns.length && tableData.length)) {
          this.uploadError('请打开模板文件, 并填写数据')
        } else {
          this.checkTableTitle(columns, this.fields)
          this.$emit('upload', columns, this.changeDatakeyAndFilter(tableData))
          this.goNext()
        }
      } catch (e) {
        console.error(e)
        this.uploadError('文件读取出错，请重新上传')
      } finally {
        this.isLoading = false
      }

      return false
    }
  }
}
</script>

<style>
.ele-import-upload-tips {
  padding: 0 20px;
  line-height: 20px;
  list-style-type: decimal;
}

.ele-import-upload-uploader {
  margin-top: 20px;
  text-align: center;
}
</style>

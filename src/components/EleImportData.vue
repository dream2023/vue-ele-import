<template>
  <div>
    <!-- 错误显示表 -->
    <template v-if="errorTableData.length">
      <h1 style="color: #f56c6c">错误信息展示</h1>

      <el-table
        :data="errorTableData"
        border
        class="import-error-table"
        style="width: 100%"
      >
        <el-table-column
          label="错误行号"
          prop="row"
          width="180"
        ></el-table-column>
        <el-table-column
          label="错误原因"
          prop="reason"
        ></el-table-column>
      </el-table>
    </template>
    <!-- 数据列表 -->
    <h1>数据列表</h1>
    <el-table
      :cell-class-name="checkCell"
      :data="tableData"
      border
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column
        align="center"
        label="行号"
        type="index"
        width="50"
      ></el-table-column>

      <el-table-column
        :key="field"
        :label="label"
        :prop="field"
        align="left"
        header-align="center"
        v-for="(label, field) of fields"
      >
        <!-- 自定义错误显示 -->
        <template slot-scope="scope">
          <el-tooltip
            :content="errorData[scope.$index][field]"
            class="item"
            effect="dark"
            placement="top"
            v-if="errorData[scope.$index] && errorData[scope.$index][field]"
          >
            <div>{{ scope.row[field] || "&nbsp;" }}</div>
          </el-tooltip>
          <template v-else>{{scope.row[field]}}</template>
        </template>
      </el-table-column>
    </el-table>

    <div class="ele-import-action">
      <el-button @click="handlePre">重新上传</el-button>
      <el-button
        :loading="isLoading"
        @click="handleRequest"
        type="primary"
      >下一步</el-button>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'EleImportData',
  props: {
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    fields: {
      type: Object,
      required: true
    },
    requestFn: {
      type: Function,
      required: true
    },
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    formatter: Object,
    append: Object
  },
  inject: ['goNext', 'goPre'],
  data () {
    return {
      isLoading: false,
      errorData: {}
    }
  },
  computed: {
    errorTableData () {
      const errorData = this.errorData
      const errorTableData = []
      for (const index in errorData) {
        let messageArr = []
        for (const field in errorData[index]) {
          messageArr.push(errorData[index][field])
        }
        errorTableData.push({
          row: Number(index) + 1,
          reason: messageArr.join('、')
        })
      }

      return errorTableData
    }
  },
  methods: {
    // 检查单元格是否错误
    checkCell ({ row, column, rowIndex }) {
      if (this.errorData[rowIndex] && this.errorData[rowIndex][column.property]) {
        return 'ele-import-error-cell'
      }
    },

    // 校检数据
    validateData () {
      if (this.rules) {
        var validator = new Schema(this.rules)
        const errorData = []
        this.tableData.forEach((item, index) => {
          validator.validate(item, (errors, fileds) => {
            if (errors) {
              errorData[index] = []
              errors.forEach((error) => {
                errorData[index][error.field] = error.message
              })
            }
          })
        })

        this.errorData = errorData
      }
    },

    handlePre () {
      this.$emit('pre')
    },

    // 根据value找到key
    findKey (obj, value, compare = (a, b) => a === b) {
      let key = Object.keys(obj).find(k => compare(obj[k], value))
      if (!isNaN(Number(key))) {
        key = Number(key)
      }
      return key
    },

    // 根据 formatter 改变值
    changeData (tableData) {
      const formatter = this.formatter
      if (formatter) {
        tableData = tableData.map((item) => {
          for (const key in item) {
            if (formatter[key]) {
              if (typeof formatter[key] === 'function') {
                item[key] = formatter[key](item[key], item)
              } else {
                item[key] = this.findKey(formatter[key], item[key])
              }
            }
          }
          return item
        })
      }

      return tableData
    },

    // 发送请求
    async handleRequest () {
      if (this.isLoading) return

      if (this.errorTableData.length) {
        this.$notify.error({
          title: '提示',
          message: '请处理完错误后重新上传'
        })
        return
      }

      this.isLoading = true
      let tableData = JSON.parse(JSON.stringify(this.tableData))
      // 改变值
      tableData = this.changeData(tableData)
      // 增加附加数据
      const appendData = this.append
      if (appendData) {
        tableData = tableData.map((item) => {
          return Object.assign({}, item, appendData)
        })
      }
      try {
        await this.requestFn(tableData)
        this.$message.success('导入成功')
        this.goNext()
      } catch (error) {
        this.errorData = error
        this.$message.error('导入失败, 请重试')
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted () {
    this.validateData()
  }
}
</script>

<style>
.import-error-table {
  margin-bottom: 20px;
}

.ele-import-error-cell {
  color: white;
  background: #f56c6c !important;
}
.ele-import-error-cell:hover {
  background-color: #f56c6c !important;
  background: #f56c6c !important;
}
</style>

# vue-ele-import | 超简单、好用的 element-ui Excel 导入组件

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-import.svg)](https://www.npmjs.com/package/vue-ele-import)
[![download](https://img.shields.io/npm/dw/vue-ele-import.svg)](https://npmcharts.com/compare/vue-ele-import?minimal=true)

## 介绍

vue-ele-import 利用 element ui 组件库完成的 Excel 导入数据组件, 主要特点如下:

- 简单：仅需一行 html 代码
- 直观：分步骤进行、错误表格显示
- 强大：数据校检、数据转化一步完成

<!-- ## 效果图 -->

![演示图](./public/example.gif)

## 安装

```bash
npm install vue-ele-import --save
```

## 使用

```js
// 全局引入
import EleImport from 'vue-ele-import'
Vue.component(EleImport.name, EleImport)
```

```js
// 局部引入
import EleImport from 'vue-ele-import'
export default {
  components: {
    EleImport
  }
}
```

## 示例

[点我看在线示例](https://codepen.io/dream2023/pen/NVBKRy)

```html
<template>
  <div>
    <ele-import
      :fields="fields"
      :filepath="filepath"
      :append="append"
      :formatter="formatter"
      :requestFn="requestFn"
      :rules="rules"
      :tips="tips"
      :title="title"
      :visible.sync="visible"
      @close="handleCloseImport"
      @finish="handleFinishImport"
    />
    <el-button @click="handleOpen" type="primary">点我打开</el-button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        // 弹窗的标题
        title: '导入人员',
        // 提示信息
        tips: ['名字必填', '年龄必填', '年龄请填写数字'],
        // 假如数据库中是`name`字段, 而Excel模板列是`名字`, 就需要写成 name: '名字'
        // ele-import 内部会抛弃非定义在fields里的列
        fields: {
          name: '名字',
          age: '年龄',
          city: '所在城市'
        },
        // formatter起到替换数据的作用
        formatter: {
          // 可以是对象, 在发送请求时, '深圳' 将被替换成 1, '广州' 被替换成 2
          city: {
            1: '深圳',
            2: '广州'
          },
          // 可以是函数, 在发送请求时, `age` 将加1, 例如 原数据是 19 -> 20
          age: function(value, row) {
            return value + 1
          }
        },
        // 附加数据, 在每条记录上都会加这两个字段和值
        append: {
          company: '腾讯',
          leader: '小马哥'
        },
        // 参数校检, 和 element-ui 中 form表单中传递的rules一样, 都是使用的 async-validator 库
        // https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
        rules: {
          name: { type: 'string', required: true, message: '名字必填' },
          age: [
            { type: 'number', message: '年龄必须为数字' },
            { required: true, message: '年龄必须填写' }
          ]
        },
        // Excel模板下载地址
        // 注意, 只能是.xlsx的文件, .xls或者.cvs都会报错
        filepath:
          'https://raw.githubusercontent.com/dream2023/vue-ele-import/master/public/user.xlsx',
        // 控制弹窗, 和dialog的visible一样
        // https://element.eleme.cn/#/zh-CN/component/dialog
        visible: false
      }
    },
    methods: {
      // requestFn函数会被注入请求的数据
      // 需要返回一个Promise对象
      async requestFn(data) {
        // 演示代码
        // 1、如果没有针对ele-import做过接口约定, 可以采用如下形式:
        // try {
        //   const res = await axios.post('/user', data)
        //   return Promise.resolve()
        // } catch (error) {
        //   // error经过一系列转化, 转为
        //   const errorData = this.getErrorMessage(error)
        //   {0:{ age: '年龄为数字', city: '城市必填'}, 2:{ age: '年龄为数字'} } // 0 和 2 分别是行号
        //   return Promise.reject(errorData)
        // }
        // 2、如果针对ele-import做过接口约定, 当校检错误时, 后端返回的 error 就是上述错误形式, 则可直接
        // return axios.post('/user', data)
        // 总结: 无论如何总要返回一个Promise对象
      },
      handleCloseImport() {
        console.log('弹窗关闭了~')
      },
      handleFinishImport() {
        console.log('导入完毕了~')
      },
      handleOpen() {
        this.visible = true
      }
    },
    mounted() {}
  }
</script>
```

## Props 参数

```js
props: {
  // 文件路径
  filepath: {
    type: String,
    required: true
  },
  // 请求方法
  requestFn: {
    type: Function,
    required: true
  },
  // 字段
  fields: {
    type: Object,
    required: true
  },
  // 是否显示弹窗
  visible: {
    type: Boolean,
    required: true
  },
  // 弹窗标题
  title: {
    type: String,
    default: '批量导入'
  },
  // 提示信息，数组
  tips: Array,
  // 增加附加数据
  append: Object,
  // 验证规则
  rules: Object,
  // 格式化数据
  formatter: {
    type: Object
  },
  // 弹窗宽度
  dialogWidth: {
    type: String,
    default: '80%'
  }
}
```

## 参考链接

- [vue-element-admin excel 组件](https://github.com/PanJiaChen/vue-element-admin/)
- [element-ui dialog 组件](https://element.eleme.cn/#/zh-CN/component/dialog)
- [element-ui steps 组件](https://element.eleme.cn/#/zh-CN/component/steps)
- [blueimp/Gallery](https://github.com/blueimp/Gallery)
- [xlsx](https://github.com/SheetJS/js-xlsx)

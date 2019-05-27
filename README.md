# vue-ele-import | 超简单、好用的 element-ui Excel 导入组件

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-import.svg)](https://www.npmjs.com/package/vue-ele-import)
[![size](https://img.shields.io/bundlephobia/minzip/vue-ele-import.svg)](https://www.npmjs.com/package/vue-ele-import)
[![download](https://img.shields.io/npm/dw/vue-ele-import.svg)](https://npmcharts.com/compare/vue-ele-import?minimal=true)

## 介绍

vue-ele-import 利用 element ui 组件库完成的 Excel 导入数据组件, 主要特点如下:

- 简单：仅需一行 html 代码
- 直观：分步骤一步一步引导用户
- 强大：可以对每行数据的每个字段进行校检

## 效果图

<!-- ![演示图](./public/example.gif) -->

## 文档和示例

[https://dream2023.github.io/vue-ele-import/](https://dream2023.github.io/vue-ele-import/)

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

## Props 参数

```js
```

## 参考链接

- [vue-element-admin excel](https://github.com/PanJiaChen/vue-element-admin/)
- [element-ui dialog 组件](https://element.eleme.cn/#/zh-CN/component/dialog)
- [element-ui steps 组件](https://element.eleme.cn/#/zh-CN/component/steps)
- [blueimp/Gallery](https://github.com/blueimp/Gallery)
- [xlsx](https://github.com/SheetJS/js-xlsx)

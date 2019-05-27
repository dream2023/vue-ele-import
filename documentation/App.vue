<template>
  <div>
    <easy-github-pages
      :menus="menuList"
      author="zhangchaojie"
      githubUrl="https://github.com/dream2023/vue-ele-import/"
      title="vue-ele-import | 超好用的 element-ui Excel 导入组件"
    >
      <section id="intro">
        <h2>介绍</h2>
        <p>vue-ele-import 利用 element ui 组件库完成的 Excel 导入数据组件, 主要特点如下:</p>
        <blockquote>
          <ul>
            <li>简单：仅需一行 html 代码</li>
            <li>直观：分步骤进行、错误表格显示</li>
            <li>强大：数据校检、数据转化一步完成</li>
          </ul>
        </blockquote>
        <!-- <img
          :src="`${publicPath}example.gif`"
          alt="vue-ele-import"
        >-->
      </section>
      <section id="install">
        <h2>安装</h2>
        <blockquote>npm install vue-ele-import --save</blockquote>
      </section>
      <section id="usage">
        <h2>使用</h2>
        <blockquote>
          <pre class="language-js">
            <code class="language-js">
              // 全局引入
              import EleImport from 'vue-ele-import'
              Vue.component(EleImport.name, EleImport)
            </code>
          </pre>
        </blockquote>
        <blockquote>
          <pre class="language-js">
            <code class="language-js">
              // 局部引入
              import EleImport from 'vue-ele-import'
              export default {
                components: {
                  EleImport
                }
              }
            </code>
          </pre>
        </blockquote>
      </section>
      <section id="example">
        <h2>示例</h2>
        <div></div>
      </section>
      <section id="props">
        <h2>Props参数</h2>
        <blockquote>
          <pre class="language-js">
            <code class="language-js">
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
            </code>
          </pre>
        </blockquote>
      </section>
      <section id="reference">
        <h2>参考链接</h2>
        <blockquote>
          <ul>
            <li>
              <a
                href="https://github.com/PanJiaChen/vue-element-admin/"
                target="_blank"
              >vue-element-admin excel 组件</a>
            </li>
            <li>
              <a
                href="https://element.eleme.cn/#/zh-CN/component/dialog"
                target="_blank"
              >element-ui dialog 组件</a>
            </li>
            <li>
              <a
                href="https://element.eleme.cn/#/zh-CN/component/steps"
                target="_blank"
              >element-ui steps 组件</a>
            </li>
            <li>
              <a
                href="https://github.com/SheetJS/js-xlsx"
                target="_blank"
              >xlsx</a>
            </li>
          </ul>
        </blockquote>
      </section>
    </easy-github-pages>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      menuList: [
        {
          title: '介绍',
          href: 'intro'
        },
        {
          title: '安装',
          href: 'install'
        },
        {
          title: '使用',
          href: 'usage'
        },
        {
          title: '示例',
          href: 'example'
        },
        {
          title: 'Props参数',
          href: 'props'
        },
        {
          title: '参考链接',
          href: 'reference'
        }
      ]
    }
  }
}
</script>

<template>
    <div class="code-block">
        <pre v-html="highlightedCodeWithLineNumbers"></pre>
    </div>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/default.css'; // 引入你想要的样式
    export default {
        props:{
          code:{
              default:"",
          },
        },
        data() {
            return {
                highlightedCodeWithLineNumbers: '',
            };
        },
        mounted() {
            this.highlightCode();
        },
        methods: {
            highlightCode() {
                let code
                if('object' === typeof this.code){
                     code=JSON.stringify(this.code,null,2)
                }else{
                    code=this.code;
                }

                const highlightedCode = hljs.highlightAuto(code).value;
                const lines = highlightedCode.split('\n');
                let codeWithLineNumbers = '';
                lines.forEach((line, index) => {
                    codeWithLineNumbers += `<span class="line-number">${index + 1}</span> ${line}\n`;
                });
                this.highlightedCodeWithLineNumbers = codeWithLineNumbers;
            },
        },
    };
</script>

<style scoped>
    .code-block {
        position: relative;
    }

    .code-block pre {
        margin: 0;
        background-color: #F2F6FC; /* 设置背景颜色为黑色 */
        color: black; /* 设置代码文字颜色为白色 */
        position: relative; /* 使伪元素相对于pre元素定位 */
        padding-left: 10px; /* 为代码内容留出一点空间 */
        overflow: hidden;
        padding: 20px;
        border-radius: 15px;
    }

    .line-number {
        position: absolute;
        left: 0;
        user-select: none; /* 禁止选择行号 */
        color: #fff; /* 设置行号颜色为白色 */
        text-align: right;
        width: 10px; /* 行号宽度 */
        padding-right: 5px; /* 在行号与分隔杠之间留出空间 */
        background-color: #44b0ff;
    }

    .line-number::before {
        content: ''; /* 伪元素的内容为空 */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 20px; /* 分隔杠的宽度 */
        background-color: red; /* 分隔杠的颜色 */
    }
</style>
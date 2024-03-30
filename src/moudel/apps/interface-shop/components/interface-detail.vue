<template>
    <div class="content-center">
        <div>
            <a-descriptions title="接口信息">
                <a-descriptions-item label="接口名称">
                    {{interfaceInfo.name}}
                </a-descriptions-item>
                <a-descriptions-item label="返回类型">
                    {{interfaceInfo.responseType}}
                </a-descriptions-item>
                <a-descriptions-item label="接口类型">
                    {{interfaceInfo.type}}
                </a-descriptions-item>
                <a-descriptions-item label="接口地址">
                    {{interfaceInfo.url}}
                </a-descriptions-item>
                <a-descriptions-item label="调用次数">
                    {{interfaceInfo.useTotal}}
                </a-descriptions-item>
                <a-descriptions-item label="接口描述">
                    {{interfaceInfo.description}}
                </a-descriptions-item>
                <a-descriptions-item label="请求方法">
                    {{interfaceInfo.method}}
                </a-descriptions-item>
            </a-descriptions>
        </div>
        <div>
            <a-tabs default-active-key="1">
                <a-tab-pane key="1">
                  <span slot="tab">
                    <a-icon type="apple" />
                    API 文档
                  </span>
                    <div style="width: 60%">

                        <h4 class="a">请求头Header:</h4>
                        <a-table tableLayout="auto" size="middle" :columnWidth="20" :columns="requestHeaderColumns" :data-source="requestHeaderParams" :pagination="false">
                            <span slot="name" slot-scope="text">{{ text }}</span>
                        </a-table>

                        <h4 style="margin-top: 20px">请求参数:</h4>
                        <a-table tableLayout="auto" size="middle" :columns="requestParamsColumns" :data-source="requestFieldParams" :pagination="false">
                            <span slot="name" slot-scope="text">{{ text }}</span>
                        </a-table>

                        <h4 style="margin-top: 20px">响应参数:</h4>
                        <a-table tableLayout="auto" size="middle" :columns="repParamsColumns" :data-source="responseFieldParams" :pagination="false">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                        </a-table>

                        <h4 style="margin-top: 20px">响应参数实例:</h4>
                        <div v-html="">
                           <pre style="background-color: black;color: white;width: 100%">
                               <code>
                                 {{interfaceInfo.responseParamsExample}}
                               </code>
                           </pre>
                        </div>
                    </div>
                </a-tab-pane>


                <a-tab-pane key="2">
                      <span slot="tab">
                        <a-icon type="android" />
                        在线调试工具
                      </span>
                    <div>
                        <h4>请求地址：</h4>
                        <a-input-search
                                style="width: 800px"
                                default-value="mysite"
                                v-model="interfaceInfo.url"
                                size="large"
                                enter-button="发起请求"
                                @search="invokeInterface">
                            <a-select slot="addonBefore" v-model="requestInvokeParam.method" style="width: 90px" >
                                <a-select-option value="GET">
                                    GET
                                </a-select-option>
                                <a-select-option value="POST">
                                    POST
                                </a-select-option>
                            </a-select>
                        </a-input-search>

                        <div style="width: 60%;margin-top: 30px">
                            <h4>请求参数：</h4>
                            <a-table size="middle" :columns="requestParamsColumns1" :data-source="requestFieldParams" :pagination="false">
                                <span slot="name" slot-scope="text">{{ text }}</span>
                                <template slot="action" slot-scope="text, record, index">
                                    <a-input v-model="record.value" />
                                </template>
                            </a-table>
                        </div>
                        <div style="margin-top: 30px">
                            <h4>响应参数:</h4>
                            <pre v-html="responseBody">

                            </pre>
                        </div>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="3">
                      <span slot="tab">
                        <a-icon type="android" />
                        错误参照码
                      </span>
                    <div style="width: 60%;">
                        <h4>错误参照码：</h4>
                        <a-table size="middle" :columns="errorColums" :data-source="errorFieldParams" :pagination="false">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                            <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                            <template slot-scope="text, record, index">
                                <a-input v-model="record.value" />
                            </template>
                        </a-table>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="4">
                      <span slot="tab">
                        <a-icon type="android" />
                        示例代码
                      </span>
                    <div>
                            <mavon-editor class="markdown"
                                          v-model="interfaceInfo.codeExample"
                                          :toolbarsFlag=false
                                          :subfield=false
                                          defaultOpen="preview"
                                          :boxShadow="false"
                                          style="z-index:0"
                            ></mavon-editor>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
    import {
        getByIdInterfaceInfo,
        invokeInteface
    } from '../api'
    import Prism from "prismjs";
    import  'prismjs/components/prism-json.min'
    const requestHeaderColumns = [
        {
            title: '名称',
            dataIndex: 'fieldName',
            width: '100px',
            key: 'fieldName',
        },
        {
            title: '值',
            dataIndex: 'value',
            width: '165px',
            key: 'value',
        },
    ];
    const requestParamsColumns = [
        {
            title: '名称',
            dataIndex: 'fieldName',
            width: '165px',
            key: 'fieldName',
        },
        {
            title: '必填',
            dataIndex: 'required',
            width: '160px',
            key: 'required',
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: '160px',
            key: 'type',
        },  {
            title: '描述',
            dataIndex: 'description',
            width: '160px',
            key: 'description',

        },
    ];
    const requestParamsColumns1 = [
        {
            title: '名称',
            dataIndex: 'fieldName',
            key: 'fieldName',
        },
        {
            title: '是否必填',
            dataIndex: 'required',
            key: 'required',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },  {
            title: '说明',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '值',
            key: 'value',
            scopedSlots: { customRender: 'action' }
        },
    ];
    const repParamsColumns = [
        {
            title: '名称',
            dataIndex: 'fieldName',
            key:'fieldName',
            width: '75px',
            scopedSlots: { customRender: 'fieldName' },
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: '150px',
            scopedSlots: { customRender: 'type' },
        },
        {
            title: '描述',
            dataIndex: 'description',
            width: '110px',
            scopedSlots: { customRender: 'description' },
            align: 'center',
        },
    ];
    const errorColums=[
        {
            title: '错误码',
            dataIndex: 'code',
            key:'code',
            width: '75px',
            scopedSlots: { customRender: 'errorCode' },
        },
        {
            title: '描述',
            dataIndex: 'description',
            key:'description',
            width: '75px',
            scopedSlots: { customRender: 'description' },
        },
    ];
    export default {
        name: "interface-detail",
        data(){
          return{
              interfaceInfo:{},
              requestHeaderColumns,
              requestParamsColumns,
              requestParamsColumns1,
              errorColums,
              repParamsColumns,
              requestHeaderParams:[],
              requestFieldParams:[],
              responseFieldParams:[],
              requestInvokeParam:{
                  method:'GET'
              },
              errorFieldParams:[],
              responseBody:''
          }
        },
        mounted() {
           this.getByIdInterfaceInfo();
        },
        methods:{
            async getByIdInterfaceInfo(){
                let res=await getByIdInterfaceInfo(this.$route.params.id)
                this.interfaceInfo=res.data.data
                this.requestHeaderParams=JSON.parse(this.interfaceInfo.requestHeaderParams)
                this.requestFieldParams=JSON.parse(this.interfaceInfo.requestFieldParams)
                this.responseFieldParams=JSON.parse(this.interfaceInfo.responseFieldParams)
                this.errorFieldParams=JSON.parse(this.interfaceInfo.errorCode)
                this.interfaceInfo.responseParamsExample=JSON.parse(this.interfaceInfo.responseParamsExample)
                this.requestFieldParams1=this.requestFieldParams
            },
            async invokeInterface(value){
                this.requestInvokeParam.url=value
                this.requestInvokeParam.requestHeaderParams=this.requestHeaderParams
                this.requestInvokeParam.requestFieldParams=this.requestFieldParams
                let param={
                    ...this.requestInvokeParam
                }
                let res=await invokeInteface(param)
                if(res.data.code===0){
                    this.responseBody=Prism.highlight(res.data.data, Prism.languages.json,"json")
                }else{
                    this.$message.error("请求失败")
                }
            }
        }
    }
</script>

<style scoped>
    .a{
        content: '';
    }
.a::before{
    width: 5px;
    height: 5px;
    color: #44b0ff;
    background-color: #44b0ff;
}
</style>
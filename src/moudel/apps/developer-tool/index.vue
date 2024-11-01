<template>
  <div class="content-center">
    <a-card class="content">
      <div class="content-header" style="text-align: center">
          <a-input-search size="large" style="width: 80%;" placeholder="请输入工具包名称" enter-button @search="onSearch" />
          <a-button size="large" style="margin-left: 20px;width: 80px;text-align: center" type="primary" @click="showModal">上传</a-button>
      </div>
      <a-list item-layout="horizontal" :data-source="toolFileList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
              :description="item.description"
          >
            <a slot="title" href="#">{{ item.name }}</a>
          </a-list-item-meta>
          <a slot="actions">下载</a>
        </a-list-item>
      </a-list>
    </a-card>
    <div>
      <a-modal
          title="工具包上传"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
      >
        <div>
          <a-upload-dragger
              name="file"
              :multiple="true"
              :beforeUpload = "beforeUpload"
              @change="handleChanges"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
              单击或拖动文件到此区域进行上传
            </p>
            <p class="ant-upload-hint">
              在上传文件时请将工具包进行解压后再进行上传，目前不支持多文件上传
            </p>
          </a-upload-dragger>
        </div>
        <div>
          <a-input style="margin-top: 20px" v-model="toolName" placeholder="请输入工具包名称"/>
          <a-textarea style="margin-top: 20px" v-model="toolDescription"
              placeholder="请输入对工具包相关的描述（非必填）"
              :auto-size="{ minRows: 2, maxRows: 6 }"
          />
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>

import {getToolFileList,uploadFile,uploadToolFile} from "@/moudel/apps/developer-tool/api";

export default {
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      toolName:"",
      toolDescription:"",
      file:"",
      toolFileList:[],
      total:0,
      queryParam:{
        currentSize:1,
        pageSize:10,
        name:''
      }
    };
  },
  mounted() {
    this.getToolFileLists();
  },
  methods:{
    async getToolFileLists(){
      let param={
        ...this.queryParam
      }
      let res = await getToolFileList(param);
      if(res.data.code == 0){
        let {total,records} = res.data.data;
        this.total = total;
        this.toolFileList =records
      }else{
        this.$message.error(res.data.message);
      }
    },
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },

    beforeUpload(file){
      this.file =file;
      console.log(file)
      return false;
    },
    handleChanges(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    async handleOk() {
      console.log(111)
      // 提交所有信息，包括文件上传
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append("name",this.toolName)
      formData.append("description",this.toolDescription)
      // 发送请求上传文件和其他信息
      try {
        let res = await uploadToolFile(formData);
        if (res.data.code == 0){
          this.$message.success('上传成功！');
        }
        // 处理成功后的逻辑
      } catch (error) {
        this.$message.error('上传失败！');
      }
    },
  }
};
</script>
<style>
  .content-header{
    text-align: center;
    border-bottom: 2px solid whitesmoke;
    padding-bottom: 20px;
  }
</style>

<template>
  <div class="content-center">
    <a-card class="content">
      <div class="content-header" style="text-align: center">
          <a-input-search size="large" style="width: 80%;" placeholder="请输入工具包名称" enter-button @search="onSearch" />
          <a-button size="large" style="margin-left: 20px;width: 80px;text-align: center">上传</a-button>
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
  </div>
</template>
<script>

import {getToolFileList,uploadFile} from "@/moudel/apps/developer-tool/api";

export default {
  data() {
    return {
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
    }
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

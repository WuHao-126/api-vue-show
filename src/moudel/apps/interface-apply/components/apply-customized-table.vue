<template>
    <div class="content-center">
        <div v-if="list.length===0">
            <a-empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    :image-style="{
                  height: '300px',
                }"
            >
                <span slot="description"> 您还没有定制过接口 </span>
                <a-button type="primary" @click="$router.push('/interface/apply/customized')">
                    现在申请
                </a-button>
            </a-empty>
        </div>
        <a-card v-else style="width: 80%;margin: 0 auto" title="我的接口">
            <a slot="extra" href="#"><a-button type="primary" @click="$router.push('/interface/apply/customized')">继续申请</a-button></a>
            <a-list item-layout="horizontal" :data-source="list" size="small">
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="deleteCustomized(item.id)">取消申请</a>
                    <a-list-item-meta
                            :description="item.demandDescription"
                    >
                        <a slot="title" href="https://www.antdv.com/">{{ item.name }}</a>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </a-card>

    </div>
</template>
<script>
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    import {
        getCustomizedList,
        deleteCustomized
    } from '../api'
    export default {
        data() {
            return {
               data,
                flag:false,
                list:[]
            };
        },
        mounted() {
           this.getCustomizedList();
        },
        methods: {
            async getCustomizedList(){
                let param={

                }
                let res = await getCustomizedList(param)
                if(res.data.code===0){
                   this.list=res.data.data.records
                }
            },
            async deleteCustomized(id){
                let param={
                    id:id
                }
                let res = await deleteCustomized(param)
                if(res.data.code===0){
                   this.$message.success("取消申请成功")
                    this.getCustomizedList()
                }else{
                    this.$message.error("取消申请失败")
                }
            },
        }
    }
</script>
<style scoped>
    .demo-loadmore-list {
        min-height: 350px;
    }
</style>
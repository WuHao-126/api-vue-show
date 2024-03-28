<template>
    <div class="content-center">
        <div class="side">
            <a-menu style="width: 160px" :default-selected-keys="['0']" mode="vertical" @click="typeSearch">
                <a-menu-item key="0">
                    <a-icon type="mail" />
                    全部
                </a-menu-item>
                <a-menu-item :key="item.id" v-for="(item,index) in tags">
                    <a-icon :type="item.other" />
                    {{item.name}}
                </a-menu-item>
            </a-menu>
        </div>
        <div class="list">
            <div class="search">
                <a-input-search v-model="requestParam.name" placeholder="请输入接口名称" size="large" enter-button @search="getInterfaceListPage" />
            </div>
            <div style="margin-top: 10px">
                <a-list :grid="{ gutter: 24, column: 6 }" :data-source="blog" :loading=loading>
                    <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-card hoverable @click="$router.push('/interface/detail/'+item.id)" style="text-align: center;width: 170px">
                            <a-badge :count="item.useTotal">
                                <a-avatar :src="$store.state.interfaceImgUrl+item.cover" :size="64" shape="square" />
                            </a-badge>
                            <p style="margin-top: 20px">{{item.name}}</p>
                            <p>{{item.description}}</p>
                        </a-card>
                    </a-list-item>
                </a-list>
                <div style="text-align: right">
                    <a-pagination  v-model="requestParam.current" :defaultPageSize="requestParam.pageSize" :total="total" show-less-items />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getInterfaceList,
        getTags
    } from './api'
    export default {
        data() {
            return {
                requestParam:{
                    name:'',
                    type:'',
                    current:'',
                    pageSize:18
                },
                tags:[],
                blog:[],
                loading:true,
                total:0
            };
        },
        mounted() {
           this.getInterfaceListPage();
           this.getTags();
        },
        methods:{
            typeSearch(val){
                let id=val.key
                if(id === '0'){
                    this.requestParam.type=''
                    this.requestParam.name=''
                    this.getInterfaceListPage()
                }else{
                    this.requestParam.type=id
                    this.getInterfaceListPage()
                }
            },
            onChange(pageNumber) {
                console.log('Page: ', pageNumber);
            },
            aaa(l){
                console.log(l)
            },
            async getTags(){
               let res=await getTags()
                if(res.data.code===0){
                    this.tags=res.data.data
                }
            },
            async getInterfaceListPage(){
                this.loading=true
                let param={
                    ...this.requestParam
                }
                let res = await getInterfaceList(param);
                this.blog=res.data.data.records
                this.total=res.data.data.total
                this.loading=false
            }
        }
    };
</script>

<style scoped>
.card{
    width: 100px;
}
    .side{
        float: left;
        display: inline-block;
        width: 200px;
        height: 600px;
    }
    .list{
        width: 83%;
        display: inline-block;
    }
</style>
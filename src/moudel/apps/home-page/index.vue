<template>
    <div >
        <div class="box">
            <div class="web-info">
               <span style="font-size: 60px;font-weight: 800;color: black">{{webInfo.name}}</span><br>
               <span style="font-size: 18px">{{webInfo.description}}</span>
                <div style="margin-top: 20px">
                    <a-button @click="$router.push('/interface')" type="primary" style="height: 40px;width: 100px">
                        接口商城
                    </a-button>
                    <a-button @click="goDocument" type="primary" style="margin-left: 20px;height: 40px;width: 100px">
                        开发者文档
                    </a-button>
                </div>
            </div>
            <div class="back-img1"/>
            <div class="back-img2"/>
        </div>

        <div class="home-content" v-if="true">
            <div style="margin-top: 30px">
                <a-timeline mode="alternate">
                    <a-timeline-item>2024.3.23 网站上线运营</a-timeline-item>
                    <a-timeline-item color="green">
                        Solve initial network problems 2015-09-01
                    </a-timeline-item>
                    <a-timeline-item>
                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                    </a-timeline-item>
                    <a-timeline-item color="red">
                        Network problems being solved 2015-09-01
                    </a-timeline-item>
                    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                    <a-timeline-item>
                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
                        Technical testing 2015-09-01
                    </a-timeline-item>
                </a-timeline>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getWebInfo
    } from './api'
    export default {
        name: "index",
        data(){
            return{
                webInfo:''
            }
        },
        mounted() {
            this.getWebInfo()
        },
        methods: {
            async getWebInfo(){
                let res = await getWebInfo();
                if(res.data.code === 0) {
                    this.webInfo = res.data.data
                }
            },
            goDocument(){
                window.open('http://localhost:8080', '_blank');
            }
        },
    }
</script>

<style scoped>
    .box{
        position: relative;
        height: 1000px;
    }
    .back-img1{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 740px;
        background-image: url("../../../assets/background-pattern.png");
        background-size: 100% 100%;
    }
    .back-img2{
        position: absolute;
        width: 600px;
        height: 600px;
        right: 100px;
        top: 20px;
        z-index: 2;
        background-image: url("../../../assets/illustration.png");
        background-size: 100% 100%;
    }
    .home-content{
       width: 100%;
        height: auto;
    }
    .web-info{
        position: absolute;
        width: 700px;
        height: 400px;
        left: 100px;
        top: 60px;
        z-index: 3;

    }
</style>
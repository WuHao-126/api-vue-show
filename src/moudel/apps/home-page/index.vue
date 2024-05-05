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
        <div class="content-center">
            <div style="width: 100%;text-align: center;margin-bottom: 40px;font-size: 50px;font-weight: 800;color: black">
                我们的优势
            </div>
            <a-row :gutter="16" >
                <a-col :span="8">
                    <a-card style="box-shadow: 5px 5px 10px 0px blueviolet;"  :bordered="true" :hoverable="true">
                        <span class="description-title">1、多样化的接口选择</span>
                        <p class="description">平台上提供丰富多样的接口供您选择，涵盖了各个领域的功能和服务。满足不同需求。</p>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card style="box-shadow: 5px 5px 10px 0px red;" :bordered="true" :hoverable="true">
                        <span class="description-title">2、在线调试功能</span>
                        <p class="description">您可以在平台上进行接口在线调试，快速验证接口的功能和效果。节省了开发调试的时问和工作量。</p>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card style="box-shadow: 5px 5px 10px 0px #409EFF;" :bordered="true" :hoverable="true">
                        <span class="description-title">3、客户端SDK支持</span>
                        <p class="description">为了方便开发者集成接口到自己的代码中，平台提供了客户端SDK。使调用接变得更加简单和便捷。</p>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="16" style="margin-top: 30px">
                <a-col :span="8">
                    <a-card style="box-shadow: 5px 5px 10px 0px #67C23A;" :bordered="true" :hoverable="true">
                        <span class="description-title">4、客户端SDK支持</span>
                        <p class="description">平台提供了详细的开发者文档和技术支持，帮助开发者快速接入和发布接口，解决遇到的问题和困难。</p>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card style="box-shadow: 5px 5px 10px 0px #E6A23C;"  :bordered="true" :hoverable="true">
                        <span class="description-title">5、稳定和安全</span>
                        <p class="description">平台致力于提供稳定和安全的接口调用服务，采用了安全措施和技术手段。保障用户数据的安全性。</p>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card style="box-shadow: 5px 5px 10px 0px #F56C6C;"  :bordered="true" :hoverable="true">
                        <span class="description-title">6、开发者论坛</span>
                        <p class="description">平台提供开发者论坛，开发者可以在论坛上提出自己遇到的技术问题，大家共同解决问题</p>
                    </a-card>
                </a-col>
            </a-row>
        </div>
<!--        <div class="home-content" v-if="true">-->
<!--            <div style="margin-top: 30px">-->
<!--                <a-timeline mode="alternate">-->
<!--                    <a-timeline-item>2024.3.23 网站上线运营</a-timeline-item>-->
<!--                    <a-timeline-item color="green">-->
<!--                        Solve initial network problems 2015-09-01-->
<!--                    </a-timeline-item>-->
<!--                    <a-timeline-item>-->
<!--                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />-->
<!--                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque-->
<!--                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto-->
<!--                        beatae vitae dicta sunt explicabo.-->
<!--                    </a-timeline-item>-->
<!--                    <a-timeline-item color="red">-->
<!--                        Network problems being solved 2015-09-01-->
<!--                    </a-timeline-item>-->
<!--                    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>-->
<!--                    <a-timeline-item>-->
<!--                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />-->
<!--                        Technical testing 2015-09-01-->
<!--                    </a-timeline-item>-->
<!--                    <a-timeline-item>-->
<!--                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />-->
<!--                        Technical testing 2015-09-01-->
<!--                    </a-timeline-item>-->
<!--                    <a-timeline-item>-->
<!--                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />-->
<!--                        Technical testing 2015-09-01-->
<!--                    </a-timeline-item>-->
<!--                    <a-timeline-item>-->
<!--                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />-->
<!--                        Technical testing 2015-09-01-->
<!--                    </a-timeline-item>-->
<!--                    <a-timeline-item>-->
<!--                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />-->
<!--                        Technical testing 2015-09-01-->
<!--                    </a-timeline-item>-->
<!--                </a-timeline>-->
<!--            </div>-->
<!--        </div>-->
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
        height: 900px;
    }
    .back-img1{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 830px;
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
    .description-title{
        font-size: 20px;font-weight: 800;color: black
    }
    .description{
        font-size: 14px;margin-top: 10px
    }
</style>
<template>
    <div class="content-center">
        <div style="text-align: center">
            <p style="font-size: 40px;font-weight: 800;color: black;height: 40px">为您的业务做出明智的决定</p>
            <p style="font-size: 16px">从我们给定的三个模块中选择</p>
        </div>
        <div class="box">
            <div class="back">

            </div>
            <a-card class="card"  hoverable :bordered="true">
                <p style="font-size: 30px;font-weight: 800">申请加入</p>
                <a-divider />
                <p>1、需要您提供详细的接口信息</p>
                <p>2、需要您提供合规性证明</p>
                <p>3、请您提供合作条款和条件</p>
                <p>4、请您提供联系方式</p>

                <a-button class="button" @click="applyAdd">
                    申请
                </a-button>
            </a-card>
            <a-card class="card" hoverable  :bordered="true">
                <p style="font-size: 30px;font-weight: 800">申请Key</p>
                <a-divider />
                <p>1、需要您提供详细的接口信息</p>
                <p>2、需要您提供合规性证明</p>
                <p>3、请您提供合作条款和条件</p>
                <p>4、请您提供联系方式</p>
                <a-button class="button1" @click="applyKey()">
                    申请
                </a-button>
            </a-card>
            <a-card class="card" hoverable  :bordered="true">
                <p style="font-size: 30px;font-weight: 800">申请定制</p>
                <a-divider />
                <p>1、需要您提供详细的接口信息</p>
                <p>2、需要您提供合规性证明</p>
                <p>3、请您提供合作条款和条件</p>
                <p>4、请您提供联系方式</p>
                <a-button class="button" @click="applyCustomized">
                    申请
                </a-button>
            </a-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
              current:0
            }
        },
        methods:{
            aaa(){
                console.log(this.$store.state.user)
            },
            async applyKey(){
                let res=await this.$utils.getCurrentLoginUser();
                console.log(res)
                if(res===null){
                    this.$message.error("请先登录")
                    this.$router.push("/login")
                    return
                }
                let user = res.data.data
                if (user.isExistKey){
                    this.$store.commit("updateApplyCurrent",2)
                }else if (user.email ==null){
                    this.$store.commit("updateApplyCurrent",0)
                }else{
                    this.$store.commit("updateApplyCurrent",1)
                }
                this.$router.push("/interface/apply/key")
            },
            async applyCustomized(){
                let res=await this.$utils.getCurrentLoginUser();
                if(res===null){
                    this.$message.error("请先登录")
                    this.$router.push("/login")
                    return
                }
                let user = res.data.data
                if (user.isExistKey){
                    this.$store.commit("updateApplyCurrent",2)
                }else if (user.email ==null){
                    this.$store.commit("updateApplyCurrent",0)
                }
                this.$router.push("/interface/apply/customized/table")
            },
            async applyAdd(){
                let res=await this.$utils.getCurrentLoginUser();
                console.log(res)
                if(res===null){
                    this.$message.error("请先登录")
                    this.$router.push("/login")
                    return
                }
                let user = res.data.data
                if (user.isExistKey){
                    this.$store.commit("updateApplyCurrent",2)
                }else if (user.email ==null){
                    this.$store.commit("updateApplyCurrent",0)
                }else{
                    this.$store.commit("updateApplyCurrent",1)
                }
                this.$router.push("/interface/apply/add")
            }
        }
    }
</script>

<style scoped>
      .card{
          padding: 10px;
          margin: 60px auto;
          width: 360px;
          height: 500px;
          border-radius: 10px;
          color: black;
      }
      .card:nth-child(3){
          position: relative;
          background-color: black;
          color: white;
      }
    .box{
        min-height: 600px;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    .back{
        margin-top: 60px;
        width: 340px;
        height: 500px;
        position: absolute;
        background: linear-gradient(90deg, #44ff9a -.55%, #44b0ff 22.86%, #8b44ff 48.36%, #f64 73.33%, #ebff70 99.34%);
        overflow: hidden;
        filter: blur(30px);
    }
    .button{
        width: 100%;
        height: 40px;
        margin: 30px auto;
    }
    .button1{
      width: 100%;
      height: 40px;
      margin: 30px auto;
        border: 1px solid black;
        color: black;
    }
    .button1:hover{
        border: 1px solid white;
    }
    .button:hover{
        border: 1px solid black;
        background-color: black;
        color: white;
    }

</style>
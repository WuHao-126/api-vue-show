<template>
    <a-layout id="components-layout-demo-fixed" style="background-color: #f5f5f5">
        <a-layout-header class="header" :style="{ position: 'fixed', zIndex: 100, width: '100%' }">
            <div>
                <Header></Header>
            </div>
        </a-layout-header>
        <a-layout-content >
            <div class="content">
                <div  :style="{ background: '#fff', padding: '24px', minHeight: '810px',marginTop:'57px' }">
                    <a-spin v-if="loading" size="large" style="margin-left: 50%;margin-top: 300px" />
                    <router-view />
                </div>
            </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center',backgroundColor:'#f5f5f5' }">
            API Open Platform  ©2024 Author Wu Hao
        </a-layout-footer>
    </a-layout>
</template>
<script>
    import Header from './header'
    export default {
        name: 'Backend',
        components: {
            Header
        },
    }
</script>
<style scoped>
 .header{
     height: 55px;
     background-color: white;
 }
    .content{
        width: 100%;
    }
</style>
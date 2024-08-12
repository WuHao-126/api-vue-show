<template>
    <div class="loading-overlay" v-if="isLoading">
        <div class="loading-message">
            <div style=" margin-top: 300px">
                <a-spin  class="a-spin" size="large" />
            </div>
            <div style="margin-top: 30px;font-size: 25px;color: #409EFF">
                <span>正在加载资源，请稍等 . . . . . .</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default({
        props: {
            isLoading: {
                type: Boolean,
                required: true
            }
        },
    });
</script>

<style scoped>
.loading-message{
    text-align: center;
}
</style>
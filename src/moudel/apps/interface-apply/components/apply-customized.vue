<template>
    <div class="content-center">
        <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content">
            <div v-show="current===0" style="width: 100%">
                <a-card style="width: 90%;margin: 0 auto" title="注意事项">
                    <p>1、申请调用接口的密钥需要您绑定"邮箱"和进行"实名认证"，以便更好的为您服务。</p>
                    <p>2、一个邮箱只能绑定一个账号，绑定过的邮箱不可重复绑定。</p>
                    <p>3、除原证件无效（如：改名、移民）等特殊情况外，实名认证审核通过后将不能修改。</p>
                    <p>4、申请成功后可以获取您的公钥和密钥进行API接口的调用，请您妥善报关，切忌借用他人。</p>
                    <p>5、目前绑定邮箱仅限于QQ邮箱，对您带来的不便敬请谅解。</p>
                </a-card>
                <a-form :form="form" @submit="handleSubmit" style="width: 500px;margin-top: 20px;padding: 20px">
                    <a-form-item v-bind="formItemLayout" label="邮箱">
                        <a-input
                                v-decorator="[
                              'email',
                              {
                                rules: [
                                  {
                                    type: 'email',
                                    message: '请输入正确的邮箱格式!',
                                  },
                                  {
                                    required: true,
                                    message: '请输入邮箱!',
                                  },
                                ],
                              },
                            ]"
                        />
                    </a-form-item>
                    <a-form-item
                            v-bind="formItemLayout"
                            label="验证码"
                            extra="我们必须确认这个邮箱是属于您的"
                    >
                        <a-row :gutter="8">
                            <a-col :span="12">
                                <a-input
                                        v-decorator="[
                                      'code',
                                      { rules: [{ required: true, message: '请输入验证码' }] },
                                    ]"
                                />
                            </a-col>
                            <a-col :span="12">
                                <a-button @click="sendCode" :disabled="isButtonDisabled">
                                    {{ isButtonDisabled ? '已发送 (' + countdown + 's)' : '获取验证码' }}
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form-item>
                    <a-button type="primary" html-type="submit" style="margin-left: 200px;width: 100px">
                        绑定
                    </a-button>
                </a-form>
            </div>
            <div v-show="current===1">
                <a-empty description="该功能暂未开通，请直接下一步" />
            </div>
            <div v-show="current===2">
                <div style="width: 100%">
                    <a-card style="width: 90%;margin: 0 auto" title="说明">
                        <p>1、业务需求描述： 需要您清楚地描述业务需求，包括想要解决的问题、目标和期望的效果。这些信息对于开发团队理解用户需求至关重要。</p>
                        <p>2、功能需求说明： 需要您详细说明想要实现的功能，包括功能的具体特性、操作流程、用户界面设计等方面的要求。尽可能提供具体的示例和案例，有助于开发团队理解和实现功能。。</p>
                        <p>3、技术要求和约束： 需要您说明您的技术环境和要求，包括所用的技术栈、数据存储方式、安全要求等方面的限制和约束。这些信息有助于开发团队选择合适的技术方案和实施方案。</p>
                        <p>4、用户需要提供他们的预算和时间限制，包括可用的资金和资源、期望的项目完成时间等方面的信息。这些信息有助于开发团队制定合理的开发计划和资源分配方案。</p>
                    </a-card>
                    <a-form :form="form1" @submit="handleSubmit1" style="width: 800px;padding-bottom: 20px;margin-top: 30px">
                        <a-form-item  label="接口名称" v-bind="formItemLayout">
                            <a-input
                                    placeholder="请输入您的接口名称"
                                style="width: 535px;display: inline-block"
                                size="large"
                                v-decorator="[
                                  'name',
                                  {
                                    rules: [
                                      {
                                        required: true,
                                        message: '接口名称不可以为空!',
                                      },
                                    ],
                                  },
                                ]"
                            />
                        </a-form-item>
                        <a-form-item  label="您的预算" v-bind="formItemLayout">
                            <a-input
                                    prefix="￥" suffix="元"
                                    placeholder="请输入您的预算"
                                    style="width: 535px;display: inline-block"
                                    size="large"
                                    v-decorator="[
                                  'budget',
                                  {
                                    rules: [
                                      {
                                        required: true,
                                        message: '预算不可以为空!',
                                      },
                                    ],
                                  },
                                ]"
                            />
                        </a-form-item>
                        <a-form-item  label="业务需求描述" v-bind="formItemLayout">
                            <a-textarea
                                    style="width: 600px;display: inline-block"
                                    :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-decorator="[
                                  'demandDescription',
                                  {
                                    rules: [
                                      {
                                        required: true,
                                        message: '业务需求描述不可以为空!',
                                      },
                                    ],
                                  },
                                ]"
                            />
                        </a-form-item>
                        <a-form-item  label="功能需求描述" v-bind="formItemLayout">
                            <a-textarea
                                    :auto-size="{ minRows: 3, maxRows: 5 }"
                                    style="width: 600px;display: inline-block"
                                    v-decorator="[
                                  'functionDescription',
                                  {
                                    rules: [
                                      {
                                        required: true,
                                        message: '功能需求描述不可以为空!',
                                      },
                                    ],
                                  },
                                ]"
                            />
                        </a-form-item>
                        <a-form-item  label="技术要求和限制" v-bind="formItemLayout">
                            <a-textarea
                                    :auto-size="{ minRows: 3, maxRows: 5 }"
                                    style="width: 600px;display: inline-block"
                                    v-decorator="[
                                  'technologyDescription',
                                  {
                                    rules: [
                                      {
                                        required: true,
                                        message: '技术要求和限制不可以为空!',
                                      },
                                    ],
                                  },
                                ]"
                            />
                        </a-form-item>
                        <a-button type="primary" html-type="submit" style="margin-left: 265px;width: 535px;height: 40px">
                            申请定制
                        </a-button>
                    </a-form>
                </div>
            </div>
        </div>
        <div class="steps-action">
            <a-button v-if="current > 0 && current > index" @click="prev">
                上一步
            </a-button>
            <a-button v-if="current < steps.length - 1 && current===0" :disabled="emailButton" type="primary" style="margin-left: 8px" @click="next">
                下一步
            </a-button>
            <a-button v-if="current < steps.length - 1 && current===1" type="primary" style="margin-left: 8px" @click="next">
                下一步
            </a-button>
            <a-button
                    v-if="current == steps.length - 1"
                    style="margin-left: 20px"
                    type="primary"
                    @click="$router.push('/interface/apply/customized/table')"
            >
                返回
            </a-button>
        </div>
    </div>
</template>
<script>
    import {
        sendCode,
        emailBind,
        customizedInterface
    } from '../api'
    export default {
        data() {
            return {
                current: 0,
                steps: [
                    {
                        title: '绑定邮箱',
                        content: 'First-content',
                    },
                    {
                        title: '实名认证',
                        content: 'Second-content',
                    },
                    {
                        title: '描述您的需求',
                        content: 'Last-content',
                    },
                ],
                emailButton:true,
                key:'',
                index:'',
                confirmDirty: false,
                autoCompleteResult: [],
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 8 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                    },
                },
                tailFormItemLayout: {
                    wrapperCol: {
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    },
                },
                isButtonDisabled: false, // 控制按钮是否禁用
                countdown: 60, // 倒计时秒数
                countdownInterval: null, // 倒计时定时器
            };
        },
        mounted() {
            this.current=this.$store.state.applyCurrent
            this.index=this.current;
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'register' });
            this.form1 = this.$form.createForm(this, { name: 'register' });
        },
        methods: {
            next() {
                this.current++;
            },
            prev() {
                if(this.current===this.index){
                    this.$message.error("上一步已经操作完成，请继续")
                    return
                }
                this.current--;
            },
            async sendCode(){
                let email =this.form.getFieldValue('email')
                console.log(email)
                if(email === null || email ===''){
                    this.$message.error("请输入邮箱")
                    return
                }
                let param={
                    email:email
                }
                let res = await sendCode(param)
                if(res.data.code===0){
                    this.isButtonDisabled=true
                    this.$message.success("发送成功，验证码三分钟内有效")
                    this.countdownInterval = setInterval(() => {
                        if (this.countdown > 0) {
                            this.countdown--;
                        } else {
                            clearInterval(this.countdownInterval); // 清除定时器
                            this.isButtonDisabled = false; // 重新启用按钮
                            this.countdown = 60; // 重置倒计时秒数
                        }
                    }, 1000);
                }else if(res.data.code === 4104){
                    this.$message.error("此邮箱已注册")
                }
            },
            async emailBind(values){
                let param={
                    ...values
                }
                let res = await emailBind(param);
                if(res.data.code === 0){
                    this.$message.success("绑定成功")
                    // this.current+=1;
                    this.emailButton=false;
                }
            },
            async handleSubmit(e) {
                e.preventDefault();
                await this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        this.emailBind(values)
                    }
                });
            },
            async customizedInterface(values){
                let param={
                    ...values
                }
                let res = await customizedInterface(param)
                if(res.data.code === 0 ){
                    this.$message.success("申请成功")
                }
            },
            async handleSubmit1(e) {
                e.preventDefault();
                await this.form1.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        this.customizedInterface(values)
                    }
                });
            },
        },
        beforeDestroy() {
            // 组件销毁前清除定时器，防止内存泄漏
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }
        },
    };
</script>
<style scoped>
    .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 300px;
        padding-top: 30px;
    }

    .steps-action {
        margin-top: 24px;
    }
</style>
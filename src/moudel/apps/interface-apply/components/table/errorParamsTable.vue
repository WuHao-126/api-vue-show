<template>
    <div>
        <h4>添加错误码：</h4>
        <a-button class="editable-add-btn" @click="addField" type="primary">
            添加
        </a-button>
        <a-table size="small" bordered :data-source="errorCode" :columns="errorCodeColumns" style="width: 50%;margin-top: 10px" :pagination=false>
            <template
                    v-for="col in ['code', 'description']"
                    :slot="col"
                    slot-scope="text, record, index"
            >
                <div :key="col">
                    <a-input
                            v-if="record.addable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, index, col)"
                    />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record, index">
                <div class="editable-row-operations">
                        <span v-if="record.addable">
                          <a @click="save(record,index)">保存</a>
                          <a-popconfirm style="margin-left: 10px" title="确定要取消吗?" @confirm="() => cancel(index)">
                            <a>取消</a>
                          </a-popconfirm>
                        </span>
                        <span v-else>
                          <a :disabled="editingKey !== ''" @click="edit(record,index)">编辑</a>
                          <a-popconfirm :disabled="editingKey !== ''" title="确定要删除吗?" style="margin-left: 10px" @confirm="() =>onDelete(index)">
                              <a>删除</a>
                          </a-popconfirm>
                        </span>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                errorCodeColumns: [
                    {
                        title: '错误码',
                        dataIndex: 'code',
                        width: '120px',
                        align:"center",
                        scopedSlots: { customRender: 'code' },
                    },
                    {
                        title: '说明',
                        dataIndex: 'description',
                        width: '430px',
                        align:"center",
                        scopedSlots: { customRender: 'description' },
                    },
                    {
                        title: '操作',
                        align:"center",
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                    },
                ],
                errorCode:[],
                oldData:[],
                editingKey: '',
            }
        },
        methods:{
            getData(){
              this.$emit("getErrorCode",this.errorCode)
            },
            //表格删除
            onDelete(indexs) {
                this.errorCode = this.errorCode.filter((_, index) => index !== indexs);
                this.oldData=this.errorCode
                this.getData()
            },
            // 表格添加
            addField() {
                if(this.editingKey !== ''){
                    this.$message.error("请先保存上一条数据")
                    return
                }
                const { errorCode } = this;
                const newData = {
                    addable:true,
                    code: '',
                    description: '',
                };
                this.errorCode = [...errorCode, newData];
                this.editingKey=this.errorCode.length-1
            },
            save(record,index){
                if(record.code === '' || record.description === ''){
                    this.$message.error("请输入完整")
                    return
                }
                const newData = [...this.errorCode];
                const target = newData[index];
                if(target){
                    newData[index].addable = false;
                    this.errorCode = newData;
                    this.editingKey=''
                }
                this.oldData = this.errorCode.map(item => ({ ...item }));
                this.getData()
            },
            edit(record,index) {
                const newData = [...this.errorCode];
                const target = newData[index];
                this.editingKey = index;
                if (target) {
                    newData[index].addable = true;
                    this.errorCode = newData;
                }
            },
            cancel(index) {
                this.errorCode=this.oldData
                this.errorCode.forEach(obj => {
                    obj.addable=false;
                });
                this.editingKey=''
            },
            handleChange(value, index, column) {
                const newData = [...this.errorCode];
                const target = newData[index];
                if (target) {
                    target[column] = value;
                    this.errorCode = newData;
                }
            },
        }
    }
</script>

<style scoped>

</style>
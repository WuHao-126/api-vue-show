<template>
    <div>
        <h4>添加请求头：</h4>
        <a-button class="editable-add-btn" @click="addField" type="primary">
            添加
        </a-button>
        <a-table size="small" bordered :data-source="requestHeaderParams" :columns="requestHeaderColumns" style="width: 50%;margin-top: 10px" :pagination=false>
            <template
                    v-for="col in ['fieldName', 'value']"
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
        name: "requestHeaderTable",
        data(){
            return{
                requestHeaderColumns: [
                    {
                        title: '名称',
                        dataIndex: 'fieldName',
                        width: '120px',
                        align:"center",
                        scopedSlots: { customRender: 'fieldName' },
                    },
                    {
                        title: '值',
                        dataIndex: 'value',
                        width: '430px',
                        align:"center",
                        scopedSlots: { customRender: 'value' },
                    },
                    {
                        title: '操作',
                        align:"center",
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                    },
                ],
                requestHeaderParams:[],
                oldData:[],
                editingKey: '',
            }
        },
        methods:{
            getData(){
              this.$emit("getRequestHeaderParams",this.requestHeaderParams)
            },
            //表格删除
            onDelete(indexs) {
                this.requestHeaderParams = this.requestHeaderParams.filter((_, index) => index !== indexs);
                this.oldData=this.requestHeaderParams
                this.getData()
            },
            // 表格添加
            addField() {
                if(this.editingKey !== ''){
                    this.$message.error("请先保存上一条数据")
                    return
                }
                const { requestHeaderParams } = this;
                const newData = {
                    addable:true,
                    fieldName: '',
                    value: '',
                };
                this.requestHeaderParams = [...requestHeaderParams, newData];
                this.editingKey=this.requestHeaderParams.length-1
            },
            save(record,index){
                if(record.fieldName ==='' || record.value ===''){
                    this.$message.error("请输入完整")
                    return
                }
                const newData = [...this.requestHeaderParams];
                const target = newData[index];
                if(target){
                    newData[index].addable = false;
                    this.requestHeaderParams = newData
                    this.editingKey=''
                }
                this.oldData = this.requestHeaderParams.map(item => ({ ...item }));
                this.getData()
            },
            edit(record,index) {
                const newData = [...this.requestHeaderParams];
                const target = newData[index];
                this.editingKey = index;
                if (target) {
                    newData[index].addable = true;
                    this.requestHeaderParams = newData;
                }
            },
            cancel(index) {
                this.requestHeaderParams=this.oldData
                this.requestHeaderParams.forEach(obj => {
                    obj.addable=false;
                });
                this.editingKey=''
            },
            handleChange(value, index, column) {
                const newData = [...this.requestHeaderParams];
                const target = newData[index];
                if (target) {
                    target[column] = value;
                    this.requestHeaderParams = newData;
                }
            },
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <h4>添加请求参数：</h4>
        <a-button class="editable-add-btn" @click="addField" type="primary">
            添加
        </a-button>
        <a-table size="small" bordered :data-source="requestFieldParams" :columns="requestParamColumns" style="width: 50%;margin-top: 10px" :pagination=false>
            <template
                    v-for="col in ['fieldName', 'type','required','description']"
                    :slot="col"
                    slot-scope="text, record, index"
            >
                <div :key="col">
                    <a-input
                            v-if="record.addable && col !== 'type' && col !== 'required'"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, index, col)"
                    />
                    <a-select default-value="否" style="width: 120px" v-model="record.type" v-if="record.addable && col === 'type'">
                        <a-select-option value="string">
                            string
                        </a-select-option>
                        <a-select-option value="int">
                            int
                        </a-select-option>
                    </a-select>
                    <a-select default-value="否" style="width: 120px" v-model="record.required" v-if="record.addable && col === 'required'">
                        <a-select-option value="是">
                            是
                        </a-select-option>
                        <a-select-option value="否">
                            否
                        </a-select-option>
                    </a-select>
                    <template v-if="!record.addable">
                        {{ text }}
                    </template>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record, index">
                <div class="editable-row-operations">
                        <span v-if="record.addable">
                          <a @click="save(record,index)">保存</a>
                          <a-popconfirm style="margin-left: 10px" title="确定要取消吗" @confirm="() => cancel(index)">
                            <a>取消</a>
                          </a-popconfirm>
                        </span>
                    <span v-else>
                          <a :disabled="editingKey !== ''" @click="edit(record,index)">编辑</a>
<!--                          <a :disabled="editingKey !== ''" style="margin-left: 10px" @click="onDelete(index)">删除</a>-->
                          <a-popconfirm :disabled="editingKey !== ''" style="margin-left: 10px" title="确定要删除吗" @confirm="() => onDelete(index)">
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
                requestParamColumns: [
                    {
                        title: '名称',
                        dataIndex: 'fieldName',
                        key:'fieldName',
                        width: '120px',
                        align:"center",
                        scopedSlots: { customRender: 'fieldName' },
                    },
                    {
                        title: '类型',
                        dataIndex: 'type',
                        key:'type',
                        width: '120px',
                        align:"center",
                        scopedSlots: { customRender: 'type' },
                    },
                    {
                        title: '必填',
                        dataIndex: 'required',
                        key:'required',
                        width: '100px',
                        align:"center",
                        scopedSlots: { customRender: 'required' },
                    },
                    {
                        title: '描述',
                        dataIndex: 'description',
                        key:'description',
                        scopedSlots: { customRender: 'description' },
                        align: 'center',
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        key:'operation',
                        align:"center",
                        scopedSlots: { customRender: 'operation' },
                    },
                ],
                requestFieldParams:[],
                oldData:[],
                editingKey: '',
            }
        },
        methods:{
            getData(){
                this.$emit("getRequestFieldParams",this.requestFieldParams)
            },
            //表格删除
            onDelete(indexs) {
                this.requestFieldParams = this.requestFieldParams.filter((_, index) => index !== indexs);
                this.oldData=this.requestFieldParams
                this.getData()
            },
            // 表格添加
            addField() {
                if(this.editingKey !== ''){
                    this.$message.error("请先保存上一条数据")
                    return
                }
                const { requestFieldParams } = this;
                const newData = {
                    addable:true,
                    fieldName: '',
                    type:'string',
                    required:'否',
                    description:'',
                    value: '',
                };
                this.requestFieldParams = [...requestFieldParams, newData];
                this.editingKey=this.requestFieldParams.length-1
            },
            save(record,index){
                if(record.fieldName ==='' || record.description ===''){
                    this.$message.error("请输入完整")
                    return
                }
                const newData = [...this.requestFieldParams];
                const target = newData[index];
                if(target){
                    newData[index].addable = false;
                    this.requestFieldParams = newData;
                    this.editingKey=''
                }
                this.oldData = this.requestFieldParams.map(item => ({ ...item }));
                //向父组件发送数据
                this.getData()
            },
            edit(record,index) {
                const newData = [...this.requestFieldParams];
                const target = newData[index];
                this.editingKey = index;
                if (target) {
                    newData[index].addable = true;
                    this.requestFieldParams = newData;
                }
            },
            cancel(index) {
                this.requestFieldParams=this.oldData
                this.requestFieldParams.forEach(obj => {
                    obj.addable=false;
                });
                this.editingKey=''
            },
            handleChange(value, index, column) {
                const newData = [...this.requestFieldParams];
                const target = newData[index];
                if (target) {
                    target[column] = value;
                    this.requestFieldParams = newData;
                }
            },
        }
    }
</script>

<style scoped>

</style>
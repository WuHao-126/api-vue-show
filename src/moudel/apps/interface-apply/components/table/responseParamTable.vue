<template>
    <div>
        <h4>添加返回参数：</h4>
        <a-button class="editable-add-btn" @click="addField" type="primary">
            添加
        </a-button>
        <a-table size="small" bordered :data-source="responseFieldParams" :columns="responseParamColumns" style="width: 50%;margin-top: 10px" :pagination=false>
            <template
                    v-for="col in ['fieldName', 'type','description']"
                    :slot="col"
                    slot-scope="text, record, index"
            >
                <div :key="col">
                    <a-input
                            v-if="record.addable && col!=='type'"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange1(e.target.value, index, col)"
                    />
                    <a-select default-value="否" style="width: 120px" v-model="record.type" v-if="record.addable && col === 'type'">
                        <a-select-option value="string">
                            string
                        </a-select-option>
                        <a-select-option value="int">
                            int
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
    // import {addInterfaceInfo, getInterfaceTags} from "@/modules/apps/interface/api";

    export default {
        name: "requestHeaderTable",
        data(){
            return{
                responseParamColumns: [
                    {
                        title: '名称',
                        dataIndex: 'fieldName',
                        width: '120px',
                        align:"center",
                        scopedSlots: { customRender: 'fieldName' },
                    },
                    {
                        title: '类型',
                        dataIndex: 'type',
                        width: '120px',
                        align:"center",
                        scopedSlots: { customRender: 'type' },
                    },
                    {
                        title: '描述',
                        dataIndex: 'description',
                        scopedSlots: { customRender: 'description' },
                        width: '300px',
                        align:"center",
                        align: 'center',
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        align:"center",
                        scopedSlots: { customRender: 'operation' },
                    },
                ],
                responseFieldParams:[],
                oldData:[],
                editingKey: '',
            }
        },
        methods:{
            getData(){
                this.$emit("getResponseFieldParams",this.responseFieldParams)
            },
            //表格删除
            onDelete(indexs) {
                this.responseFieldParams = this.responseFieldParams.filter((_, index) => index !== indexs);
                this.oldData=this.responseFieldParams
                this.getData()
            },
            // 表格添加
            addField() {
                if(this.editingKey !== ''){
                    this.$message.error("请先保存上一条数据")
                    return
                }
                const { responseFieldParams } = this;
                const newData = {
                    addable:true,
                    type:'string',
                    fieldName: '',
                    description:'',
                    value: '',
                };
                this.responseFieldParams = [...responseFieldParams, newData];
                this.editingKey=this.responseFieldParams.length-1
            },
            save(record,index){
                if(record.fieldName ==='' || record.description ===''){
                    this.$message.error("请输入完整")
                    return
                }
                const newData = [...this.responseFieldParams];
                const target = newData[index];
                if(target){
                    newData[index].addable = false;
                    this.responseFieldParams = newData;
                    this.editingKey=''
                }
                this.oldData = this.responseFieldParams.map(item => ({ ...item }));
                this.getData()
            },
            edit(record,index) {
                const newData = [...this.responseFieldParams];
                const target = newData[index];
                this.editingKey = index;
                if (target) {
                    newData[index].addable = true;
                    this.responseFieldParams = newData;
                }
            },
            cancel(index) {
                this.responseFieldParams=this.oldData
                this.responseFieldParams.forEach(obj => {
                    obj.addable=false;
                });
                this.editingKey=''
            },
            handleChange1(value, index, column) {
                const newData = [...this.responseFieldParams];
                const target = newData[index];
                if (target) {
                    target[column] = value;
                    this.responseFieldParams = newData;
                }
            },
        }
    }
</script>

<style scoped>

</style>
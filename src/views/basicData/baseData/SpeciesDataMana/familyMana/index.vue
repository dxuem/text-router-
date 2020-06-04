
<!--
* descript:科类管理
* author：dxuem
* createDate：2020-05-25
-->
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="搜索物种-科">
                <a-input v-model="queryParam.col_name_cn" placeholder="请输入中文名或拉丁名" />
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="delete" />删除
            </a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2">
              <a-button type="link" style="color:#000" @click="auditMul">批量审核</a-button>
              <!-- <a-icon type="audit" @click="auditMul"/>批量审核 -->
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            更多操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="col_name_cn" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">{{text}}</a>
            <a-divider type="vertical" />
          </template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleAudit(record)">审核</a>
            <a-divider type="vertical" />
          </template>
        </span>
      </s-table>
      <!-- 新建，编辑，审核 -->
      <step-by-step-modal
        ref="detailModal"
        :visible="Dvisible"
        :loading="confirmLoading"
        @cancel="cancelDetail"
        @ok="handleOk"
        :rowData="mdl"
        :popState="popState"
      />
      <!-- <step-by-step-modal ref="modal" @ok="handleOk" /> -->
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

import StepByStepModal from './colDetail'
// import CreateForm from './modules/CreateForm'

const columns = [
  {
    title: '科',
    dataIndex: 'col_name_cn',
    scopedSlots: { customRender: 'col_name_cn' }
  },
  {
    title: '科拉丁名',
    dataIndex: 'col_name',
    scopedSlots: { customRender: 'col_name' }
  },
  {
    title: '目',
    dataIndex: 'order',
    scopedSlots: { customRender: 'order' }
  },
  {
    title: '纲',
    dataIndex: 'class',
    scopedSlots: { customRender: 'class' }
  },
  {
    title: '门',
    dataIndex: 'phylum',
    scopedSlots: { customRender: 'phylum' }
  },
  {
    title: '物种数量',
    dataIndex: 'recordNum',
    sorter: true,
    needTotal: true,
    customRender: text => text + ' 种'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    // CreateForm,
    StepByStepModal
  },
  data() {
    this.columns = columns
    return {
      popState:"",
      // create model
      visible: false,
      Dvisible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getServiceList(requestParameters).then(res => {
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd() {
      this.Dvisible = true;
      this.$refs.detailModal.btnText='保存'
      // this.$refs.detailModal.form.grade='5'
    },
    handleDetail(record) {
      this.Dvisible = true
      this.$refs.detailModal.btnText='保存'
      for(let key in this.$refs.detailModal.form){
        if(record.hasOwnProperty(key)){
          this.$refs.detailModal.form[key]=record[key]
        }
      }
      this.$refs.detailModal.form.grade='5'
      this.$refs.detailModal.form.super_id=record.order
    },
    handleAudit(record) {
      this.Dvisible = true
      this.$refs.detailModal.btnText='审核通过'
      for(let key in this.$refs.detailModal.form){
        if(record.hasOwnProperty(key)){
          this.$refs.detailModal.form[key]=record[key]
        }
      }
      this.$refs.detailModal.form.grade='5'
      this.$refs.detailModal.form.super_id=record.order
    },
    handleOk(saveObj) {
      const form = this.$refs.detailModal.$refs.ruleForm
      this.confirmLoading = true
      form.validateField((errors, values) => {
        if (!errors) {
          if(!values.grade){values.grade="5"}
          if (this.mdl) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
              this.$message.info('保存成功')
              this.Dvisible=false
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
              this.$message.info('新增成功')
              this.Dvisible=false
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    cancelDetail(){
      this.Dvisible = false
      const form = this.$refs.detailModal.$refs.ruleForm
      // form.resetFields() // 清理表单数据（可不做）
      for(let key in this.$refs.detailModal.form){
          this.$refs.detailModal.form[key]=''
      }
      this.$refs.detailModal.currentStep=0
    },
    handleSub(record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    auditMul(){
    
      this.$confirm({
        title: '确认对所选的内容进行审核',
        content: h => <div style="color:red;">确认对所选的内容进行审核</div>,
        onOk() {
          this.handleOk();//调用保存方法
        },
        onCancel() {},
        class: 'test',
      });
    }
  }
}
</script>

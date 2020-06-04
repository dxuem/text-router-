<!--
* descript:科类维护
* author：dxuem
* createDate：2020-05-25
-->
<template>
  <div v-if="visible">
    <a-modal
      title="新建物种-科信息"
      :width="780"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="() => { $emit('cancel') }"
      :destroyOnClose="true"
      class="dialog"
    >
      <a-spin :spinning="confirmLoading">
        <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
          <a-step title="选择级别" />
          <a-step title="输入信息" />
        </a-steps>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <!-- step1 -->
          <div v-show="currentStep === 0">
            <a-form-model-item label="级别" :wrapperCol="wrapperCol" prop="grade">
              <!-- <dRadio :value="grade" @onChange="getGrade" /> -->
              <a-radio-group
                v-model="form.grade"
                name="radioGroup"
                @change="getGrade"
              >
                <a-radio
                  v-for="item in Options"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</a-radio>
              </a-radio-group>
              <!-- <a-input v-decorator="['name', {rules: [{required: true}]}]" /> -->
            </a-form-model-item>
            <a-form-model-item label="上级类别" :wrapperCol="wrapperCol" prop="super_id">
              <a-auto-complete
                style="width:100%"
                v-show="showInput"
                v-model="form.super_id"
                :data-source="dataSource"
                :placeholder="placeholder"
                @select="onSelect"
                @search="onSearch"
              >
                <!-- <a-input :placeholder='placeholder' class="custom" @keypress="handleKeyPress" /> -->
              </a-auto-complete>
            </a-form-model-item>
          </div>
          <!-- step1 end -->
          <!-- step2 -->
          <div v-show="currentStep === 1">
            <a-form-model-item label="COL ID" required :wrapperCol="wrapperCol" prop="col_id">
              <a-input placeholder="请输入ID" v-model="form.col_id" />
              <!-- <a-button style="width:20%" type="primary" @click="generateUUID" >生成ID</a-button> -->
            </a-form-model-item>
            <a-form-model-item label="拉丁名" required disabled :wrapperCol="wrapperCol" prop="col_name">
              <a-input-search
                v-model="form.col_name"
                placeholder="请输入拉丁名"
                enter-button
                @search="onSearchName"
              />
              <!-- <a-input v-decorator="['col_name', {rules: [{required: true,message: '不能为空!' }]}]" style="width:95%" />
              <a-icon class="iconRight" type="search" @click="searchMenu" />-->
            </a-form-model-item>
            <a-form-model-item label="中文名" required :wrapperCol="wrapperCol" prop="col_name_cn">
              <a-input
                v-model="form.col_name_cn"
                placeholder="请输入中文名"
              />
            </a-form-model-item>
          </div>
          <!-- step2 end -->
        </a-form-model>
      </a-spin>
      <template slot="footer">
        <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }">上一步</a-button>
        <a-button key="cancel" @click="() => { $emit('cancel') }">取消</a-button>
        <a-button
          key="forward"
          :loading="confirmLoading"
          type="primary"
          @click="handleNext(currentStep)"
        >{{ currentStep === 1 && btnText || '下一步' }}</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import pick from 'lodash.pick'
import dRadio from '@/components/Radio/radio.vue'
import { superT} from '@/api/specices'
import { getSuperList } from '@/api/manage'
const uuid = require('uuid/v4')

const stepForms = [
  ['grade', 'super_id'],
  ['col_id', 'col_name', 'col_name_cn']
]
export default {
  name: 'Detail',
  components: {
    dRadio
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // model: {
    //   type: Object,
    //   default: () =>
    //     function() {
    //       return {}
    //     }
    // },
    rowData:{
      type: Object,
      default: () =>
        function() {
          return {}
        }
    },
    popState: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      btnText:'保存',
      Options: [
        {
          label: '界',
          value: '1'
        },
        {
          label: '门',
          value: '2'
        },
        {
          label: '纲',
          value: '3'
        },
        {
          label: '目',
          value: '4'
        },
        {
          label: '科',
          value: '5'
        }
      ],
      dataSource: [], //上级类别
      placeholder: '请输入目中文名/拉丁名搜索',
      showInput: true,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      // visible: false,
      confirmLoading: false,
      currentStep: 0,
      form: {
        grade: '5',
        super_id: '',
        col_id: '',
        col_name: '',
        col_name_cn: '',
        order:'',//目
        class:'',//纲
        phylum:'',//门
        recordNum:'',//物种数量
        col_rank:'',//等级
      },
      type:'order',
      rules: {
        grade: [
          { required: false, message: '', trigger: 'blur' }
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        super_id: [{ required: false, message: '', trigger: 'change' }],
        col_id: [{ required: true, message: '不能为空！', trigger: 'change' }],
        col_name: [
          {
            required: true,
            message: '不能为空！',
            trigger: 'change'
          }
        ],
        col_name_cn: [{ required: true, message: '不能为空！', trigger: 'change' }]
      }
    }
  },
  mounted(){
    
  },
  methods: {
    handleNext(step) {
      const currentStep = step + 1
      if (currentStep <= 1) {
        // stepForms
        this.$refs.ruleForm.validateField(stepForms[this.currentStep], (errors, values) => {
          if (!errors) {
            this.currentStep = currentStep
          }
        })
        return
      }
      // 完成
      this.$refs.ruleForm.validateField(stepForms[this.currentStep], (errors, values) => {
          if (!errors) {
            this.confirmLoading = true
            
        if (!values.grade) {
          values.grade = '5'
        }
        
          setTimeout(() => {
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    backward() {
      this.currentStep--
    },
    // 当前选择级别
    getGrade(val) {
      switch (val) {
        case '1': {
          this.placeholder = ''
          this.showInput = false
          break
        }
        case '2': {
          this.placeholder = '请输入界中文名/拉丁名搜索'
          this.showInput = true
          break
        }
        case '3': {
          this.placeholder = '请输入门中文名/拉丁名搜索'
          this.showInput = true
          this.form.col_rank='phylum'
          
          break
        }
        case '4': {
          this.placeholder = '请输入纲中文名/拉丁名搜索'
          this.showInput = true
          this.form.col_rank='class'
          break
        }
        case '5': {
          this.placeholder = '请输入目中文名/拉丁名搜索'
          this.showInput = true
          this.form.col_rank='order'
          break
        }
      }
    },
    // 上级类别
    onSelect(value) {
      console.log('onSelect', value)
    },
    // 上级类别查询
    onSearch(searchText) {
      getSuperList({ rank: this.form.col_rank, keyword:searchText}).then(res => {
            this.form.super_id=res.curr_id;//赋值上级类别id和名称
            }).catch(err => {
            setTimeout(1)
            // clearInterval(interval)
            this.requestFailed(err)
          })
      // this.dataSource = !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]
    },
    requestFailed (err) {
      this.isLoginError = true
      console.log(err)
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },
    onSearchName(searchText) {
      this.$refs.ruleForm.validateField( ['col_name'], (errors, values) => {
          if (!errors) {
            let url = 'http://www.catalogueoflife.org/col/search/all/key/' + searchText + '/fossil/1/match/1'
      window.open(url)
        } else {
          this.confirmLoading = false
        }
      })
      
    },
    handleKeyPress(ev) {
      console.log('handleKeyPress', ev)
    },
    // 生成ID
    generateUUID() {
      // let { formVals } = this.state;
      this.stepForms[1].col_id = uuid().replace(/-/g, '')
      // this.setState({
      //   formVals
      // })
    },
    // initForm() {
    //   
    //   if (this.popState !== 'add') {
    //     for (let i = 0; i < stepForms.length; i++) {
    //       for (let key in stepForms[i]) {
    //       }
    //     }
        // stepForms
        // this.form.setFieldsValue(pick(this.model, stepForms))
    //   }
    // }
  },
  mounted() {
    // this.initForm()
    // 当 model 发生改变时，为表单设置值
    // this.$watch('model', () => {
    //   this.model && this.form.setFieldsValue(pick(this.model, stepForms))
    // })
  }
}
</script>
<style>
.dialog .ant-modal-body {
  padding: 32px;
}
</style>
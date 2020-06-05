<!--
* descript:物种维护
* author：dxuem
* createDate：2020-06-02
-->
<template>
  <a-modal
    title="物种基本信息维护"
    :width="960"
    :visible="visible"
    :okText="btnText"
    cancelText="取消"
    :confirmLoading="loading"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-row>
        <a-col :span="12">
          <a-form-item label="COL ID" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="COL(CN)ID" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
        <a-form-item label="COL拉丁名" props="col_id">
          <a-input
          v-model="col_id"
            v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
          />
        </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item label="COL(CN)拉丁名" props="col_id">
          <a-input
          v-model="col_id"
            v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
          />
        </a-form-item>
        </a-col>
        </a-row>
        <a-col :span="12">
          <a-form-item label="COL科名" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="COL(CN)中文名" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
        <a-form-item label="COL属名" props="col_id">
          <a-input
            v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
          />
        </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item label="COL亚属名" props="col_id">
          <a-input
            v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
          />
        </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
          <a-form-item label="COL物种信息级别" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="COL种名" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
        <a-form-item label="COL亚种名" props="col_id">
          <a-input
          v-model="col_id"
            v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
          />
        </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item label="COL亚种名maker" props="col_id">
          <a-input
            v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
          />
        </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
          <a-form-item label="COL物种名状态" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="COL作者" props="col_id">
            <a-input
            v-model="col_id"
              v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-col>
        </a-row>
    </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'id']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data() {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form:{

      },
      // form: this.$form.createForm(this),
      confirmLoading: false,
      btnText:"保存"
    }
  },
  created() {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>

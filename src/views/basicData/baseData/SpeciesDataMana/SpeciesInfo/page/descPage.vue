<template>
<div ref="desc" id="desc-body">
  <a-list class="desc-list" item-layout="horizontal" :data-source="data">
    <!-- <a-list-item slot="renderItem" slot-scope="item, index"> -->
      <ul slot="renderItem" slot-scope="item, index">
      <!-- <a-col :span="24"> -->
        <li class="desc-listItem">
      <div class="desc-title">{{ item.title }}<a-button type="link" @click='editDesc(index)'>编辑</a-button></div>
      <!-- </a-col>
      <a-row> -->
        <div class="desc-description" v-show="!item.isedit">{{item.desc}}</div>
        <textarea v-show="item.isedit" @blur="handleBlur(index)" class="desc-description-txt" style="width:100%" v-model="item.desc" resize="none"></textarea>
        <a-divider></a-divider>
      </li>
      <!-- </a-row> -->
      </ul>
      <!-- <a-list-item-meta
        :description="item.desc"
      > -->
      <!-- <p> -->
        <!-- <span class="desc-title" slot="title" href="https://www.antdv.com/">{{ item.title }}<a-button type="link" @click='editDesc(index)'>编辑</a-button></span> -->
      <!-- </p> -->
      <!-- </a-list-item-meta> -->
    <!-- </a-list-item> -->
  </a-list>
  </div>
</template>
<script>
export default {
  props:{
    data:{type:Array,default:function(){
      return []
    }}
  },
  data() {
    return {
      isedit:false,
      index:''
    };
  },
  methods:{
    editDesc(index){
      this.data[index].isedit=true
      document.addEventListener('click', this.hidePanel, false)
      this.index=index
      // this.isedit=true
    },
    hidePanel (e) {
    if (!this.$refs.desc.contains(e.target)) {
      this.handleBlur(this.index)
      // this.data[this.index].isedit = false
      // document.removeEventListener('click', this.hidePanel, false)
      // this.hide()
    }
    },
    handleBlur(index){
     this.data[index].isedit =false
     document.removeEventListener('click', this.hidePanel, false)
    }
  },
  // mounted(){
  // }
};
</script>
<style>
.desc-list .ant-list-item-meta-description{
  padding-top: 12px;
    color:rgba(0, 0, 0, 0.5) !important
}
.desc-title{
    font-size:20px;
    width:23%
    /* font-weight:bold */
}
.desc-list .ant-list-item{
  padding:12px 0 35px 0;
}
.desc-list .desc-listItem{
  padding:0 0 35px 0;
}
.desc-list .desc-description{
  padding-top:16px;
  color:rgba(0, 0, 0, 0.5)
}
.desc-list .desc-description-txt{
  color:rgba(0, 0, 0, 0.5);
  /* border:#C2c2c2 */
  margin-top:16px
}
.desc-list .desc-listItem .ant-divider-horizontal{
  margin:10px 0
}
</style>
<!--
* description: 单选框（值列表）
* author: dxuem
* createdDate: 2020-05-25
-->
<template>
  <a-radio-group name="radioGroup" default-value="5" :v-model="value" @change="onChange">
    <a-radio v-for="item in Options" :value="item.value" :key="item.value">
      {{item.label}}
    </a-radio>
  </a-radio-group>
</template>
<script>
export default {
    name: 'dRadio',
    props:{
        value:{type:String,default:"5"}
    },
    data(){
        return{
            // Options:this.getOptions(),
            Options:[
                {
                    label:"界",
                    value:"1"
                },
                {
                    label:"门",
                    value:"2"
                },
                {
                    label:"纲",
                    value:"3"
                },
                {
                    label:"目",
                    value:"4"
                },
                {
                    label:"科",
                    value:"5"
                }
        ]
    }
},
methods:{
    onChange(val){
        this.$emit('onChange',val.target.value)
    },
    // 从接口取得数据
    getOptioins(){

    }
}
};
</script>
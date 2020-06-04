<template>
  <a-list class="desc-list" item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        :description="item.desc"
      >
        <span class="desc-title" slot="title" href="https://www.antdv.com/">{{ item.title }}</span>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
const data = [
  {
    title: '外观描述',
    desc:'色彩鲜艳而体小(12厘米)的。嘴红色,前额天鹅绒黑色,头后、背及尾紫罗兰色,初级飞羽具亮蓝色闪辉。雄鸟眼后具一道黑色眉纹。下体偏粉色,颏近白。幼鸟色暗而嘴近黑。虹膜－黄色,眼周裸露皮肤偏红；嘴－红色而端黑；脚－红褐'
  },
  {
    title: '常见生境',
    desc:'栖息于常绿阔叶林和针阔混交林。'
  },
  {
    title: '常见海拔',
    desc:'暂无数据'
  },
  {
    title: '常见季节',
    desc:'留鸟'
  },
];
export default {
  data() {
    return {
      data,
    };
  },
};
</script>
<style>
.desc-list .ant-list-item-meta-description{
  padding-top: 12px;
    color:rgba(0, 0, 0, 0.6) !important
}
.desc-title{
    font-size:20px;
    /* font-weight:bold */
}
.desc-list .ant-list-item{
  padding:12px 0 50px 0;
}
</style>

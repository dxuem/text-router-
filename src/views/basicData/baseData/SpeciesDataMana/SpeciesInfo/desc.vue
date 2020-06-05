<!--
* descript:物种详情
* author：dxuem
* createDate：2020-06-02
-->
<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
              <!-- 图片，从主网格带过来 -->
            <div class="avatar">
              <img :src="form.cover_img">
            </div>
            <div class="username">{{ form.colcn_name_cn }}</div>
            <div class="bio">{{form.colcn_name}}</div>
            <div class="bio">{{form.family_col_name_cn}}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title"></i>濒危等级
              <a-button type="link">{{form.threaten_grade}}</a-button>
            </p>
            <p>
              <i class="group"></i>保护等级
              <a-button type="link">{{form.protection_grade}}</a-button>
            </p>
          </div>
          <a-divider/>
          <div class="account-center-tags">
            <div class="tagsTitle">俗名</div>
            <div>
              <template v-for="(tag, index) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag
                    :key="tag"
                    :closable="index !== 0"
                    :close="() => handleTagClose(tag)"
                  >{{ `${tag.slice(0, 20)}...` }}</a-tag>
                </a-tooltip>
                <a-tag
                  v-else
                  :key="tag"
                  :closable="index !== 0"
                  :close="() => handleTagClose(tag)"
                >{{ tag }}</a-tag>
              </template>
              <a-input
                v-if="tagInputVisible"
                ref="tagInput"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="tagInputValue"
                @change="handleInputChange"
                @blur="handleTagInputConfirm"
                @keyup.enter="handleTagInputConfirm"
              />
              <a-tag v-else @click="showTagInput" style="background: #fff; borderStyle: dashed;">
                <a-icon type="plus"/>New Tag
              </a-tag>
            </div>
          </div>
          <a-divider :dashed="true"/>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <desc-page :data="descdata" v-if="noTitleKey === 'desc'"></desc-page>
          <moni-record :data="imgdata" v-else-if="noTitleKey === 'record'"></moni-record>
          <images v-else-if="noTitleKey === 'images'"></images>
          <!-- <moni-record v-else-if="noTitleKey === 'record'"></moni-record>
          <images v-else-if="noTitleKey === 'images'"></images> -->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { DescPage, MoniRecord, Images, SoundLib, SpecimenLib } from './page/index.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    RouteView,
    PageView,
    DescPage,
    MoniRecord,
    Images,
    SoundLib,
    SpecimenLib
  },
  data () {
    return {
      descdata:[
        {
          title: '外观描述',
          desc:'暂无数据',
          isedit:false
        },
        {
          title: '常见生境',
          desc:'暂无数据',
          isedit:false
        },
        {
          title: '常见海拔',
          desc:'暂无数据',
          isedit:false
        },
        {
          title: '常见季节',
          desc:'暂无数据',
          isedit:false
        },
        {
          title: '物种习性',
          desc:'暂无数据',
          isedit:false
        },
        {
          title: '常见分布',
          desc:'暂无数据',
          isedit:false
        },
],
imgdata:[],
      form:{
      descNum:'0',
      recordNum:'0',
      imageNum:'0',
      soundNum:'0',
      sampleNum:'0',
      threaten_grade:'',//濒危等级
      protection_grade:'',//保护等级
      cover_img:'',//封面
      colcn_name_cn:'',//物种名称
      colcn_name:'',//物种拉丁名
      family_col_name_cn:'',//科
      },
      tags: [],
      tagInputVisible: false,
      tagInputValue: '',
      teams: [],
      teamSpinning: true,
      tabListNoTitle: [
        {
          key: 'desc',
          tab: '描述'
        },
        {
          key: 'record',
          tab: '监测记录(0)'
        },
        {
          key: 'images',
          tab: '图片库(0)'
        },
        {
          key: 'soundLib',
          tab: '声音库(0)'
        },
        {
          key: 'sampleLib',
          tab: '标本库(0)'
        }
      ],
      
      
      noTitleKey: 'record'
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  mounted () {
    this.getTeams()
    this.initdata(this.$route.params)
  },
  methods: {
    initdata(results){
    let that=this;
    for(let key in this.form){
        if(results.hasOwnProperty(key)){
          this.form[key]=results[key]
        }
      }
      for(let i=0;i<results.illustration.common_names.length;i++){
          that.tags.push(results.illustration.common_names[i].commonname)
        }
        // let temp=results.illustration.commonname.splice(',')
        // that.tags.push(results.illustration.commonname)
      // }
      this.form.cover_img=results.illustration.cover_img
      this.form.threaten_grade=results.illustration.threaten_grade
      this.form.protection_grade=results.illustration.protection_grade
      this.form.imageNum=results.illustration.pictures.length
      this.form.soundNum=results.illustration.sounds.length
      this.tabListNoTitle=[
        {
          key: 'desc',
          tab: '描述'
        },
        {
          key: 'record',
          tab: '监测记录('+this.form.recordNum+')'
        },
        {
          key: 'images',
          tab: '图片库('+this.form.imageNum+')'
        },
        {
          key: 'soundLib',
          tab: '声音库('+this.form.soundNum+')'
        },
        {
          key: 'sampleLib',
          tab: '标本库('+this.form.sampleNum+')'
        }
      ]
      // 描述页
      this.descdata[0].desc=results.illustration.appearance  
      this.descdata[1].desc=results.illustration.habitat
      this.descdata[2].desc=results.illustration.common_alt
      this.descdata[3].desc=results.illustration.common_season
      this.descdata[4].desc=results.illustration.habit
      this.descdata[5].desc=results.illustration.distribution
      for(let i=0;i<this.descdata.length;i++){
        if(!this.descdata[i].desc){
          this.descdata[i].desc='暂无数据'
        }
      }
      //图片库
      for(let i=0;i<results.illustration.pictures.length;i++){
        this.imgdata.push({url:results.illustration.pictures[i].url})
      }
      // 页签
      this.noTitleKey=results.tabSuatus

    },
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },
    handleTabChange (key, type) {
      this[type] = key
    },
    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },
    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },
    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },
    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>

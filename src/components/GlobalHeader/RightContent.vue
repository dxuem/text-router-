<template>
  <div :class="wrpCls">
    <a-col class="iconRight-col">
            <a-icon class="iconRight" type="search" @click="searchMenu" />
            <a-input v-show="showsearch" style="width:45%"></a-input>
            <a-icon class="iconRight" type="question-circle" />
            <a-icon class="iconRight" type="bell" />
            <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <select-lang :class="prefixCls" />
          </a-col>
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showsearch:false,
      showMenu: true,
      currentUser: {}
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.topMenu && this.isMobile) && this.theme || 'light'}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: 'Serati Ma'
      }
    }, 1500)
  },
  methods:{
    searchMenu() {
      this.showsearch = this.showsearch;
    },
  }
}
</script>
<style>
.iconRight-col .iconRight {
    margin-right: 15px;
  
}
</style>
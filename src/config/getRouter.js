import {
  getMenu
} from '@/api/manage'
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}
import {
  UserLayout,
  BasicLayout,
  BlankLayout
} from '@/layouts'
import {
  bxAnaalyse
} from '@/core/icons'
var menuList = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: 'menu.home',
    icon: ''
  },
  redirect: '/baseData/SpeciesDataMana/familyMana',
  children: []
}]
export function getChild(parentMenu){
  debugger
  if(parentMenu.children){
    parentMenu.component=RouteView;
    for(let k=0;k<parentMenu.children.length;k++){
      getChild(parentMenu.children[k])
    }
  }
}
export function getRouter() {
  // let menuList=[]
  getMenu().then((res) => {
    for (let i = 0; i < res.result.data.length; i++) {
      menuList[0].children.push(res.result.data[i])
      if (res.result.data[i].children) {
        menuList[0].children[i].component = RouteView
        for(let j=0;j<menuList[0].children[i].children.length;j++){
          getChild( menuList[0].children[i].children[j])
        }
      }
    }
    // menuList = res.result.data
  })
  // menuList.push(
  // {
  //   path: '/',
  //   name: 'index',
  //   component: () => import('@/layouts/BasicLayout.vue'),
  //   meta: {
  //     title: 'menu.home'
  //   },
  //   redirect: '/baseData/SpeciesDataMana/familyMana',
  //   children: [{
  //     path: '/baseData',
  //     title: "保护区基础数据管理",
  //     key: "",
  //     name: "basciData",
  //     component: RouteView,
  //     redirect: "/baseData/SpeciesDataMana/familyMana",
  //     children: [{
  //       path: '/baseData/SpeciesDataMana',
  //       title: "物种信息管理",
  //       key: "species",
  //       component: RouteView,
  //       icon: "dashboard",
  //       children: [{
  //           path: '/baseData/SpeciesDataMana/familyMana',
  //           title: "科类管理",
  //           key: "familyMana",
  //           icon: "",
  //           component: () => import('@/views/basicData/baseData/SpeciesDataMana/familyMana/index.vue'),
  //         },
  //         {
  //           path: '/baseData/SpeciesDataMana/SpeciesInfo',
  //           title: "物种信息",
  //           key: "SpeciesInfo",
  //           icon: "",
  //           component: () => import('@/views/basicData/baseData/SpeciesDataMana/SpeciesInfo/index.vue'),
  //         },
  //       ]
  //     }, ]
  //   }]
  // })
  menuList.push({
    path: '*',
    redirect: '/404',
    hidden: true
  })
  return menuList
}
export default menuList
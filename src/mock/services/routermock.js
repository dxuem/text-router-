import Mock from 'mockjs2'
import {
  builder,
  getQueryParameters
} from '../util'

const totalCount = 5701
const routerM = (option) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  message = "",
    result = [{
      title: "保护区基础数据管理",
      key: "",
      name: "basciData",
      component: "BasicLayout",
      redirect: "/basciData/familyMana",
      children: [{
          title: "物种信息管理",
          key: "species",
          component: "RouteView",
          icon: "dashboard",
          children: [{
              title: "科类管理",
              key: "familyMana",
              icon: ""
            },
            {
              title: "物种信息",
              key: "SpeciesInfo",
              icon: ""
            },
          ]
        },
        {
          title: "系统管理",
          key: "system",
          component: "PageView",
          icon: "setting",
          children: [{
              title: "用户管理",
              key: "userList"
            },
            {
              title: "角色管理",
              key: "roleList"
            },
            {
              title: "权限管理",
              key: "tableList"
            }
          ]
        }
      ]
    }]
  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

Mock.mock(/\/api\/route\/route/, 'get', routerM)
/** 
 * descript:科类管理请求
 * author：dxuem
 * createDate：2020-05-29
**/
import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const superT = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
        child_id:'5',
        curr_id:'4',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"唇形目",
    //   class: '木兰纲',
    //   col_id: tmpKey,
    //   col_name: 'Bignoniaceae',
    //   col_name_cn: '紫葳科',
    //   order: '唇形目',
    //   phylum: '维管植物门',
    //   key: tmpKey,
    //   recordNum: Mock.mock('@integer(1, 999)'),
    //   editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const projects = () => {
  return builder({
    'data': [{
        child_id:'5',
        curr_id:'41',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"唇形目1",
    },
    {
        child_id:'5',
        curr_id:'42',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"唇形目2",
    },
    {
        child_id:'4',
        curr_id:'31',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"木兰纲1",
    },
    {
        child_id:'4',
        curr_id:'3',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"木兰纲2",
    },
    {
        child_id:'3',
        curr_id:'21',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"维管植物门1",
    },
    {
        child_id:'3',
        curr_id:'22',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"维管植物门2",
    },
    {
        child_id:'2',
        curr_id:'11',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"界1",
    },
    {
        child_id:'2',
        curr_id:'12',
        // curr_name:"Bignoniaceae",
        curr_name_cn:"界2",
    }
    ],
    'pageSize': 10,
    'pageNo': 0,
    'totalPage': 6,
    'totalCount': 57
  })
}

const activity = () => {
  return builder([{
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '蓝莓酱',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划'
    },
    time: '2018-08-23 09:35:37'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '创建',
      event: '番组计划'
    },
    time: '2017-05-27 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: '@image(64x64)'
    },
    project: {
      name: '高逼格设计天团',
      action: '更新',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)'
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  }
  ])
}

const teams = () => {
  return builder([{
    id: 1,
    name: '科学搬砖组',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  },
  {
    id: 2,
    name: '程序员日常',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
  },
  {
    id: 1,
    name: '设计天团',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
  },
  {
    id: 1,
    name: '中二少女团',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
  },
  {
    id: 1,
    name: '骗你学计算机',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
  }
  ])
}

const radar = () => {
  return builder([{
    item: '引用',
    '个人': 70,
    '团队': 30,
    '部门': 40
  },
  {
    item: '口碑',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: '产量',
    '个人': 50,
    '团队': 60,
    '部门': 40
  },
  {
    item: '贡献',
    '个人': 40,
    '团队': 50,
    '部门': 40
  },
  {
    item: '热度',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: '引用',
    '个人': 70,
    '团队': 50,
    '部门': 40
  }
  ])
}

Mock.mock(/\/api\/specices\/superT/, 'post', superT)
// Mock.mock(/\/list\/search\/projects/, 'get', projects)
// Mock.mock(/\/specices\/activity/, 'get', activity)
// Mock.mock(/\/specices\/teams/, 'get', teams)
// Mock.mock(/\/specices\/radar/, 'get', radar)
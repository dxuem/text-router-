import Mock from 'mockjs2'
import {
  builder,
  getQueryParameters
} from '../util'

const totalCount = 5701

const serverList = (options) => {
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
      class: '木兰纲',
      col_id: tmpKey,
      col_name: 'Bignoniaceae',
      col_name_cn: '紫葳科',
      order: '唇形目',
      phylum: '维管植物门',
      key: tmpKey,
      recordNum: Mock.mock('@integer(1, 999)'),
      editable: false
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
const speciesList = (options) => {
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
      col_author: "Swainson, 1820",
      col_family_id: "7cfb7e1af2437870b858e4ca63d7f71c",
      col_fullname: "<i>Sitta frontalis</i> Swainson, 1820",
      col_genus: "Sitta",
      col_id: "661e8eac356146e2c108c6fecb3076a9",
      col_infraspecies: "",
      col_infraspecies_marker: "",
      col_name: "Sitta frontalis",
      col_name_cn_status: "",
      col_name_status: "accepted name",
      col_rank: "Species",
      col_species: "frontalis",
      col_subgenus: "",
      col_url: "http://www.catalogueoflife.org/col/details/species/id/661e8eac356146e2c108c6fecb3076a9",
      colcn_id: "bdc484b8-93a0-4285-87f1-b191c45c1428",
      colcn_name: "Sitta frontalis",
      colcn_name_cn: "绒额䴓",
      colcn_url: "http://www.sp2000.org.cn/species/show_species_details/bdc484b8-93a0-4285-87f1-b191c45c1428",
      family_col_name: "Sittidae",
      family_col_name_cn: "䴓科",
      family_col_rank: "Family",
      family_col_rank_cn: "科",
      recordNum: Mock.mock('@integer(1, 999)'),
      editable: false,
      illustration: {
        appearance: "色彩鲜艳而体小(12厘米)的。嘴红色,前额天鹅绒黑色,头后、背及尾紫罗兰色,初级飞羽具亮蓝色闪辉。雄鸟眼后具一道黑色眉纹。下体偏粉色,颏近白。幼鸟色暗而嘴近黑。虹膜－黄色,眼周裸露皮肤偏红；嘴－红色而端黑；脚－红褐。",
        common_alt: "",
        common_names: [{
          commonname: "绒额䴓"
        }],
        common_season: "留鸟",
        cover_img: "http://rims-dev.oss-cn-shenzhen.aliyuncs.com/image/8418a2ca680b0d93fa59e8fabeafa437.jpg",
        distribution: "西藏东南部、云南南部及西部、广西、贵州。",
        habit: "成对或成家族群活动于森林的树干和树枝上,常从树顶至底部。行动敏捷,常围绕树干攀爬寻找昆虫。",
        habitat: "栖息于常绿阔叶林和针阔混交林。",
        illustration_id: "46f48bdfbf0b4a51b0f9cb755c1afa9c",
        protection_grade: "",
        sounds: [],
        species_id: "661e8eac356146e2c108c6fecb3076a9",
        threaten_grade: "低度关注（LC）",
        pictures: [{
            url: "http://rims-dev.oss-cn-shenzhen.aliyuncs.com/image/8418a2ca680b0d93fa59e8fabeafa437.jpg"
          },
          {
            url: "http://rims-dev.oss-cn-shenzhen.aliyuncs.com/image/999518ce37f163f5fe8b20003359121f.jpg"
          },
          {
            url: "http://rims-dev.oss-cn-shenzhen.aliyuncs.com/image/e1e053aa765bef7ec82ebed988230e0a.jpg"
          }
        ]
      }
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
        class: '木兰纲',
        col_id: '012454b20f7e1d7a1efc03d9b86f398b',
        col_name: 'Bignoniaceae',
        col_name_cn: '紫葳科',
        order: '唇形目',
        phylum: '维管植物门',
        recordNum: 1
      },
      {
        class: '木兰纲',
        col_id: '016d4ba0525a434ef9388efc388533de',
        col_name: 'Nyctaginaceae',
        col_name_cn: '紫茉莉科',
        order: '石竹目',
        phylum: '维管植物门',
        recordNum: 0
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

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/species\/list/, 'get', speciesList)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
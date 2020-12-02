import request from '@/utils/request'

// 下拉框获取项目
export function getProject(query){
  return request({
    url: '/project/mes_project/getProject',
    method: 'get',
    params: query
  })
}

// 获取楼层
export function buildingNofindList(data){
  return request({
    url: '/project/buildinginfo/findList',
    method: 'post',
    data: data
  })
}

// 查询数据
export function projectBudgetPlanList(data){
  return request({
    url: '/project/projectBudgetPlan/list',
    method: 'post',
    data: data
  })
}
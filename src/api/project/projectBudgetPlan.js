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

// 查询数据
export function projectBudgetPlanTurnSave(data){
  return request({
    url: '/project/projectBudgetPlan/turnSave',
    method: 'post',
    data: data
  })
}

// 总计划查询
export function projectMasterPlanList(query){
  return request({
    url: '/project/project_master_plan/list',
    method: 'get',
    params: query
  })
}

// 删除总计划
export function projectMasterPlanRemove(data) {
  return request({
    url: '/project/project_master_plan/remove',
    method: 'delete',
    data:data
  })
}

// 新增施工总计划
export function projectMasterPlanAdd(data){
  return request({
    url: '/project/project_master_plan/add',
    method: 'post',
    data: data
  })
}

// 修改施工总计划
export function projectMasterPlanEdit(data){
  return request({
    url: '/project/project_master_plan/edit',
    method: 'post',
    data: data
  })
}

// 甘特图搜索
export function getGanttDatas(query){
  return request({
    url: '/project/project_master_plan/getGanttDatas',
    method: 'get',
    params: query
  })
}
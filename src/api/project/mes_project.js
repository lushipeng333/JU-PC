import request from '@/utils/request'

// 查询项目列表
export function listMes_project(query) {
  return request({
    url: '/project/mes_project/list',
    method: 'get',
    params: query
  })
}

// 项目新增
export function addMes_project(data) {
  return request({
    url: '/project/mes_project/add',
    method: 'post',
    data: data
  })
}

// 项目名是否存在
export function getProjectName(query) {
  return request({
    url: '/project/mes_project/getProjectName',
    method: 'get',
    params: query
  })
}

// 窗号是否存在
export function getProjectDetailWinNo(query) {
  return request({
    url: '/project/mes_project_detail/getProjectDetailWinNo',
    method: 'get',
    params: query
  })
}

// 添加详情
export function addMes_project_detail(data) {
  return request({
    url: '/project/mes_project_detail/add',
    method: 'post',
    data: data
  })
}

// 项目修改 // 指派项目负责人
export function updateMes_project(data) {
  return request({
    url: '/project/mes_project/edit',
    method: 'put',
    data: data
  })
}

// 项目审核
export function checkEditMes_project(data) {
  return request({
    url: '/project/mes_project/checkEdit',
    method: 'put',
    data: data
  })
}

// 状态维护
export function statusMes_project(data) {
  return request({
    url: '/project/mes_project/status',
    method: 'put',
    data: data
  })
}


// 指派安装班组
export function editProjecTeamByprojectId(data) {
  return request({
    url: '/project/mes_project/editProjecTeamByprojectId',
    method: 'put',
    data: data
  })
}

// 修改详情
export function updateMes_project_detail(data) {
  return request({
    url: '/project/mes_project_detail/edit',
    method: 'put',
    data: data
  })
}

// 查看详情
export function listMes_project_detail(projectId) {
  return request({
    url: '/project/mes_project_detail/list?projectId=' + projectId ,
    method: 'get',

  })
}

// 删除详情
export function removeDetailMes_project(data) {
  return request({
    url: '/project/mes_project_detail/removeDetail',
    method: 'delete',
    data:data
  })
}

// 下载模板
export function importTemplate(query) {
  return request({
    url: '/project/mes_project/importTemplate',
    method: 'get',
    params: query
  })
}

// 导入文件
export function importData(data) {
  return request({
    url: '/project/mes_project/importData',
    method: 'post',
    data: data
  })
}

// 提交审核
export function releaseProject(data) {
  return request({
    url: '/project/mes_project/releaseProject',
    method: 'put',
    data: data
  })
}

// 删除项目
export function removeMes_project(data) {
  return request({
    url: '/project/mes_project/remove',
    method: 'delete',
    data:data
  })
}

// 下拉框获取项目
export function getProject(query){
  return request({
    url: '/project/mes_project/getProject',
    method: 'get',
    params: query
  })
}

// 获取项目负责人
export function getManager(query) {
  return request({
    url: '/project/mes_project/getManager',
    method: 'get',
    params: query
  })
}

// 获取项目状态
export function getcheckStatus() {
  return request({
    url: '/system/dict/data/type/check_status',
    method: 'get',
  })
}

// 获取项目类型
export function getProjectType() {
  return request({
    url: '/system/dict/data/type/project_type',
    method: 'get',
  })
}

// 查询项目详细
export function getMesProjectById(projectId){
  return request({
    url: '/project/mes_project/getMesProjectById?projectId=' + projectId ,
    method: 'get'
  })
}

// 获取安装班组
export function getTeam(){
  return request({
    url:'/project/mes_project/getTeam',
    method: 'get'
  })
}


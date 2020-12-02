import request from '@/utils/request'


// 查询列表
export function listchangeFiles(query) {
  return request({
    url: '/project/changefiles/list',
    method: 'get',
    params: query
  })
}

// 编辑
export function changefilesAdd(data) {
  return request({
    url: '/project/changefiles/edit',
    method: 'post',
    data: data
  })
}

// 添加
export function Addchangefiles(data) {
  return request({
    url: '/project/changefiles/add',
    method: 'post',
    data: data
  })
}

// 删除项目
export function removeProject_changefiles(id) {
  return request({
    url: '/project/changefiles/remove?id=' + id,
    method: 'delete'
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
// 查看详情
export function listproject_detail(id) {
  return request({
    url: '/project/changefilesDetails/list?id=' + id ,
    method: 'get',

  })
}

// 查询单个列表
export function listchange_detail(id) {
  return request({
    url: '/project/changefiles/get_one?id=' + id ,
    method: 'get',
  })
}

// 查询单个详情列表
export function getProjectChangefilesDetailsById(id) {
  return request({
    url: '/project/changefilesDetails/get_one?id=' + id ,
    method: 'get',
  })
}

// 删除详情
export function removeDetailchangefiles_project(data) {
  return request({
    url: '/project/changefilesDetails/removeDetails',
    method: 'delete',
    data:data
  })
}

// 添加详情
export function addchangefilesDetails(data) {
  return request({
    url: '/project/changefilesDetails/add?changefilesId=' + data.changefilesId,
    method: 'post',
    data: data.projectChangefilesDetails
  })
}

// 窗号是否存在
export function getProjectDetailWinNo(query) {
  return request({
    url: '/project/changefilesDetails/findProjectDetail',
    method: 'get',
    params: query
  })
}

// 修改详情
export function updateChangefilesDetails(data) {
  return request({
    url: '/project/changefilesDetails/edit?changefilesId=' + data.changefilesId,
    method: 'post',
    data: data.projectChangefilesDetails
  })
}

// 项目审核
export function checkProjectChange(data) {
  return request({
    url: '/project/changefiles/checkProjectChange',
    method: 'post',
    data: data
  })
}

// 查询当前登录账号
export function getInfo(){
  return request({
    url:'/getInfo',
    method: 'get'
  })
}
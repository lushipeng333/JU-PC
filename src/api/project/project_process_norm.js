import request from '@/utils/request'

// 查询项目列表
export function listproject_process_norm(query){
  return request({
    url: '/project/project_process_norm/list',
    method: 'get',
    params: query
  })
}

// 项目添加
export function addproject_process_norm(data) {
  return request({
    url: '/project/project_process_norm/add',
    method: 'post',
    data: data
  })
}

// 项目修改
export function updateproject_process_norm(data) {
  return request({
    url: '/project/project_process_norm/edit',
    method: 'post',
    data: data
  })
}

// 删除详情
export function removeproject_process_norm(data) {
  return request({
    url: '/project/project_process_norm/remove',
    method: 'delete',
    data:data
  })
}

// 查询项目详细
export function getMesProjectById(processNormId){
  return request({
    url: '/project/project_process_norm/getProjectProcessNormById?processNormId=' + processNormId,
    method: 'get'
  })
}

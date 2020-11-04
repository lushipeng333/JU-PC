import request from '@/utils/request'

// 全部窗号查询
export function Allwindow(query){
  return request({
    url: '/project/project_process/getWinModel',
    method: 'get',
    params: query
  })
}

// 列表查询
export function project_processList(data){
  return request({
    url: '/project/project_process/list',
    method: 'post',
    data: data
  })
}

// 修改保存
export function project_processEdit(data){
  return request({
    url: '/project/project_process/edit',
    method: 'post',
    data: data
  })
}

// 窗型工序树
export function processTreeList(query){
  return request({
    url: '/project/project_process/processTreeList',
    method: 'get',
    params: query
  })
}

// 分配窗型施工工序
export function distributionSave(data) {
  return request({
    url: '/project/project_process/distributionSave',
    method: 'post',
    data: data
  })
}

// 复制窗型
export function copySave(data) {
  return request({
    url: '/project/project_process/copySave',
    method: 'post',
    data: data
  })
} 
// 复制窗型获取新窗型信息
export function getCopyNewWinModel(query){
  return request({
    url: '/project/project_process/getCopyNewWinModel',
    method: 'get',
    params: query
  })
}
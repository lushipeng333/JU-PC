import request from '@/utils/request'
// 消息中心通知列表查询
export function listMessage(query) {
  return request({
    url: '/system/message/list',
    method: 'get',
    params: query
  })
}
// 通知已读
export function editMessage(messageId){

  return request({
    url:'/system/message/edit/' + messageId,
    method:'put',
  })
}
//未读通知数量
export function indexMessage(){
  return request({
    url:'/system/message/indexMessage',
    method:'get',

  })
}
//全部已读
export function updateAll(){
  return request({
    url:'/system/message/updateAll',
    method:'put',

  })
}
// 添加日期范围
export function addDateRange(params, dateRange) {
	var search = params;
	search.beginTime = "";
	search.endTime = "";
	if (null != dateRange && '' != dateRange) {
		search.beginTime = this.dateRange[0];
		search.endTime = this.dateRange[1];
	}
	return search;
}

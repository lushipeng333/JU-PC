<template>
  <div class="xiaoxi">
    <div class="xiaoxi_nav">
      <ul>
        <li @click="readAll">全部已读</li>
        <li :class="{'notChoose' : multiple}" :disabled="multiple"  @click="signRead">标记已读</li>
      </ul>
    </div>
    <div class="xiaoxi_content">
      <div class="left">

      </div>
      <div class="right">
        <div class="right_top">
          <div class="top_nav">
            <div class="nav_left">
              <span>消息通知 {{ messageNumber }}</span>
            </div>
            <div class="nav_right" style="display: flex;">
              <ul>
                <li :class="{'navRigtClick':index === navRight}" v-for="(item,index) in navRightLi" :key="index" @click="navRightLiClick(index)">{{item.value}}</li>
              </ul>

              <div class="inquire" @click="inquire">
                <span>查询</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
          </div>
          <div class="conceal" v-show="inquires">
            <div class="conceal_left">

              <div class="conceleft">
                <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
                  <el-row style="padding: 0;">
                    <el-col :span="8">
                      <el-form-item label="发送人" prop="createBy">
                    <el-input v-model="queryParams.createBy" placeholder="请输入用户名称" clearable @clear="rest" size="mini"
                      style="width: 100%; padding-top: 4px;" @keyup.enter.native="handleQuery" />
                  </el-form-item>
                    </el-col>
                     <el-col :span="8">
                       <el-form-item label="日期" prop="interval">
                    <el-select v-model="queryParams.interval" placeholder="日期" clearable @clear="rests" size="mini"
                      style="width: 100%;">
                      <el-option v-for="dict in cityList" :key="dict.dictValue" :label="dict.value" :value="dict.label" />
                    </el-select>
                  </el-form-item>
                     </el-col>
                  <el-col :span="8">
                    <el-form-item>
                    <div class="concel_right" @click="handleQuery">
                      <p>
                        查询
                      </p>

                    </div>
                  </el-form-item>
                  </el-col>

                  </el-row>

                </el-form>
              </div>
            </div>

          </div>
          <div class="top_navlist">
            <el-table :data="data1" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="序号" align="center" type="index" />
              <el-table-column label="消息内容" align="center" prop="content" width="300" :show-overflow-tooltip="true" />
              <el-table-column label="发送人" align="center" prop="createBy" :show-overflow-tooltip="true" />
              <el-table-column label="发送时间" align="center" prop="createTime" />
              <el-table-column label="是否已读" align="center" prop="isRead">
                <template slot-scope="scope">
                  <span v-if="scope.row.isRead == 2">未读</span>
                  <span v-else-if="scope.row.isRead == 1">已读</span>
                </template>
              </el-table-column>
              <el-table-column label="驳回备注" align="center" prop="remark" />
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
              @pagination="getList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    listMessage,
    editMessage,
    indexMessage,
    updateAll,
    addDateRange
  } from "@/api/system/message";
  export default {
    name: "message",
    data() {
      return {
        // 非多个禁用
        multiple: true,
        // 消息个数
        messageNumber: '',
        // 选中数组id
        ids: [],
        // 选中数组状态
        reads: [],
        // 总条数
        total: 0,
        // 查询按钮
        inquires: false,
        input1: '',
        single: false,
        leftlistnum: 0,
        model3: '',
        cityList: [{
            label: 0,
            value: '一周内'
          },
          {
            label: 1,
            value: '一个月内'
          },
          {
            label: 2,
            value: '三个月内'
          },
          {
            label: 3,
            value: '半年内'
          },
          {
            label: 4,
            value: '一年内'
          }
        ],
        navRight: '',
        navRightLi: [{
            value: '一周内'
          },
          {
            value: '一月内'
          },
          {
            value: '三月内'
          }
        ],
        data1: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          interval: undefined,
          isRead: undefined,
          createBy: undefined,
        },
        message: {
          messageId: '',
          isRead: ''
        }

      }
    },
    created() {
      this.getList()
      indexMessage()
        .then(res => {
          this.messageNumber = res.data
        })
    },
    methods: {
      rests() {
        this.queryParams.interval = undefined
      },
      rest() {
        this.queryParams.createBy = undefined
      },
      // 查询
      handleQuery() {
        this.queryParams.page = 1;
        this.getList();

      },
      /** 查询消息列表 */
      getList() {
        listMessage(this.queryParams).then(response => {
          this.total = response.total;
          this.data1 = response.rows

        });
        indexMessage()
          .then(res => {
            this.messageNumber = res.data
          })
      },
      // 全部已读
      readAll() {
        updateAll()
          .then(response => {
            this.msgSuccess("操作成功");
            this.getList();
          }).catch(req => {
            this.msgSuccess("操作失败");
          });
      },
      // 标记已读
      signRead() {
        const messageId = this.ids;
        editMessage(messageId)
          .then(response => {
            this.msgSuccess("操作成功");
            this.getList();
          }).catch(req => {
            this.msgSuccess("操作失败");
          });
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map((item) => item.messageId)
        this.reads = selection.map((item) => item.isRead)
        this.multiple = !selection.length;
      },
      leftlistclick(index) {
        this.leftlistnum = index
      },
      inquire() {
        this.inquires = !this.inquires
      },
      navRightLiClick(index) {
        this.queryParams.page = 1;
        this.navRight = index
        this.queryParams.interval = index
        listMessage(this.queryParams).then(response => {
          this.total = response.total;
          this.data1 = response.rows
        });
        indexMessage()
          .then(res => {
            this.messageNumber = res.data
          })
      },
    }
  }
</script>

<style scoped="scoped">
	.xiaoxi{
		width: 100%;
		height: 100%;
	}
  /* 选中标记按钮是否操作 */
  .notChoose{
    opacity: 0.8;
    pointer-events:none;
  }
  /* 导航栏背景 */
  .xiaoxi_nav {
    width: 100%;
    height: 40px;
    background-image: linear-gradient(#4886c5, #145494);

    padding: 5px;
  }

  /* 导航栏下的ul li 样式设置 */
  .xiaoxi_nav ul li {
    float: left;
    line-height: 28px;
    color: white;
    border: 1px solid #5681af;
    font-size: 0.75rem;
    height: 28px;
    width: 58px;
    text-align: center;
    border-radius: 5px;
    background-image: linear-gradient(#71a1d2, #174f89);
    cursor: pointer;
    margin-left: 14px;
  }
  .xiaoxi_nav ul li:hover {
    /* opacity: 0.6; */
    background-image: linear-gradient(#92bde5, #1f548b);
  }
  /* 内容 */
  .xiaoxi_content {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    border: 1px solid #c0c0c0;
    display: flex;
  }

  /* 左侧内容 */
  .left {
    width: 250px;
    height: 100%;
    background-color: #efefef;
    font-size: 0.875rem;
  }

  .left ul {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .left ul li {
    /* margin-top: 16px; */
    width: 100%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  .leftclick {
    color: #d1762f;
    background-image: linear-gradient(#fce5d1, #f9dcbf);
    border: 1px solid #eab88f;
    border-radius: 5px;
  }

  .left ul li:nth-child(2) {
    padding-left: 40px;
  }

  .left ul li:nth-child(3) {
    padding-left: 40px;
  }

  .left ul li:nth-child(4) {
    padding-left: 40px;
  }

  /* 右侧内容 */
  .right {
    width: 100%;
    height: 100%;
    /* background-color: #efefef; */
    overflow: auto;

  }

  .right_top {
    width: 100%;
    height: 50%;
    border: 1px solid #b4b4b6;
    border-width: 0px 0px 0px 1px;
  }

  .right_bottom {
    width: 100%;
    height: 50%;
    border: 1px solid #b4b4b6;
    border-width: 1px 0px 0px 1px;
  }

  /* 右侧导航栏 */
  .top_nav {
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(#ffffff, #e9e9e9);
    font-size: 0.875rem;
    color: #000000;
    border-bottom: 1px solid #b4b4b6;
    width: 100%;
    height: 32px;
    line-height: 32px;
  }

  .top_nav ul li {
    float: left;
    cursor: pointer;
  }

  .nav_right ul {
    margin-right: 60px;

  }

  .nav_right ul li {
    width: 80px;
    height: 22px;
    /* background-color: #0077AA; */
    margin-top: 5px;
    line-height: 22px;
    border: 1px solid #c7c8c8;
    text-align: center;
  }

  .navRigtClick {

    border: 1px solid #6396ca;
    color: #186ec6;
    background-image: linear-gradient(#dbebf7, #b6daf8);
  }

  .nav_right ul li:nth-child(1) {
    border-radius: 10px 0px 0px 0px;
  }

  .nav_right ul li:nth-child(3) {
    border-radius: 0px 0px 10px 0px;
  }

  .processed {
    margin-right: 60px;
  }

  .processed span {
    margin-left: 10px;
  }

  .processed input {}

  .inquire {
    cursor: pointer;
    margin-right: 40px;
  }

  /* 隐藏/显示 */
  .conceal {
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(#ffffff, #e9e9e9);
    font-size: 0.875rem;
    color: #000000;
    border-bottom: 1px solid #b4b4b6;
    width: 100%;
    height: 36px;
    line-height: 36px;
  }

  .conceleft {
    margin-left: 20px;
  }
.conceleft div{
  display: flex;
}
  .conceal_left {
    display: flex;
  }

  .concel_right {
    margin-right: 40px;

    text-align: center;
  }

  .concel_right p {
    cursor: pointer;
    width: 50px;
    height: 26px;
    border: 1px solid #c9c9c9;
    background-image: linear-gradient(#fdfdfe, #e4e5e7);
    border-radius: 12px 0px 12px 0px;
    margin-top: 5px;
    line-height: 26px;
  }

  /* 脚步内容 */
  .bottom_nav {
    width: 100%;
    height: 100px;
    background-image: linear-gradient(#fdfdfe, #f5f5f6);
    border-bottom: 1px solid #c1c1c3;
    font-size: 0.625rem;
    color: #000000;
    display: flex;
    justify-content: space-between;
  }

  .bottom_nav_left {
    /* padding-top: 16px; */
  }

  .bottom_nav_left p {
    margin-top: 20px;
  }

  .bottom_nav_right {
    padding-top: 20px;
  }

  .bottom_nav_right span {
    margin-left: 30px;
  }
</style>

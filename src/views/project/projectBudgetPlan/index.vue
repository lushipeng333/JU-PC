<template>
  <div class="projectBudgetPlan">
      <div class="top">
      <ul>
        <li @click="turnSaveClick">转施工总计划</li>
      </ul>
      </div>
      <div class="conter">

        <div class="left">
         <div class="left_bottom">
           <div class="message">
             <div class="messagenav">
               快速查询
             </div>
           </div>
           <div class="messageli">
             <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
               <el-form-item label="项目名称:">
                 <el-select v-model="queryParams.projectId" clearable placeholder="请选择项目名称" size="mini" @change="buildingNolist">
                   <el-option v-for="dict in projectOptions" :key="dict.projectId" :label="dict.projectName" :value="dict.projectId" />
                 </el-select>
               </el-form-item>
               <el-form-item label="预算计划:">
                 <el-select v-model="queryParams.menuLevel" clearable placeholder="请选择预算计划" size="mini" @change="isshow">
                   <el-option v-for="dict in budget_planOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                 </el-select>
               </el-form-item>
              <el-form-item label="楼栋:" v-show="ismenuLevel">
                <el-select v-model="queryParams.buildingNo" clearable placeholder="请选择楼栋" size="mini" @change="floorNolist">
                  <el-option v-for="dict in buildingNoList" :key="dict.buildingNo" :label="dict.buildingNo" :value="dict.buildingNo" />
                </el-select>
              </el-form-item>
              <el-form-item label="楼层:" v-show="ismenuLevels">
                <el-select v-model="queryParams.floorNo" clearable placeholder="请选择楼层" size="mini">
                  <el-option v-for="dict in floorNoList" :key="dict.floorNo" :label="dict.floorNo" :value="dict.floorNo" />
                </el-select>
              </el-form-item>
               <el-form-item>
                 <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">计划预算</el-button>
                 <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
               </el-form-item>
             </el-form>
           </div>
         </div>
        </div>
        <div class="right">
             <el-table :data="buildinginfoList" @selection-change="handleSelectionChange" height="100%">
               <el-table-column type="selection" width="50" align="center" />
               <el-table-column label="序号" align="center" type="index" />
               <el-table-column label="项目名称" align="center" prop="projectName" :show-overflow-tooltip="true" />
               <el-table-column label="工序类别" align="center" prop="processType" :show-overflow-tooltip="true"　:formatter="processTypeFormat" />
               <el-table-column label="里程碑施工时间(小时)" width="180">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.hours" :disabled="true"></el-input>
               </template>
               </el-table-column>
               <el-table-column label="组数" prop="groupNumber">
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.groupNumber"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="人数/组"  prop="numberGroup">
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.numberGroup"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="小时/天"  prop="hourDate" >
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.hourDate"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="运输时间(小时)"  prop="transportDate" >
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.transportDate"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="浮动时间(小时)"  prop="floatDate" >
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.floatDate"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="总人数"  prop="floorType" >
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.numberGroup*scope.row.groupNumber" :disabled="true"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="施工时间(天)"  prop="totalHour" >
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.totalHour" :disabled="true"></el-input>
                 </template>
               </el-table-column>
             </el-table>
        </div>
      </div>

  </div>
</template>

<script>
  import {
    getProject,
    buildingNofindList,
    projectBudgetPlanList
  } from "@/api/project/projectBudgetPlan.js";
  export default{
    name:'projectBudgetPlan',
    data(){
      return{
         // 查询参数
         queryParams:{
             projectId:"",
             menuLevel:"",
             buildingNo:"",
             floorNo:""
         },
         // 项目名称数组
         projectOptions:[],
         // 类别字典
         processTypeOptions: [],
         // 预算计划状态
         budget_planOptions:[],
         // 楼栋
         buildingNoList:[],
         // 楼层
         floorNoList:[],
         // 列表数组
         buildinginfoList:[],
         ismenuLevel:false,
         ismenuLevels:false

      }
    },
    created() {
      this.getDicts("budget_plan").then(response => {
        this.budget_planOptions = response.data;
      })
      getProject().then(res => {
        this.projectOptions = res.data;
      })
      this.getDicts("process_type").then(response => {
        this.processTypeOptions = response.data;
      })
    },
    methods:{
      // 获取楼号
      buildingNolist(val) {
        let projectId = {
          projectId: val
        }
        buildingNofindList(projectId).then(res => {
          this.buildingNoList = res.data
        })
      },
      // 获取楼层
      floorNolist(val) {
        let query = {
          projectId: this.queryParams.projectId,
          buildingNo: val
        }
        buildingNofindList(query).then(res => {
          this.floorNoList = res.data
        })
      },
      // 搜索
      handleQuery(){

          projectBudgetPlanList(this.queryParams).then(res =>{
            this.buildinginfoList = res.rows
          })
      },
      // 重置
      resetQuery(){},
      handleSelectionChange(selection){
        console.log(selection)
      },

      isshow(val){
        // console.log(val)
        const x = val
        switch (val){
           case "1" :
           console.log(val ,"1")
           this.ismenuLevel = false
           this.ismenuLevels = false
           break;
           case "2" :
           console.log(val ,"2")
           this.ismenuLevel = true
           this.ismenuLevels = false
           break ;
           case "3" :
           console.log(val ,"3")
           this.ismenuLevel = true
           this.ismenuLevels = true
           break;
        }
      },
      processTypeFormat(row, column) {
        return this.selectDictLabel(this.processTypeOptions, row.processType);
      },
      turnSaveClick(){
        
      }
    }

  }
</script>

<style scoped="scoped">
  /* 删除修改按钮是否操作 */
  .notChoose {
    opacity: 0.8;
    pointer-events: none;
  }

  .projectBudgetPlan {
    width: 100%;
    height: 100%;
  }
  .top {
    background-image: linear-gradient(#5692cf, #00356c);
    height: 40px;
    width: 100%;
    padding: 5px;
  }

  .top ul li {
    float: left;
    line-height: 28px;
    color: white;
    border: 1px solid #5681af;
    font-size: 0.75rem;
    height: 28px;
    min-width: 58px;
    text-align: center;
    border-radius: 5px;
    background-image: linear-gradient(#71a1d2, #174f89);
    cursor: pointer;
    margin-left: 12px;
  }

  .conter {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    border: 1px solid #c0c0c0;
    display: flex;
  }

  .left {
    width: 16%;
    height: 100%;
    background-color: #efefef;
    font-size: 0.875rem;
  }

  .left_bottom {
    width: 100%;
    height: 40%;
  }

  .message {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 0.75rem;
    background-image: linear-gradient(#fdfdfe, #cfd0d1);
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;

  }

  .messagenav {
    color: #2a5b8c;
    font-weight: 900;

  }

  .right {
    width: 84%;
    height: 82%;
  }

  .rigtop {
    width: 100%;
    height: 24px;
    line-height: 24px;
    background-image: linear-gradient(#ffffff, #e5e5e5);
    font-size: 0.75rem;
    color: #000000;
  }
</style>

<template>
  <div class="project_process_norm">
    <div class="project_process_norm_top">
      <ul v-show="show">
        <li @click="handleAdd">新增</li>
        <li @click="handleUpdate" :class="{'notChoose' : single}" :disabled="single">修改</li>
        <li @click="handleDelete" :class="{'notChoose' : multiple}" :disabled="multiple">删除</li>
      </ul>
      <ul v-show="!show">
        <li @click="submitForm">保存</li>
        <li @click="cancel">取消</li>
      </ul>
    </div>
    <div class="project_process_norm_conter">
      <!-- 添加或修改参数 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" v-show="!show">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工序编码" prop="processNormCode">
              <el-input v-model="form.processNormCode" placeholder="请输入工序编码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工序名称" prop="processNormName">
              <el-input v-model="form.processNormName" placeholder="请输入工序名称" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工序类别" prop="processType">
              <el-select v-model="form.processType" clearable placeholder="请选择工序类别" size="mini">
                <el-option v-for="dict in processTypeOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工序单价" prop="price">
              <el-input v-model="form.price" placeholder="请输入工序单价" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工序单位" prop="unit">
              <el-input v-model="form.unit" placeholder="请输入工序单位" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="实际工时" prop="actualHours">
              <el-input v-model="form.actualHours" placeholder="请输入实际工时" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="辅助工时" prop="auxiliaryHours">
              <el-input v-model="form.auxiliaryHours" placeholder="请输入辅助工时" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="参与生产计划" prop="isPlan">
              <el-radio-group v-model="form.isPlan">
                <el-radio v-for="dict in isPlanOptions" :key="dict.dictValue" :label="dict.dictValue">{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="里程碑工序" prop="isMilestone">
              <el-radio-group v-model="form.isMilestone">
                <el-radio v-for="dict in isMilestoneOptions" :key="dict.dictValue" :label="dict.dictValue">{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="left" v-show="show">
        <div class="left_bottom">
          <div class="message">
            <div class="messagenav">
              快速查询
            </div>
          </div>
          <div class="messageli">
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
              <el-form-item label="工序编码">
                <el-input v-model="queryParams.processNormCode" placeholder="请输入工序编码" clearable size="mini" style="width: 100%"
                  @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item label="工序名称">
                <el-input v-model="queryParams.processNormName" placeholder="请输入工序编码" clearable size="mini" style="width: 100%"
                  @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item label="工序类别">
                <el-select v-model="queryParams.processType" clearable placeholder="请选择工序类别" size="mini">
                  <el-option v-for="dict in processTypeOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                </el-select>
              </el-form-item>
              <el-form-item label="是否参与生产计划:">
                <el-select v-model="queryParams.isPlan" clearable placeholder="是否参与生产计划" size="mini">
                  <el-option v-for="dict in isPlanOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                </el-select>
              </el-form-item>
              <el-form-item label="是否里程碑工序:">
                <el-select v-model="queryParams.isMilestone" clearable placeholder="是否里程碑工序" size="mini">
                  <el-option v-for="dict in isMilestoneOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="right" v-show="show">
        <div class="rigtop">
          查询结果
        </div>
        <el-table :data="tableList" @selection-change="handleSelectionChange" height="100%">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column label="工序编码" align="center" prop="processNormCode" :show-overflow-tooltip="true" />
          <el-table-column label="工序名称" align="center" prop="processNormName" :show-overflow-tooltip="true" />
          <el-table-column label="类别" align="center" prop="processType" :show-overflow-tooltip="true" :formatter="processTypeFormat" />
          <el-table-column label="工序单价(元)" align="center" width="120" prop="price" />
          <el-table-column label="工序单位" align="center" prop="unit" :show-overflow-tooltip="true" />
          <el-table-column label="实际工时(分)" align="center" prop="actualHours" :show-overflow-tooltip="true" />
          <el-table-column label="辅助工时(分)" align="center" prop="auxiliaryHours" :show-overflow-tooltip="true" />
          <el-table-column label="参与生产计划" align="center" prop="isPlan" :show-overflow-tooltip="true" :formatter="isPlanFormat" />
          <el-table-column label="里程碑工序" align="center" prop="isMilestone" :show-overflow-tooltip="true" :formatter="isMilestoneFormat" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    listproject_process_norm,
    addproject_process_norm,
    updateproject_process_norm,
    removeproject_process_norm,
    getMesProjectById
  } from "@/api/project/project_process_norm.js";
  export default {
    name: 'project_process_norm',
    data() {
      return {
        show: true,
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 类别字典
        processTypeOptions: [],
        // 参与生产计划字典
        isPlanOptions: [],
        // 里程碑工序字典
        isMilestoneOptions: [],
        // 搜索参数
        queryParams: {
          // pageNum:1,
          // pageSize:10,
          processNormCode: undefined,
          processNormName: undefined,
          processType: undefined,
          isPlan: undefined,
          isMilestone: undefined
        },
        tableList: [],
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          processNormCode: [{
            required: true,
            message: "工序编码不能为空",
            trigger: "blur"
          }, ],
          processNormName: [{
            required: true,
            message: "工序名称不能为空",
            trigger: "blur"
          }, ],
          processType: [{
            required: true,
            message: "类别不能为空",
            trigger: "blur"
          }, ],
          price: [{
            required: true,
            message: "工序单价不能为空",
            trigger: "blur"
          }, ],
          unit: [{
            required: true,
            message: "工序单位不能为空",
            trigger: "blur"
          }, ],
          actualHours: [{
            required: true,
            message: "实际工时不能为空",
            trigger: "blur"
          }, ],
          auxiliaryHours: [{
            required: true,
            message: "辅助工时不能为空",
            trigger: "blur"
          }, ],
          isPlan: [{
            required: true,
            message: "请选择一个",
            trigger: "blur"
          }, ],
          isMilestone: [{
            required: true,
            message: "请选择一个",
            trigger: "blur"
          }, ]
        },
      }
    },
    created() {
      this.getDicts("process_type").then(response => {
        this.processTypeOptions = response.data;
      })
      this.getDicts("is_plan").then(response => {
        this.isPlanOptions = response.data;
      })
      this.getDicts("is_milestone").then(response => {
        this.isMilestoneOptions = response.data;
      })
    },
    methods: {
      // 表单重置
      reset() {
        this.form = {
          processNormId:undefined,
          processNormCode: undefined,
          processNormName: undefined,
          processType: undefined,
          price: undefined,
          unit: undefined,
          actualHours: undefined,
          auxiliaryHours: undefined,
          isPlan: undefined,
          isMilestone: undefined,
        };
        this.resetForm("form");
      },
      getList() {
        listproject_process_norm(this.queryParams).then(res => {
          this.tableList = res.rows
        })
      },
      handleAdd() {
        this.reset()
        this.show = false
      },
      handleUpdate(){
        this.show  = false
        getMesProjectById(this.ids[0]).then(res =>{
         this.form = res.data
        })
      },
      handleDelete() {
        const processNormId = this.ids;
        this.$confirm('是否确认删除工序编码为"' + this.processNormCodes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          removeproject_process_norm(processNormId).then(res => {
            this.getList();
            this.msgSuccess("删除成功");
          })

        }).catch(function() {});
      },
      handleQuery() {
        this.getList()
      },
      handleSelectionChange(selection) {
        this.selectProject = selection.map((item) => item)
        this.ids = selection.map((item) => item.processNormId);
        this.single = selection.length != 1;
        this.multiple = !selection.length;
        this.processNormCodes = selection.map(item => item.processNormCode)
      },
      processTypeFormat(row, column) {
        return this.selectDictLabel(this.processTypeOptions, row.processType);
      },
      isPlanFormat(row, column) {
        return this.selectDictLabel(this.isPlanOptions, row.isPlan);
      },
      isMilestoneFormat(row, column) {
        return this.selectDictLabel(this.isMilestoneOptions, row.isMilestone);
      },
      submitForm(){
        console.log(this.form.processNormId)
        this.$refs["form"].validate(valid => {
                if (valid) {
                  if (this.form.processNormId != undefined) {
                    updateproject_process_norm(this.form).then(response => {
                      this.msgSuccess("修改成功");
                      this.show = true;
                      this.reset()
                      this.getList();
                    });
                  } else {
                    addproject_process_norm(this.form).then(response => {
                      this.msgSuccess("新增成功");
                      this.show = true;
                      this.reset()
                      this.getList();
                    });
                  }
                }
              });
      },
      resetQuery(){
        this.queryParams = {} 
        this.tableList = []
      },
      cancel() {
        this.show = true
        this.reset()
        this.getList();
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

  .project_process_norm {
    width: 100%;
    height: 100%;
  }

  .project_process_norm_top {
    background-image: linear-gradient(#5692cf, #00356c);
    height: 40px;
    width: 100%;
    padding: 5px;
  }

  .project_process_norm_top ul li {
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

  .project_process_norm_conter {
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

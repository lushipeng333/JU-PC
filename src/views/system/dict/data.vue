<template>
  <div class="dictionaries">
    <!-- <router-view ></router-view> -->
    <div class="dictionaries_top">
       <ul>
         <li @click="handleAdd" v-hasPermi="['system:dict:add']">新增</li>
         <li :class="{'notChoose' : single}" :disabled="single" @click="handleUpdate" v-hasPermi="['system:dict:edit']">修改</li>
         <li :class="{'notChoose' : multiple}" :disabled="multiple"  @click="handleDelete" v-hasPermi="['system:dict:remove']">删除</li>
         <li @click="handleExport" v-hasPermi="['system:dict:export']">导出</li>
       </ul>
    </div>
    <div class="dictionaries_conter">
      <div class="left">
        <div class="message">
          <div class="messagenav">
            快速查询
          </div>
        </div>
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="字典名称" prop="dictType">
            <el-select v-model="queryParams.dictType" size="small">
              <el-option
                v-for="item in typeOptions"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictType"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="字典标签" prop="dictLabel">
            <el-input
              v-model="queryParams.dictLabel"
              placeholder="请输入字典标签"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="数据状态" clearable size="small">
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-table :data="dataList" @selection-change="handleSelectionChange" height="100%">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="字典编码" align="center" prop="dictCode" />
          <el-table-column label="字典标签" align="center" prop="dictLabel" />
          <el-table-column label="字典键值" align="center" prop="dictValue" />
          <el-table-column label="字典排序" align="center" prop="dictSort" />
          <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
          <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
          <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加或修改参数配置对话框 -->
   <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col>
             <el-form-item label="字典类型">
          <el-input v-model="form.dictType" :disabled="true" />
        </el-form-item>
          </el-col>
        </el-row>
       <el-row>
         <el-col>
           <el-form-item label="数据标签" prop="dictLabel">
          <el-input v-model="form.dictLabel" placeholder="请输入数据标签" />
        </el-form-item>
         </el-col>
       </el-row>
         <el-row>
           <el-col>
             <el-form-item label="数据键值" prop="dictValue">
          <el-input v-model="form.dictValue" placeholder="请输入数据键值" />
        </el-form-item>
        </el-col>
         </el-row>
         <el-row>
           <el-col>
             <el-form-item label="显示排序" prop="dictSort">
          <el-input-number v-model="form.dictSort" controls-position="right" :min="0" />
        </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col>
             <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col>
              <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
           </el-col>
         </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listData, getData, delData, addData, updateData, exportData } from "@/api/system/dict/data";
import { listType, getType } from "@/api/system/dict/type";

export default {
  name: "Data",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 字典表格数据
      dataList: [],
      // 默认字典类型
      defaultDictType: "",
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 类型数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        dictName: undefined,
        dictType: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictLabel: [
          { required: true, message: "数据标签不能为空", trigger: "blur" }
        ],
        dictValue: [
          { required: true, message: "数据键值不能为空", trigger: "blur" }
        ],
        dictSort: [
          { required: true, message: "数据顺序不能为空", trigger: "blur" }
        ]
      },
    };
  },
 watch: {
    '$route' (to, from) {
      console.log(this.$route.params)
      this.queryParams.dictType= this.$route.params.dictType
      // created to do sth.
      listData(this.queryParams).then(response => {
        this.dataList = response.rows;
      });
    }
},
  created() {
     this.queryParams.dictType= this.$route.params.dictType
     listData(this.queryParams).then(response => {
       this.dataList = response.rows;
     });
    // const dictId = this.$route.params && this.$route.params.dictId;
    // this.getType(dictId);
    this.getTypeList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },

  methods: {
    /** 查询字典类型详细 */
    getType(dictId) {
      getType(dictId).then(response => {
        this.queryParams.dictType = response.data.dictType;
        this.defaultDictType = response.data.dictType;
        // this.getList();
      });
    },
    /** 查询字典类型列表 */
    getTypeList() {
      listType().then(response => {
        this.typeOptions = response.rows;
      });
    },
    /** 查询字典数据列表 */
    getList() {
      this.loading = true;
      listData(this.queryParams).then(response => {
        this.dataList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 数据状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        dictCode: undefined,
        dictLabel: undefined,
        dictValue: undefined,
        dictSort: 0,
        status: "0",
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.dictType = this.defaultDictType;
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      console.log(this.$route.params.dictType)
      this.reset();
      this.open = true;
      this.title = "添加字典数据";
      this.form.dictType = this.queryParams.dictType;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.dictCode)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dictCode = row.dictCode || this.ids
      getData(dictCode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改字典数据";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.dictCode != undefined) {
            updateData(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addData(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const dictCodes = row.dictCode || this.ids;
      this.$confirm('是否确认删除字典编码为"' + dictCodes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delData(dictCodes);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportData(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
<style scoped="scoped">
  /* 删除修改按钮是否操作 */
  .notChoose {
    opacity: 0.4;
    pointer-events: none;
  }
   .dictionaries{
     width: 100%;
     height: calc(100% - 104px);
   }
   .dictionaries_top {
     background-image: linear-gradient(#5692cf, #00356c);
     height: 36px;
     width: 100%;
     padding: 5px;
   }
   .dictionaries_top ul li {
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
     margin-left: 5px;
   }
   .dictionaries_conter {
     background-color: #FFFFFF;
     width: 100%;
     height: calc(100% - 36px);
     border: 1px solid #c0c0c0;
     display: flex;
   }
   /* 左侧 */
   .left {
     width: 18%;
     height: 100%;
     background-color: #efefef;
     font-size: 0.875rem;
     border-right: 1px solid #888888;
   }

   .left_top {
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
   .messageli {}
   .messagenav {
     color: #2a5b8c;
     font-weight: 900;
   }
   /* 右侧 */
   .right {
     width: 82%;
     height: 100%;
     position: relative;
   }
</style>

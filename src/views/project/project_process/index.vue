<template>
  <div class="project_process">
    <div class="project_process_top">
      <ul>
        <li @click="processClick" v-hasPermi="['project:project_process:distribution']" :class="{'notChoose' : single}" :disabled="single">分配窗型施工工序</li>
        <li @click="copyClick" v-hasPermi="['project:project_process:copy']" :class="{'notChoose' : single}" :disabled="single">复制窗型</li>
        <li @click="submit" v-hasPermi="['project:project_process:edit']">保存</li>
      </ul>
    </div>
    <div class="project_process_conter">
      <div class="left">
        <div class="message">
          <div class="messagenav">
            快速查询
          </div>
        </div>
        <el-select v-model="queryParams.winModelId" placeholder="请选择项目名称" @change="querywinNo" clearable style="padding: 20px; padding-top: 10px;">
          <el-option v-for="dict in AllwinModelCode" :key="dict.winModelId" :label="dict.winModelCode+ ' (' + dict.winModelName +')' "
            :value="dict.winModelId " />
        </el-select>
      </div>
      <div class="right">

        <el-table height="100%" :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="processNormId"
          border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column prop="processNormName" label="工序名称">
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">

              <el-input v-model="scope.row.num" onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="'请输入 ' +  scope.row.processNormName  + ' 数量'"></el-input>
            </template>

          </el-table-column>
        </el-table>

      </div>
    </div>
    <!-- 用户导入对话框 -->
    <el-dialog title="分配窗型施工工序" :visible.sync="dialogVisible" append-to-body width="30%">
      <div style="margin-bottom: 20px;">
        <span>窗型：</span>
      <el-select style="padding-left: 50px;" v-model="queryParams.winModelId" :disabled="true">
        <el-option v-for="dict in AllwinModelCode" :key="dict.winModelId" :label="dict.winModelCode+ ' (' + dict.winModelName +')' "
          :value="dict.winModelId " />
      </el-select>
      </div>

      <span>工序树：</span>
      <el-tree style="padding-left: 90px;" :data="data" :props="defaultProps" show-checkbox ref="tree" node-key="id" @check-change="handleSelectionChange"
        :default-checked-keys="pitchList" default-expand-all @node-click="handleNodeClick"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitree">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="复制窗型" :visible.sync="copy" append-to-body width="30%">
      <div style="margin-bottom: 20px;">
        <span>窗型：&nbsp;&nbsp;</span>
        <el-select v-model="queryParams.winModelId" :disabled="true" style="padding-left: 50px;">
          <el-option v-for="dict in AllwinModelCode" :key="dict.winModelId" :label="dict.winModelCode+ ' (' + dict.winModelName +')' "
            :value="dict.winModelId " />
        </el-select>
      </div>
      <div>
        生成窗型： <el-select v-model="CopyNewWinModel.winModelId" style="padding-left: 24px;">
          <el-option v-for="dict in CopyNewWinModel" :key="dict.winModelId" :label="dict.winModelCode+ ' (' + dict.winModelName +')' "
            :value="dict.winModelId " />
        </el-select>
      </div>

      <br />
      <span>工序树：&nbsp;</span>
      <el-tree style="padding-left: 90px;" :data="data" :props="defaultProps" default-expand-all>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitreeCopy">确 定</el-button>
        <el-button @click="copy = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Allwindow,
    project_processList,
    project_processEdit,
    processTreeList,
    distributionSave,
    getCopyNewWinModel,
    copySave
  } from "@/api/project/project_process.js";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    name: 'project_process',
    components: {
      Treeselect
    },
    data() {
      return {
        single: true,
        // 默认选中数据
        pitchList: [],
        dialogVisible: false,
        copy: false,
        // 全部窗型数据
        AllwinModelCode: [],
        CopyNewWinModel: [],
        queryParams: {
          winModelCode: undefined,
          winModelId: undefined
        },
        // 菜单数据结构
        tableData: [],
        // 该数组是选中的节点(半选的节点和全选的节点全都存储在这个数组)
        multipleSelection: [],
        // 表格树数据
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        ids: [],
        titles: []

      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 点击节点事件
      handleNodeClick(data) {
        console.log(data);
      },
      // 列表查询
      getList() {
        Allwindow().then(res => {
          this.AllwinModelCode = res.data
        })
      },
      // 下拉框点击事件
      querywinNo() {
        this.single = false
        const winModelId = {
          winModelId: this.queryParams.winModelId
        }
        project_processList(winModelId).then(res => {
          this.tableData = this.handleTree(res.data, "processNormId")
        })
      },
      // el-tree 复选框默认选中事件
      handleSelectionChange(val) {
        this.multipleSelection = this.$refs.tree.getHalfCheckedNodes().concat(this.$refs.tree.getCheckedNodes());
        // this.multipleSelection  这个数组用来存储所有半选的节点和全选的节点  用于保存的时候将数据传给后台
        // 将半选和全选的节点全都存储在一个数组里面   concat 方法是合并(全选和半选)两个数组
        // console.log(arr)
      },
      // 分配窗型施工工序点击
      processClick() {
        this.pitchList = []
        this.dialogVisible = true
        const winModelId = {
          winModelId: this.queryParams.winModelId
        }
        processTreeList(winModelId).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].checked == true && res.data[i].pId != 0) {
              this.pitchList.push(res.data[i].id)
            }
          }
          let data1 = res.data; //后台初始数据
          function setTreeData(arr) {
            // 删除所有的children,以防止多次调用
            arr.forEach(function(item) {
              delete item.children;
            });
            let map = {}; //构建map
            arr.forEach(i => {
              map[i.id] = i; //构建以id为键 当前数据为值
            });
            let treeData = [];
            arr.forEach(child => {
              const mapItem = map[child.pId]; //判断当前数据的parentId是否存在map中
              if (mapItem) {
                //存在则表示当前数据不是最顶层的数据
                //注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
                (mapItem.children || (mapItem.children = [])).push(child); //这里判断mapItem中是否存在child
              } else {
                //不存在则是顶层数据
                treeData.push(child);
              }
            });
            return treeData;
          }
          this.data = setTreeData(data1)
          console.log(this.data)
        })
      },
      // 复制窗型
      copyClick() {
        getCopyNewWinModel().then(res => {
          this.CopyNewWinModel = res.data
        })
        this.copy = true
        this.pitchList = []
        const winModelId = {
          winModelId: this.queryParams.winModelId
        }
        processTreeList(winModelId).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].checked == true && res.data[i].pId != 0) {
              this.pitchList.push(res.data[i].id)
            }
          }
          let data1 = res.data; //后台初始数据
          function setTreeData(arr) {
            // 删除所有的children,以防止多次调用
            arr.forEach(function(item) {
              delete item.children;
            });
            let map = {}; //构建map
            arr.forEach(i => {
              map[i.id] = i; //构建以id为键 当前数据为值
            });
            let treeData = [];
            arr.forEach(child => {
              const mapItem = map[child.pId]; //判断当前数据的parentId是否存在map中
              if (mapItem) {
                //存在则表示当前数据不是最顶层的数据
                //注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
                (mapItem.children || (mapItem.children = [])).push(child); //这里判断mapItem中是否存在child
              } else {
                //不存在则是顶层数据
                treeData.push(child);
              }
            });
            return treeData;
          }
          this.data = setTreeData(data1)
        })
      },
      // 保存提交
      submit() {
        project_processEdit(this.tableData).then(res => {
          this.querywinNo()
          if (res.code == 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });

          }
        })
      },
      submitree() {
        this.ids = [];
        this.titles = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.ids.push(this.multipleSelection[i].id)
          this.titles.push(this.multipleSelection[i].title)
        }
        console.log(this.ids)
        console.log(this.titles)

        if (this.ids.length != 0 && this.titles.length != 0) {
          const aaa = {
            winModelId: this.queryParams.winModelId,
            processNormIds: this.ids,
            getCheckedTitleNodes: this.titles
          }
          distributionSave(aaa).then(res => {
            this.querywinNo()
            this.dialogVisible = false
            this.msgSuccess("分配窗型成功")

          })
        } else {
          this.dialogVisible = false
        }

      },
      submitreeCopy() {
        const winModelId = {
          oldWinModelId: this.queryParams.winModelId,
          newWinModelId: this.CopyNewWinModel.winModelId
        }
        copySave(winModelId).then(res => {
          this.copy = false
          this.msgSuccess("复制窗型成功")
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .project_process {
    width: 100%;
    height: calc(100% - 104px);
  }

  .project_process_top {
    background-image: linear-gradient(#5692cf, #00356c);
    height: 36px;
    width: 100%;
    padding: 5px;
  }

  .project_process_top ul li {
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

  .project_process_conter {
    background-color: #FFFFFF;
    width: 100%;
    height: calc(100% - 36px);
    border: 1px solid #c0c0c0;
    display: flex;
  }

  .left {
    min-width: 128px;
    width: 16%;
    height: 100%;
    background-color: #efefef;
    font-size: 0.875rem;
  }

  .right {
    width: 84%;
    height: 100%;
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

  /* 删除修改按钮是否操作 */
  .notChoose {
    opacity: 0.8;
    pointer-events: none;
  }
</style>

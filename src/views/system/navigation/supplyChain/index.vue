<template>
  <div class="supply">
    <div class="supply_list">
     <el-tabs   :tab-position="tabPosition" style="height: 100%;">
        <el-tab-pane  v-for="(item,index) in list" :label="item.meta.title" :key="index" @tab-click="liClick(index)" >
         <div class="system_list" v-for="(item1,index1) in item.children">
          <h1>{{item1.meta.title}}</h1>
           <ul>
           			<li
           			v-for="(item2,index2) in item1.children"
                @click="rtclick"
           		>
           			{{item2.meta.title}}
           			</li>
           </ul>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>

<script>
  import {
    getRouters
  } from '@/api/menu'
  export default {
    name: "supply",
    comments: {

    },
    data() {
      return {
        tabPosition: 'left',
        list: [],
        listChildren: [],
        systemNum: 0,
        rt: ''
      }
    },
    methods: {
      rtclick(){
        // console.log(this.list)

      }
      // liClick(index) {
      //   let that = this;
      //   let children_menu_name_list = that.list[index].children
      //   for (let i = 0; i < that.list[index].children.length; i++) {
      //     that.listChildren.push(that.list[index].children[i].meta.title)
      //   }
      // },
      // systemClick(index2,index1){
      // 	this.systemNum = index2
      //   console.log(index1, index2)
      //   // console.log(index1)
      //    // console.log(index,index2)
      //    // console.log(this.list[index].children[index2].component)



      // },
      // stemdbClick(index2,index1){
      // 	this.systemNum = index2
      //   let com = this.list[index1].children[index2]
      //   console.log(com)
      //    // this.$router.push({
      //    //   path:"/"+
      //    // })

      // }
    },
    created() {
      getRouters()
        .then(res => {
          let that = this;
          that.list = res.data
          console.log(res)
        })

    }
  }
</script>

<style scoped="scoped">
  .supply {
    width: 100%;
    height: 100%;
    display: flex;
  }

/* .supply_list {
    width:200px;
    height: 100%;
    border-right: 1px solid #D5D5D5;
  }

 .supply_list ul li {
    padding: 8px 5px 8px 5px;
    margin: 5px 10px 5px 10px;
    font-size: 14px;
    color: #000000;
    display: block;
  } */

  .supply_li {
    background-color: #fceadb;
    border: 1px solid #efbd97;
    border-radius: 4px;
  }

  .posoi {
    padding: 20px;
    border: 1px solid #bfc0c2;
    border-width: 0px 1px 0px 0px;

  }
  .system_li{
  	text-align: center;
  	line-height: 30px;
  	width: 100px;
  	height: 30px;
  	background-color: #fceadb;
  	border: 1px solid #efbd97;
  	border-radius: 4px;
    overflow: auto;
  }
 /* .system_list{
    width: 100px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
  } */
  .system_list h1{
  	color: #4583c0;
  	font-weight: 900;
    font-size: 1.25rem;
    margin-top: 10px;
  	/* padding-top: 30px; */
  }
  .system_list ul{
  	margin: 0;
  }
  .system_list ul li{
  	 margin-top: 10px;
  		margin-left: 30px;
  		/* margin-right: 40px; */
  		font-size: 0.75rem;
  		color: #000000;
  		list-style: disc;
  			cursor:pointer;
  }
</style>
<style>
 /* .el-tabs__content{
    height: 100%;

  }
  .el-tab-pane{
      height: 100%;
  } */
</style>

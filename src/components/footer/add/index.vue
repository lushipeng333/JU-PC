<template>
	<div class="addlist">
		<Navtop v-slot:navtop>
			<ul>
				<li>保存</li>
				<li>提交</li>
				<li>取消</li>
			</ul>
		</Navtop>
		<div class="center">
			<div class="left">
				<div class="left_top">
					<button @click="btnclick" type="button"><i class="el-icon-arrow-left"></i>返回</button>
				</div>
				<div class="addconter">
					<h1>基本信息</h1>
					<el-form ref="form" :model="form" label-width="80px">
						<el-row>
						<el-col :xs="24" :sm="12" :md="8"  :lg="6" :xl="6">
							<el-form-item label="登录账号">
							<el-input v-model="form.name" size="mini"></el-input>
						</el-form-item>
						</el-col  >
						<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
							<el-form-item label="登录密码">
							<el-input v-model="form.name" size="mini"></el-input>
						</el-form-item>
						</el-col>

						<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
							<el-form-item label="用户名称">
							<el-input v-model="form.name" size="mini"></el-input>
						</el-form-item>
						</el-col>

						<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
							<el-form-item label="归属部门">
							<el-input v-model="form.name" size="mini"></el-input>
						</el-form-item>
						</el-col>

						<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
							<el-form-item label="手机号码">
							<el-input v-model="form.name" size="mini"></el-input>
						</el-form-item>
						</el-col>

						<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
							<el-form-item label="邮箱">
							<el-input v-model="form.name" size="mini"></el-input>
						</el-form-item>
						</el-col>

						<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
							<el-form-item label="用户性别">
							<el-select v-model="form.region" size="mini" placeholder="请选择活动区域">
								<el-option label="男" value="shanghai"></el-option>
								<el-option label="女" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						</el-col>

                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
							<el-form-item label="用户状态">
							<el-switch v-model="form.delivery" size="mini"></el-switch>
						</el-form-item>
						</el-col>

						<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
							<el-form-item label="岗位">
							<el-select v-model="form.region" size="mini" placeholder="请选择活动区域">
								<el-option label="董事长" value="shanghai"></el-option>
								<el-option label="项目经理" value="beijing"></el-option>
								<el-option label="人力资源" value="shanghai"></el-option>
								<el-option label="普通员工" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						</el-col>

						<el-col  >
							<el-form-item label="角色">
							<el-checkbox-group v-model="form.type">
								<el-checkbox label="超级管理员" name="type"></el-checkbox>
								<el-checkbox label="总经理" name="type"></el-checkbox>
								<el-checkbox label="项目经理" name="type"></el-checkbox>
								<el-checkbox label="高管" name="type"></el-checkbox>
								<el-checkbox label="技术员" name="type"></el-checkbox>
								<el-checkbox label="项目副总" name="type"></el-checkbox>
								<el-checkbox label="项目创建" name="type"></el-checkbox>
								<el-checkbox label="技术主管" name="type"></el-checkbox>
								<el-checkbox label="采购主管" name="type"></el-checkbox>
								<el-checkbox label="财务权限" name="type"></el-checkbox>
								<el-checkbox label="库房" name="type"></el-checkbox>
								<el-checkbox label="车间报工" name="type"></el-checkbox>
								<el-checkbox label="车间组长" name="type"></el-checkbox>
								<el-checkbox label="运营" name="type"></el-checkbox>
								<el-checkbox label="车间主任" name="type"></el-checkbox>
								<el-checkbox label="生产经理" name="type"></el-checkbox>
								<el-checkbox label="统计" name="type"></el-checkbox>
								<el-checkbox label="安装工" name="type"></el-checkbox>
								<el-checkbox label="安装工组长" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						</el-col>


						</el-row>
						<el-form-item label="其他信息">
							<el-input label="备注" type="textarea" v-model="form.desc"></el-input>
						</el-form-item>

					</el-form>
				</div>

			</div>
			<div class="right">
				2
			</div>
		</div>
	</div>
</template>

<script>
	import Navtop from "../../navtop/index.vue"
	export default {
		name: 'add',
		components: {
			Navtop
		},
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},

				input4: "",
				options: [{
					value: '男',
					label: '男'
				}, {
					value: '女',
					label: '女'
				}, {
					value: '未知',
					label: '未知'
				}, ],
				value: '',
				opt: [{
						value: '董事长',
						label: '董事长'
					}, {
						value: '项目经理',
						label: '项目经理'
					}, {
						value: '人力资源',
						label: '人力资源'
					},
					{
						value: '普通员工',
						label: '普通员工'
					}
				],
				value2: ''
			}
		},
		methods: {
			btnclick() {
				this.$router.go(-1)
			}
		}

	}
</script>

<style scoped="scoped">
	/* 内容高度与边框 */
	.center {
		background-color: #FFFFFF;
		width: 100%;
		height: 100%;
		border: 1px solid #c0c0c0;
		display: flex;
	}

	/* 左侧内容 */
	.left {
		width: 70%;
		height: 100%;

	}

	.left_top {
		width: 100%;
		height: 30px;
		background-image: linear-gradient(#ffffff, #e6e5e6);
		padding-top: 5px;
		padding-left: 20px;
	}

	.left_top button {
		width: 60px;
		height: 20px;
		font-size: 0.75rem;
		border: 1px solid #cacaca;
		border-radius: 10px 0px 10px 0px;
		color: #000000;
		outline: none;
	}

	.left_top button:hover {
		background: #c5e1ff;
	}

	.addconter {
		width: 100%;
		height: 70%;
	}

	.addconter h1 {
		font-size: 18px;
		color: #6379bb;
		font-weight: bold;
		margin-top: 20px;
		margin-left: 20px;
		margin-bottom: 20px;
	}

	/* 右侧内容 */
	.right {
		width: 30%;
		height: 100%;
		/* background: lightgreen; */
	}
</style>

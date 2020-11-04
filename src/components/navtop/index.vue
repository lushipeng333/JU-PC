<template>
	<div class="navtop">
		<slot name="navtop">
			<ul>
				<li>新建</li>
				<li>删除</li>
				<li>修改</li>
				<li>查询</li>
			</ul>
		</slot>
	</div>
</template>

<script>
	export default{
		name:"navtop"
	}
</script>

<style scoped="scoped">
	.navtop {
		background-image: linear-gradient(#5692cf, #00356c);
		height: 40px;
		width: 100%;
		margin-top: -2px;
		padding: 5px;
	}
	.navtop ul li {
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
	}
</style>

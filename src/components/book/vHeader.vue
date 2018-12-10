<template>
    <div class="el-row">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">JavaScript</template>
                <el-menu-item index="1-1">ES语法</el-menu-item>
                <el-menu-item index="1-2">Vue</el-menu-item>
                <el-menu-item index="1-3">ThreeJS</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">HTML</el-menu-item>
            <el-menu-item index="3">CSS</el-menu-item>
            <el-menu-item index="4">Python</el-menu-item>
            <el-menu-item index="5">NodeJS</el-menu-item>
            <el-menu-item index="6">人工智能</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
	export default {
		name: "vHeader",
        data(){
			return{
				activeIndex:'1'
            }
        },
        methods:{
			handleSelect(key,keyPath){
				console.log((key, keyPath));
			}
        }
	}
</script>

<style scoped>

</style>
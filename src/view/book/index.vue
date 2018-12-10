<template>
    <div class="wrapper">
        <el-container>
            <el-header>
                <v-header></v-header>
            </el-header>
            <el-aside></el-aside>
            <el-main></el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
	import vHeader from "../../components/book/header";
	export default {
		components: {
            vHeader
        },
		name: "index"
	}
</script>

<style lang="scss">
    .wrapper{
        .el-header{
            background: #545c64;
        }
    }
</style>
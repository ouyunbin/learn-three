<template>
    <div class="wrapper">
        <el-container>
            <el-header>
                <v-header></v-header>
            </el-header>
            <el-aside></el-aside>
            <el-main>
                <div class="row">
                    <el-breadcrumb separator="|">
                        <template v-for="(item,index) in nav">
                            <el-breadcrumb-item><a href="javascript:void(0)" @click="goto(item.index)">{{item.name}}</a></el-breadcrumb-item>
                        </template>
                    </el-breadcrumb>
                </div>
                <v-scene v-if="index==='0'"></v-scene>
                <scene-one v-if="index==='1'"></scene-one>
                <v-geometries v-if="index==='1.1'"></v-geometries>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
	import vHeader from "../../components/book/vHeader";
	import vScene from './component/scene'
    // chapter-01
    import sceneOne from './component/senceOne'
    import vGeometries from './component/chapter02/geometries'
	export default {
		name: "threejs",
		components: {
			vHeader,
			vScene,
			sceneOne,
			vGeometries
        },
        data(){
			return{
				index:'1.1',
				nav:[
                    {
                    	name:'例子0',
                        index:'0'
                    },
					{
						name:'例子1',
						index:'1'
					},
                    {
                    	name:'Geometries',
                        index:'1.1'
                    }
                ]
            }
        },
		methods:{
			goto(index){
				this.index = index;
            }
        },
        created(){
	        this.$root.$on('removeDg',target=>{
		        if(target){
			        // let body = document.getElementsByTagName('body');
			        // let dg = document.getElementsByClassName('dg')
			        // if(dg){
				    //     for(var i=0; i<dg.length; i++){
					//         dg[i].parentNode.removeChild(dg[i]);
				    //     }
                    //
			        // }
		        }
	        })
        },
        mounted(){

        }
	}
</script>

<style lang="scss">
    .wrapper{
        .el-header{
            background: #545c64;
        }
        .row{
            width:100%;
            height: 30px;
        }
        .row::after,.row::before{
            content:'';
            display: block;
            clear: both;
        }
    }
</style>
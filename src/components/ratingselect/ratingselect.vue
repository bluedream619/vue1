<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2)" class="block all" :class="{'active':selectType===2}">{{desc.all}}<span class="count">11</span></span>
			<span @click="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">11</span></span>
			<span @click="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">11</span></span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'ons': onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	const NEGATIVE = 1;
	const POSITIVE = 0;
	const ALL = 2;
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return[];
				}
			},
			selectType:{
				type:Number,
				default:ALL

			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'吐槽'
					}
				}
			}
		},
		data(){
			return{
				myselectType:this.selectType,
				//创建副本数据 操作父组件
				myonlyContent:this.onlyContent
			}
		},
		watch:{
			// 监听myselectType的变化
			selectType(val){
				this.myselectType=val;
			},
			myselectType(val){
				this.$emit('typeSelect',val);
				//派发事件到父组建的typeSelect
			},
			onlyContent(val){
				this.myonlyContent=val;
			},
			myonlyContent(val){
				this.$emit('contentOnly',val);
			}
		},
		methods:{
			select(type){
				if(!event._constructed){
					return;
				}
				this.myselectType = type;
				//这里将副本数据myselectType赋值type
			},
			toggleContent(){
				if(!event._constructed){
					return;
				}
				this.myonlyContent=!this.onlyContent;
				//通知父组件改变这个值
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-bottom:1px solid rgba(7,17,27,0.1)
			font-size:0
			.block
				display:inline-block
				padding:8px 12px
				font-size:20px
				margin-right:8px
				border-radius:1px
				color:rgb(77,85,93)
				&.active
					color:#fff
				.count
					font-size:18px
					margin-left:2px
					line-height:24px
				&.positive,&.all
					background:rgba(0,160,200,0.2)
					&.active
						background:rgb(0,160,200)
				&.negative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
		.switch
			padding:12px 18px
			line-height:24px
			border-bottom:1px solid rgba(7,17,27,0.1)
			color:rgb(147,153,159)
			font-size:0
			&.ons
				.icon-check_circle
					color:#00c850
			.icon-check_circle
				display:inline-block
				vertical-align:top
				font-size:24px
				margin-right:4px
			.text
				font-size:14px
</style>
<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>
<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';

	export default{
		props:{
			size:{
				type:Number
			},
			//接受尺寸 定义属性
			score:{
				type:Number
			}
			//接受分数 定义属性
		},
		created(){
		//	console.log(this.size);
	},
		computed:{
			starType(){
				return 'star-' + this.size;
			},
			//定义尺寸属性 
			itemClasses(){
				let result = [];
				// 定义数组 遍历的时候取不同的属性on、half、off
				let score = Math.floor(this.score*2)/2;
				//分数取整或半
				let has = score % 1 !==0;
				//计算是否有半星 半星只存在一个
				let integer = Math.floor(score);
				//计算整星 直接去整
				for(let i=0;i<integer;i++){
					result.push(CLS_ON);
				}
				//循环输出有多少个整星
				if(has){
					result.push(CLS_HALF);
				}
				//判断是否输出半星
				while(result.length < LENGTH){
					result.push(CLS_OFF);
				}
				//剩下的输出没有星
				return result;
				//别忘记输出数组
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.star
		font-size:0
		.star-item
			display:inline-block
			background-repeat:no-repeat
		&.star-48
			.star-item
				width:20px
				height:20px
				margin-right:22px
				background-size:20px 20px
				&:last-child
					margin-right:0
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item
				width:15px
				height:15px
				margin-right:12px
				background-size:15px 15px
				&:last-child
					margin-right:0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width:10px
				height:10px
				margin-right:3px
				background-size:10px 10px
				&:last-child
					margin-right:0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')

</style>
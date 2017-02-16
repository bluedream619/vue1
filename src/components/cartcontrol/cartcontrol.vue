<template>
	<div class="cartcontrol">
		<transition name="fade">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart">
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>
<script>
	import Vue from "vue";
	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(){
				//清楚默认点击事件
				if(!event._constructed){
					return;
				};
				if(!this.food.count){
					//this.food.count=1;
					//新增或者删除一个不存在的属性 必须引入vue的api
					//不存在就默认是1
					Vue.set(this.food,'count',1);
					//通过Vue.set的API设置food.count为1
				}else{
					this.food.count++;
					//存在就累加
				}
			},
			decreaseCart(){
				if(!event._constructed){
					return;
				};
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		.cart-decrease
			display:inline-block
			padding:6px
			font-size:24px
			line-height:24px
			color:rgb(0,160,220)
			&.fade-enter-active
				transition: all 1s
			&.fade-enter
				opacity:0
			&.fade-leave-active
				opacity:0
				transition: all 1s
		.cart-count
			display:inline-block
			font-size:14px
			vertical-align:top
			width:12px
			padding-top:6px
			line-height:24px
			text-align:center
			color:rgb(147,153,159)
		.cart-add
			font-size:24px
			line-height:24px
			display:inline-block
			font-size:24px
			padding:6px
			color:rgb(0,160,220)
</style>
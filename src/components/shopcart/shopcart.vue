<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'hightlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'hightlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'hightlight':totalCount>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<transition name="fade">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li class="food" v-for="food in sellerFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
		</transition>
		<div class="list-mark" v-show="listShow"></div>
		<!-- 购物车列表 -->
	</div>
</template>
<script>
	import BScroll from "better-scroll";
	import cartcontrol from "components/cartcontrol/cartcontrol";
	export default{
		data(){
			return{
				fold:true
			}
		},
		props:{
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			},
			sellerFoods:{
				// 这是通过加减food得到的数组
				type:Array,
				default(){
					return [
					{
						price:1,
						count:0
					},
					{
						price:20,
						count:0
					}];
				//数组的默认值 必须是方法return
				}
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.sellerFoods.forEach((food)=>{
					total += food.price * food.count
				});
				//总价
				return	total;
			},
			totalCount(){
				let count=0;
				this.sellerFoods.forEach((food)=>{
					count += food.count;
				});
				//总数
				return count;
			},
			payDesc(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`
				}else if(this.totalPrice>this.minPrice){
					return '去结算'
				}
			},
			payClass(){
				if(this.totalPrice < this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold=true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							//如果没有
						this.scroll=new BScroll(this.$refs.listContent,{
							click:true
						});
					}else{
						this.scroll.refresh();
						//有就直接调用 
						//防止点击减号直接清空
					}
					});
				}
				return show;
			}
		},
		components:{
			cartcontrol
		},
		methods:{
			toggleList(){
				if(!this.totalCount){
					return;
				}
				//如果购物车没有东西 点击无效
				this.fold = !this.fold;
			},
			empty(){
				this.sellerFoods.forEach((food)=>{
					food.count = 0;
				})
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position:fixed
		left:0
		bottom:0
		z-index:50
		width:100%
		height:48px
		background:#000
		.content
			display:flex
			background:#141d27
			font-size:0
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					position:relative
					top:-10px
					margin:0 12px 
					padding:6px
					width:56px
					height:56px
					box-sizing:border-box
					vertical-align:top
					border-radius:50%
					background:#000
					.logo
						width:100%
						height:100%
						border-radius:50%
						background:#2b343c
						text-align:center
						&.hightlight
							background:rgb(0,160,220)
						.icon-shopping_cart
							font-size:24px
							color:#80858a
							line-height:44px
							&.hightlight
								color:#fff
					.num
						position:absolute
						top:0
						right:0
						height:16px
						width:24px
						line-height:16px
						text-align:center
						border-radius:16px
						font-size:9px
						font-weight:700
						color:#fff
						background:red
						box-shadow:0 4px 8px 0 rgba(255,255,255,0.4)
				.price
					display:inline-block
					vertical-align:top
					line-height:24px
					margin-top:12px
					padding-right:12px
					border-right:1px solid rgba(255,255,255,0.2)
					font-size:16px
					font-weight:700
					box-sizing:border-box
					color:rgba(255,255,255,0.4)
					&.hightlight
						color:#fff
				.desc
					display:inline-block
					vertical-align:top
					margin-left:12px
					line-height:44px
					font-size:16px
					color:rgba(255,255,255,0.4)
					font-weight:700
			.content-right
				flex:0 0 105px
				width:105px
				.pay
					font-size:12px
					text-align:center
					font-weight:700
					color:rgba(255,255,255,0.4)
					height:48px
					line-height:48px
					background:#2b333b
					&.not-enough
						background:#2b333b
					&.enough
						background:#00b43c
						color:#fff
		.shopcart-list
			font-size:0
			position:absolute
			bottom:48px
			z-index:-1
			left:0
			width:100%
			&.fade-enter-active
				transition: all .5s
				transform:translate3d(0,0,0)
			&.fade-enter
				opacity:1
			&.fade-leave-active
				opacity:0
				transition: all .5s
				transform:translate3d(0,-100%,0)
			.list-header
				height:40px
				line-height:40px
				padding:0 18px
				background:#f4f5f7
				border-bottom:1px solid rgba(7,17,27,0.1)
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.empty
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.list-content
				padding:0 18px
				max-height:217px
				background:#fff
				overflow:hidden
				.food
					position:relative
					padding:12px 0
					box-sizing:border-box
					border-bottom:1px solid rgba(7,17,27,0.1)
					.name
						line-height:24px
						font-size:14px
						color:rgb(7,17,27)
					.price
						position:absolute
						right:90px
						bottom:12px
						line-height:24px
						color:red
						font-weight:700
						font-size:14px
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:6px
		.list-mark
			position:fixed
			top:0
			left:0
			width:100%
			height:100%
			z-index:-10
			-webkit-filter: blur(5px)
			background:rgba(7,17,27,0.5)
</style>
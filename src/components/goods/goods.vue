<template>
<div class="good">
	<div class="menu-wrapper" ref="menuWrapper">
		<ul>
			<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
				<span class="text">
					<span v-show="item.type>0" class="icon">
						<icons :number="item.type"></icons>
					</span>
					{{item.name}}
				</span>
			</li>
		</ul>
	</div>
	<div class="foods-wrapper" ref="foodsWrapper">
		<ul>
			<li v-for="item in goods" class="food-list food-list-hook">
				<h1 class="title">{{item.name}}</h1>
				<ul>
					<li @click="selectFood(food)" v-for="food in item.foods" class="food-item">
						<div class="icon">
							<img width="57px" height="57px" :src="food.icon">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span class="count">月售{{food.sellCount}}份</span>
								<span>好评率{{food.rating}}%</span>
							</div>
							<div class="price">
								<span class="now">￥{{food.price}}</span>
								<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<shopcart :sellerFoods="sellerFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
	<food :food="selectedFood" ref="food"></food>
</div>
</template>
<script>
	import icons from "components/icons/icons";
	import BScroll from "better-scroll";
	import shopcart from "components/shopcart/shopcart";
	import cartcontrol from "components/cartcontrol/cartcontrol";
	import food from "components/food/food";
	export default{
		data(){
			return{
				goods:[],
				listHeight:[],
				//每一哥food的高度存入数组
				scrollY:0,
				selectedFood:{}
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		created(){
				console.log(this.listHeight);
			this.$http.get('http://miyoutx.sjduo.com/mytx/index.php/Home/A/test/type/goods').then((response)=>{
				response=response.body;
				this.goods=response
				console.log(this.goods);
				this.$nextTick(()=>{
				this._initScroll();
				this._caculateHeight();
			});
			});
		},
		components:{
			icons,
			shopcart,
			cartcontrol,
			food
		},
		computed:{
			currentIndex(){
				//映射Y轴索引
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			sellerFoods(){
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		methods:{
			selectMenu(index){
				if(!event._constructed){
					return;
				}
				//better-scroll pc会出发两次点击时间 要清除一次
				let foodList= this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el=foodList[index];
				this.foodsScroll.scrollToElement(el,300);

			},
			_initScroll(){
				this.meunScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
					probeType:3,
					click:true
					//希望srcoll滚动的时候 告诉滚动位置
				});
				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));
				})
			},
			_caculateHeight(){
				let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				//找元素
				let height = 0;
				//初始第一哥高度为0
				this.listHeight.push(height);
				//装入数组
				for(let i = 0;i<foodList.length;i++){
					//有多少组food就装多少此
					let item=foodList[i];
					//定义每一组元素
					height+=item.clientHeight;
					// 求出每一组food的高度
					this.listHeight.push(height);
					//装入数组
				}
			},
			selectFood(food){
				if(!event._constructed){
					return;
				}
				this.selectedFood=food;
				this.$refs.food.show();
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.good
		display:flex
		position:absolute
		width:100%
		bottom:46px
		top:177px
		overflow:hidden
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background:#f4f5f7
			.menu-item
				display:table
				height:54px
				width:56px
				line-height:14px
				font-size:0
				padding:0 12px
				border-bottom:1px solid rgba(7,17,27,0.05)
				&.current
					background:#fff
					position:relative
					z-index:10
					border-bottom:0

				.text
					display:table-cell
					width:56px
					vertical-align:middle
					font-size:12px
					.icon
						display:inline-block
						margin-right:2px
		.foods-wrapper
			flex:1 
			.title
				padding-left:14px
				height:26px
				line-height:26px
				border-left:2px solid #d9dde1
				font-size:12px
				color:rgb(147,153,159)
				background:#f3f5f7
			.food-item
				display:flex
				margin:18px
				padding-bottom:14px
				border-bottom:1px solid rgba(7,17,27,0.1)
				&:last-child
					margin-bottom:0
				.icon
					flex:0 0 57px
					margin-right:10px
				.content
					flex:1
					position:relative
					.name
						font-size:14px
						margin:2px 0 8px 0
						height:14px
						line-height:14px
						color:rgb(7,17,27)
					.desc
						margin-bottom:8px
						line-height:12px
						font-size:12px
						color:rgb(147,153,159)
					.extra
						line-height:10px
						font-size:12px
						color:rgb(147,153,159)
						.count
							margin-right:12px
					.price
						font-weight:700
						line-height:24px
						.now
							margin-right:8px
							font-size:8px
							color:red
						.old
							font-size:6px
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:12px
</style>
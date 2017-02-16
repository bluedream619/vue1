<template>
	<div class="icons" :class=classMap[number]>
	</div>
</template>
<script>
	export default{
		props:{
			number:{
				type:Number
			}
		},
		created(){
			this.classMap=['decrease','discount','guarantee','invoice','special']
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl";
	 .icons
	  width:16px
	  height:16px
	  background-size:16px 16px
	  background-repeat:no-repeat
	 .decrease
	  bg-image('decrease_1')
	 .discount
	  bg-image('discount_1')
	 .guarantee
	  bg-image('guarantee_1')
	 .invoice
	  bg-image('invoice_1')	
	 .special
	  bg-image('special_1')	
</style>
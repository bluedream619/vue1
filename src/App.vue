<template>
  <div>
    <tou :seller="seller"></tou>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
      <keep-alive>
      <router-view :seller="seller"></router-view> 
      </keep-alive>
  </div>
</template>
<script>
import tou from 'components/tou/tou';
import {urlParse} from 'common/js/util';
const ERR_OK=0
export default {
  data(){
    return {
      seller:{
        id:(()=>{
          let queryParam = urlParse(); 
          console.log(queryParam);
          return queryParam.id;
        })()
      }
    } 
  },
  created(){
    this.$http.get('http://miyoutx.sjduo.com/mytx/index.php/Home/A/test/type/seller?id='+this.seller.id).then((response) => {
      response= response.body;
     //this.seller=Object.assign({},this.seller,response.body);
      this.seller=Object.assign({},this.seller,response);
      //扩展属性 将ID带入
     console.log(this.seller.id);

      if(response.errno === ERR_OK){
        this.seller= response.data;
          console.log(1);
      }
     
    })
  },
  components:{
    tou
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      .tab-item
        flex:1
        text-align:center
        border:1px solid rgba(7,17,27,0.1)
        & > a
          display:block
          font-size:14px
          color:rgb(77,85,93)
          &.router-link-active
            color:red
            
</style>

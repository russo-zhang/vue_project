<template>
<div>
  <p>demo</p>
   <p>{{str|who}}</p>
   <div v-for="(item,index) in num" :key="index" >{{item|plus}}</div>
</div>
</template>
 
<script>
export default {
  data() {
    return {
      str:"hello world",
      num:[1,2,3,10,20,30]
    }
  },
 filters:{
   who:(str)=>{
       return str.toUpperCase()
   },
   plus:(num)=>{
     return num+1
   }
 }
}
</script>
 
<style lang='less' scoped>
 
</style>
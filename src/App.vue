<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    *{
        margin:0;
        padding:0;
    }
    ul,li{
        list-style:none
    }
    a{
        text-decoration:none;
    }
    #app {
       
    }
</style>

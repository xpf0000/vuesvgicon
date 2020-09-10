<template>
  <div id="app">
    <span>Paths: </span>
    <Icons name="memcached" color="#cc582c" width="50" height="50"></Icons>
    <span>Polygons: </span>
    <Icons name="polygons" width="50" height="50"></Icons>
    <span>Raw: </span>
    <Icons name="trash" width="50" height="50"></Icons>
    <span>Size: </span>
    <div class="d-flex">
      <Icons label="AAABBBCCC"  name="folder" width="12" height="12"></Icons>
      <Icons name="folder" width="24" height="24"></Icons>
      <Icons name="folder" width="48" height="48"></Icons>
      <Icons name="folder" width="64" height="64"></Icons>
    </div>

    <span>Color: </span>
    <div class="d-flex">
      <Icons name="raw" :background-image="true" color="#cc582c" class="wh50 hover"></Icons>
      <Icons name="raw" class="wh50 hover" style="color: #ccb426"></Icons>
      <Icons name="raw" class="wh50 hover" style="color: #1487cc"></Icons>
      <Icons name="raw" class="wh50 hover" style="color: #2fcc52"></Icons>
    </div>

    <span>Flip: </span>
    <div class="d-flex">
      <Icons name="rotate" class="wh50"></Icons>
      <Icons name="rotate" class="wh50" flip="h"></Icons>
      <Icons name="rotate" class="wh50" flip="v"></Icons>
      <Icons name="rotate" class="wh50" flip="vh"></Icons>
    </div>

    <span>Animation: </span>
    <div class="d-flex">
      <Icons name="rotate" class="wh50" :spin="true" ></Icons>
      <Icons name="rotate" :background-image="true" class="wh50" :pulse="true" ></Icons>
    </div>

    <span>Raw File: </span>
    <div class="d-flex">
      <Icons class="wh50" style="color: #1487cc" :content="import('@/svg/C_dingdan.svg')"></Icons>
      <Icons class="wh50" style="color: #2fcc52" :content="path"></Icons>
      <Icons class="wh50" style="color: #1487cc"></Icons>
    </div>
  </div>
</template>

<script>
import Icons from './components/vue-svg-icons'
import './icon/rotate'
import './icon/folder'
import './icon/link'
import './icon/memcached'
import './icon/trash'
import './icon/polygons'
import './icon/raw'
export default {
  name: 'app',
  components: {
    Icons
  },
  data () {
    return {
      path: import('@/svg/C_dingdan.svg')
    }
  },
  mounted () {
    setTimeout(_ => {
      this.path = import('@/svg/C_fangda.svg')
    }, 2000)
  }
}
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
  }
  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .wh50{
    width: 50px;
    height: 50px;
  }
  #app{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px;
    >span{
      margin-top: 20px;
      margin-bottom: 12px;
    }
    svg{
      margin-bottom: 10px;
      margin-right: 30px;
    }
    .d-flex{
      display: flex;
      align-items: baseline;
    }
    .hover{
      transition: all 0.3s;
      &:hover{
        width: 80px;
        height: 80px;
        transform: rotate(180deg);
      }
    }
  }
</style>

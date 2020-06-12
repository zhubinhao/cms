<template>
  <div class="home">
     home
  </div>
</template>

<script lang='ts'>

import {Component, Provide, Vue, Watch} from 'vue-property-decorator'
import {Getter,Action,State} from 'vuex-class'
@Component({
  name: 'Home',
  components:{
  }
})
export default class Home extends Vue {
  @Provide() data: object ={}
  
  @State rankMenu1!:object

  @Getter rankMenu!:object

  @Action public getHome!:any
  
  // @Watch('rankMenu1')
  // getCount(){
  //   console.log(this.rankMenu1)
  // }

  created(){ 
    this.getHome({id:104})
  }
}
</script>
<style lang="scss" scoped >
.home {
  min-width: 1400px;
}

</style>

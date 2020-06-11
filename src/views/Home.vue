<template>
  <div class="home">
  </div>
</template>

<script lang='ts'>

import {Component, Provide, Vue, Watch} from 'vue-property-decorator'
import {Getter,Action} from 'vuex-class'
@Component({
  name: 'Home',
  components:{
  }
})
export default class Home extends Vue {
  @Provide() data: object ={}

  @Getter rankMenu!:object

  @Action public getHome!:any
  
  @Watch('rankMenu')
  getCount(){
    console.log(this.rankMenu)
  }

  created(){ 
    this.getHome({id:104})
  }
}
</script>
<style lang="sass" scoped>

</style>

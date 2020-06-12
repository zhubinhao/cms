<template>
  <div class="Nav ">
     <el-menu
      @open="handleOpen"
      @close="handleClose"
      :default-active="active"
      class="el-menu-vertical-demo menu"
      background-color="#131D29"
      text-color="#fff"
      active-background-color="#fff"
    >
      <div v-for="(it,key) in list" :key="key">
        <!-- <el-menu-item :index="it.list[0].path" v-if="!it.hasMenu" @click="nactveTo(it.list[0])">
          <span slot="title">{{ it.name }}</span>
        </el-menu-item> -->
        <el-submenu :index="key" >
          <template slot="title">
            <span>{{ key }}</span>
          </template>
          <el-menu-item
            v-for="(item,i) in it"
            :index="item.path"
            :key="i"
            :hidden="item.hidden"
            @click="nactveTo(item)"
          >
            {{ item.cn }}
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>

    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  @Provide() private list!:object;
  @Provide() private active: string ='/';

  created() {
    this.list = this.getContents()
  }
  @Watch('$route')
  routeTo(to: any){
      this.active = to.path
  }
  handleOpen(): any {

  }
  nactveTo(e:any): void {
      this.$router.push({ path: e.path })
  }
  getContents(): any {
    let routesArr: any = {};
    ((modules: {(arg0: string): { (): any; new (): any; default: any[] };
        keys: () => string[];
      }) =>
        modules.keys().forEach((key: string) => {
          const keys: string = key.split("-")[1];
          let arr = modules(key).default.map(res => {
            res.type = keys;
            return res;
          });
          routesArr[keys] = arr;
        })
    )(require.context("@/router/modules/", true, /\.ts$/));
    return routesArr
  }
}
</script>

<style scoped lang="scss">
.Nav {
  width: 200px;
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
    overflow-x: hidden;
    background: #545c64;
    overflow-y: auto;
    .el-menu {
      border: none;
    }
    p {
      margin: 100px 0;
    }
  }
}
</style>

<template>
  <div id="app">
    <div class="nav">
      <nav-bar />
    </div>
    <main class="main">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
      </transition>
      <transition name="fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" />
      </transition>
    </main>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";
@Component({
  components: {
    "nav-bar": Nav
  }
})
export default class App extends Vue {}
</script>
<style lang="scss" scoped>
#app {
  .nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 200px;
    box-sizing: border-box;
    overflow: auto;
  }
  .main {
    position: fixed;
    left: 200px;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    box-sizing: border-box;
    overflow: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

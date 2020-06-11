declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.vue' { 
  interface Vue {
    $Message: any,
    $Modal: any,
    axios: any 
  }
}
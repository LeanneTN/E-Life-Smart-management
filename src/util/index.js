let _export={
  saveStore:function (_this){
    if (sessionStorage.getItem('store')) {
        _this.$store.replaceState(Object.assign({}, _this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
      }
      // 在页面刷新时将store保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(_this.$store.state))
      })
}
}

export default _export;


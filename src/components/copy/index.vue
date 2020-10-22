<template>
  <span v-clipboard:copy="text" v-clipboard:success="clipboardSuccess">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M1.41846 0C0.920924 0 0.5 0.411693 0.5 0.919386L0.500005 0.919385V9.23447L0.500005 9.23539C0.500005 9.74265 0.911215 10.1539 1.41847 10.1539H9.73079V0.919386C9.73079 0.41077 9.32002 0 8.81232 0H1.41846ZM10.6539 2.316V11.0769L10.6539 11.0769H2.81508C2.56018 11.0769 2.35355 11.2836 2.35355 11.5385C2.35355 11.7934 2.56018 12 2.81508 12H11.1154C11.3703 12 11.5769 11.7934 11.5769 11.5385V2.31601C11.5769 2.0611 11.3703 1.85447 11.1154 1.85447C10.8605 1.85447 10.6539 2.0611 10.6539 2.316Z"
        fill="#EF4B3A" />
    </svg>
  </span>
</template>

<script>
  export default {
    props:['text'],
    data() {
      return {};
    },
    computed: {},
    mounted() {},
    methods: {
      clipboardSuccess() {
        this.$toast.success("复制成功");
      },

    },
  };
</script>

<style lang="less" scoped></style>
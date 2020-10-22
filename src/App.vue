<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
    overflow:auto;
    -webkit-overflow-scrolling:touch;
    font-size: .12rem;
    color: #000;
    background: rgba(248, 248, 248, 0.7);
  }


  em,
  i {
    font-style: normal;
  }

  a {
    text-decoration: none;
    color: #EF4B3A;
  }

  .fz-14 {
    font-size: .14rem;
  }

  .bg-white {
    background: #fff;
  }

  .text-red {
    color: #EF4B3A;
  }

  img {
    display: block;
  }

  .text-bold {
    font-weight: bold;
  }

  button {
    background: transparent;
    border: none;
  }

  input {
    border: none;
  }

  input::-webkit-input-placeholder{
    color: #c9c9c9;
  }

  .icon-cart {
    display: inline-block;
    width: .16rem;
    height: .13rem;
    background: url('./assets/images/icon-cart.png') no-repeat center/cover;
  }


  .icon-arrow-d {
    display: inline-block;
    width: 0.12rem;
    height: .12rem;
    background: url('./assets/images/arror-d.png') no-repeat center/cover;
  }

  button.buy {
    width: 0.57rem;
    height: .22rem;
    background: #F14A3A;
    border-radius: .04rem;
    display: flex;
    color:#fff;
    justify-content: center;
    align-items: center;
  }

</style>

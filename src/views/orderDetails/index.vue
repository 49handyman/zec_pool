<template>
  <div>
    <div class="data">
      <div class="header text">
        <img v-if="isValid" src="~@/assets/images/ic-wait.png" alt="订单状态" />
        <img v-else src="~@/assets/images/ic-end.png" alt="订单状态" />
        <h4 v-if="isValid">请向下方打款地址付款</h4>
        <h4 v-else>订单已经失效</h4>
        <p>
          该订单将在3个小时内失效，失效<br />
          后打款可能导致资产损失！
        </p>
      </div>
      <ul class="content text">
        <li>
          <p>订单号</p>
          <div class="flex">
            <span class="content-text pad-right">{{orderDetail.orderNo}}</span>
            <copy :text="orderDetail.orderNo"></copy>
          </div>
        </li>
        <li>
          <p>矿机类型</p>
          <span class="content-text">{{getGoodNameById(orderDetail.minerType)}}</span>
        </li>
        <li>
          <p>数量</p>
          <span class="content-text">{{orderDetail.minerNum}}台</span>
        </li>
        <li>
          <p>价格</p>
          <span class="content-text">{{orderDetail.minerPrice}} USDT</span>
        </li>
        <li>
          <p>打款地址</p>
          <div class="item-right flex">
            <div class="content-text pad-right">
              {{orderDetail.usdtAddress}}
              <copy :text="orderDetail.usdtAddress"></copy>
            </div>
            <img class="ico" @click="ewmShow" src="@/assets/images/ic-ewm.png" alt="" />
          </div>
        </li>
        <li>
          <p>手机号</p>
          <span class="content-text">{{orderDetail.mobile}}</span>
        </li>
        <li>
          <p>邮箱</p>
          <span class="content-text">{{orderDetail.email}}</span>
        </li>
      </ul>
      <div class="footer">
        提示：<br />
        请向上述打款地址打入指定数量的USDT，确认到账后我们将会向您发送激活邮件和短信，请您按照指示完成激活。注意请核对好打款地址和数量，打款地址和数量不一致将无法完成购买。您可以将此页面截图，用作向客服咨询时的凭证。
      </div>
      <ConcatCustom />
      <!-- 弹框 -->
      <div class="prop" v-if="isShowQrcode">
        <div class="pop-content">
          <svg class="svg" @click="ewmHide" width="16" height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.7803 2.21967C13.4874 1.92678 13.0126 1.92678 12.7197 2.21967L8 6.93934L3.28033 2.21967L3.20967 2.15728C2.91546 1.92851 2.49003 1.94931 2.21967 2.21967C1.92678 2.51256 1.92678 2.98744 2.21967 3.28033L6.93934 8L2.21967 12.7197L2.15728 12.7903C1.92851 13.0845 1.94931 13.51 2.21967 13.7803C2.51256 14.0732 2.98744 14.0732 3.28033 13.7803L8 9.06066L12.7197 13.7803L12.7903 13.8427C13.0845 14.0715 13.51 14.0507 13.7803 13.7803C14.0732 13.4874 14.0732 13.0126 13.7803 12.7197L9.06066 8L13.7803 3.28033L13.8427 3.20967C14.0715 2.91546 14.0507 2.49003 13.7803 2.21967Z"
              fill="#D5D5ED" />
          </svg>

          <p style="font-weight:700">识别打款地址二维码</p>
          <div id="qrcode" ref="qrcode" class="qrcodeImg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import copy from "@/components/copy/index";
  // 地址转二维码
  import QRCode from "qrcodejs2";
  import ConcatCustom from '@/components/ConcatCustom';
  import store from 'store'
  export default {
    components: {
      copy,
      ConcatCustom
    },

    data() {
      return {
        orderDetail:{},  //订单详情 
        isShowQrcode: false, //是否展示二维码
        isValid:true //订单是否生效
      };
    },
    created() {
      const result = store.get('orderDetail')
      if(result) {
        //如果storage中存在值
        this.orderDetail = result
      }
    },
    methods: {
       //通过id 匹配矿机名称
      getGoodNameById(idx) {
        switch (parseInt(idx)) {
          case 1:
            return '体验矿机'
            break;
          case 2:
            return 'Pocket—S1'
            break;
          case 3:
            return 'Pocket—S1 MAX'
            break;
          case 4:
            return 'Pocket—S2'
            break;
          case 5:
            return 'Pocket—S2 Pro'
            break;
          default:
            return ''
        }
      },
      ewmShow() {
        this.isShowQrcode = true;
        this.$nextTick(() => {
          new QRCode(this.$refs.qrcode, {
            width: 200, // 设置宽度，单位像素
            height: 200, // 设置高度，单位像素
            text: this.orderDetail.usdtAddress, // 设置二维码内容或跳转地址
          });
        });
      },
      ewmHide() {
        this.isShowQrcode = false;
      },

   },
  };
</script>

<style lang="less" scoped>
  .data {
    background: #ffffff;

    .flex {
      display: flex;
      // align-items: center;
    }

    .text {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #000000;
    }

    .header {
      padding: 0.25rem 0 0.3rem;
      text-align: center;
      border-bottom: 0.1rem solid #f8f9fa;

      h4 {
        padding: 0.23rem 0 0.08rem;
      }

      img {
        width: 0.5rem;
        margin: 0 auto;
      }
    }

    .content {
      padding: 0 0.16rem;

      li {
        display: flex;
        justify-content: space-between;
        flex-shrink: 1;
        padding: 0.15rem 0 0.09rem;
        border-bottom: 1px solid #eaeaea;

        p {
          padding-right: 0.15rem;
        }

        .content-text {
          color: #929292;
        }

        .pad-right {
          padding-right: 0.07rem;
        }

        .ico {
          width: 0.12rem;
          height: 0.12rem;
          margin-top: 0.04rem;
          margin-left: 0.4em;
        }

        .item-right {
          flex: 1;
          justify-content: flex-end;
          word-break: break-all;
        }
      }
    }

    .footer {
      font-size: 0.12rem;
      line-height: 0.18rem;
      color: #B2B2B4;
      padding: 0.12rem 0.16rem 0.2rem;
    }
  }

  .footer {
    font-size: 0.12rem;
    line-height: 0.18rem;
    color: #b2b2b4;
    padding: 0.12rem 0.16rem 0.2rem;
  }

  .prop {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;

    .pop-content {
      background: #fff;
      border-radius: 0.06rem;
      width: 3.43rem;
      height: 3.36rem;
      box-sizing: border-box;
      padding: 0.18rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .svg {
        align-self: flex-end;
      }

      p {
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #40405e;
        padding-bottom: 0.32rem;
      }
    }
  }
</style>
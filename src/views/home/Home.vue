<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banners">
      <div v-swiper:mySwiper="swiperOptions">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="banner.id" v-for="banner in banners">
            <a :href="banner.outUrl"><img :src="banner.picZh" alt=""></a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 专属邀请码 -->
    <div class="invite-code bg-white">
      <div class="desc">
        <strong class="title">专属邀请码</strong>
        <i>注册时请填写专属邀请码</i>
      </div>
      <div class="code-action fz-14">
        <div class="code-num">{{copyCode}}</div>
        <a href="javascript:;" class="text-red tag-read" data-clipboard-action="copy"
          :data-clipboard-text="copyCode">复制</a>
      </div>
    </div>
    <!-- 矿机列表 -->
    <div class="goods" :class="{goodsHeight}">
      <div class="item" v-for="item in goodsList" :key="item.id">
        <div class="img-wrap">
          <img :src="item.minerUrl" alt="矿机">
        </div>
        <div class="item-content">
          <h3 class="title">{{getGoodNameById(item.id)}}</h3>
          <div class="details">
            <p>租用时间：<span>{{item.rentTime}}</span>小时</p>
            <p>算力：<span>{{item.producePerHour}}</span>T/小时</p>
            <p>预计产量：<span>{{item.producePerDay}}</span>枚/天</p>
            <p>预计累计产量：<span>{{item.allProduce}}</span>TN</p>
          </div>
          <div class="bot-actions">
            <a href="javascript:;">
              <i class="icon-cart"></i>
              {{!item.usdtPrice ? '赠送' : item.usdtPrice+' USDT'}}
            </a>
            <button class="buy" @click="handleBuyGoods(item.id)">购买</button>
          </div>
        </div>
      </div>
    </div>
    <div class="act-fold" @click="handleShowGoods">
      点击{{isOpenAllGoods ? '收起' : '展开'}}全部矿机 <i class="icon-arrow-d"></i>
    </div>

    <!-- 矿机介绍 -->
    <div class="list-item">
      <div class="item-desc" @click="handleShowContent(0)">
        <div class="con-l">
          <i class="icon-item icon-item1"></i>
          关于矿机
        </div>
        <div class="con-r">
          <i class="icon-arrow-r" :class="{rotate:isShowList[0]}"></i>
        </div>
      </div>
      <div class="item-desc-text" v-show="isShowList[0]">
        <p>
          Treecoin Network优化了IPFS矿机的算力，同时在激励层设置了代币激励计划，代币名叫TN，通过代币激励模式在Treecoin Network上建造了一个去中心化存储市场。<br />
          Pocket矿机拥有三大核心优势，能帮助Treecoin Network存储矿工提供存储空间赚取TN，检索矿工提供数据服务赚取TN。
        </p>
        <div class="advantage">
          <p class="title"><i class="tag-num">01</i>核心算法优势</p>
          <p>零知识证明的计算优化，包括主要耗时模块FFT / Multiexp的性能优化</p>
          <p class="title"><i class="tag-num">02</i>高效稳定的优势</p>
          <p>自研算法和硬件持续优化，在TN多重测试网名列前茅，高效存储和密封时间为矿池运营保驾护航</p>
          <p class="title"><i class="tag-num">03</i>计算优势</p>
          <p>兼顾规模和扩展性，计算整合产生有效存储</p>
        </div>
      </div>
    </div>

    <!-- 币种讲解 -->
    <div class="list-item">
      <div class="item-desc" @click="handleShowContent(1)">
        <div class="con-l">
          <i class="icon-item icon-item2"></i>
          币种讲解
        </div>
        <div class="con-r">
          <i class="icon-arrow-r" :class="{rotate:isShowList[1]}"></i>
        </div>
      </div>
      <div class="item-desc-text" v-show="isShowList[1]">
        <p>
          TN是基于Treecoin
          Network云网协议的新型加密应用货币，采用全新的POC（容量证明）共识算法，由区块链领域资深开发者、学者和投资人共同提出，它优化了IPFS的部分问题，被看做是第二代的IPFS，可为任意区块链提供底层共识支持，其技术创新在于，每个用户只需贡献少量空间，即可参与区块链数据的存储和验证。
          基于Treecoin Netword遍布全球的百万级节点网络将形成一台现象级共识网络，以共管共有公有服务的方式保证Treecoin Netword网络全天候正常运转。
        </p>
      </div>
    </div>

    <!-- 关于我们 -->
    <div class="list-item">
      <div class="item-desc" @click="handleShowContent(2)">
        <div class="con-l">
          <i class="icon-item icon-item3"></i>
          关于我们
        </div>
        <div class="con-r">
          <i class="icon-arrow-r" :class="{rotate:isShowList[2]}"></i>
        </div>
      </div>
      <div class="item-desc-text" v-show="isShowList[2]">
        <p>
          英文名：Treecoin Network<br />
          中文名：树盾协议 代币缩写：TN<br />
          云网协议（Treecoin Network）是一种借鉴并创新IPFS的区块链网络存储分发协议，通过区块链技术实现P2P网络通信、数据加密和数据存储等。同时，Treecoin
          Network还支持开发支付系统，满足数据市场的百万级交易支付需求，使网络、交易更快、更安全、更开放。

        </p>
      </div>
    </div>

    <div class="foot">
      <p class="title">
        <i class="line"></i><span>购买须知</span><i class="line"></i></p>
      <p>
        点击购买矿机输入手机号和邮箱后向指定Erc20地址转入相应数量的usdt，确认到账后会短信和通知矿机cdk，根据邮件里指示可以激活矿机。
      </p>

    </div>
    <!-- 联系我们 -->
    <ConcatCustom />
    <!-- 对话框 -->
    <Dialog v-show="isShowDialog" @confirm="confirmSure" />
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperSlide,
    directive,
  } from 'vue-awesome-swiper'
  import Dialog from '@/components/Dialog.vue'
  import ConcatCustom from '@/components/ConcatCustom'
  import 'swiper/css/swiper.css'
  import Clipboard from 'clipboard';
  import store from 'store'
  export default {
    components: {
      Swiper,
      SwiperSlide,
      Dialog,
      ConcatCustom,
    },
    data() {
      return {
        banners: [],
        swiperOptions: {
          autoplay: {
            disableOnInteraction: false,
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          }
        },
        goodsList: [], //矿机列表
        copyCode: '', //专属邀请码
        buyId: '', //选中的购买id
        isOpenAllGoods: false, //是否展开全部矿机商品
        goodsHeight: true, //类名商品内容高度
        isShowList: [false, false, false], //矿机 币种 关于 bool代表是否展开
        isShowDialog: false, //是否打开弹窗

      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    methods: {
      handleShowGoods() {
        this.isOpenAllGoods = !this.isOpenAllGoods;
        this.goodsHeight = !this.goodsHeight;
      },

      //点击列表项处理
      handleShowContent(idx) {
        this.isShowList.splice(idx, 1, !this.isShowList[idx])
      },
      isOpenMask() {
        this.isShowDialog = !this.isShowDialog;
      },
      //点击购买
      handleBuyGoods(id) {
        this.isOpenMask()
        this.buyId = id;
      },
      //弹窗消失
      confirmSure() {
        this.isOpenMask()
        this.$router.push('/order/' + this.buyId)
      },

      //获取专属验证码
      getInviteCode() {
        //获取专属邀请码
        const inviteCode = this.$route.query.code
        this.copyCode = inviteCode
        //存储到localStorage中
        store.set('inviteCode', inviteCode)
      },
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
      //获取banner图
      async getBanners() {
        const result = await this.$ajax('/news/banner', {
          size: 5
        })
        this.banners = result.data
      },
      //获取矿机列表
      async getGoodsList() {
        const result = await this.$ajax('/minerConfig/list')
        store.set('kcList',result)
        this.goodsList = result.data
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
      let clipboard = new Clipboard('.tag-read');
      clipboard.on('success', () => {
        this.$toast.success('复制成功')
      })
      clipboard.on('error', () => {
        this.$toast.fail('复制失败,请手动复制')
      })

      this.getInviteCode()
      this.getBanners()
      this.getGoodsList()

    },
    directives: {
      swiper: directive
    }
  }
</script>


<style lang="less">
  @import url('./Home.less');
</style>

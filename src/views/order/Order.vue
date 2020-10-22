<template>
    <div class="pay">
        <!-- 头部物品展示 -->
        <div class="top-show">
            <div class="img-wrap">
                <img :src="matchItem.minerUrl" alt="">
            </div>
            <span class="title">{{getGoodNameById(matchItem.id)}}</span>
        </div>
        <!-- 数量金额 -->
        <div class="list-item item-num">
            <div class="list-item-content">
                <span class="num">数量</span>
                <div class="con-r">
                    <div class="num-box">
                        <span class="btn" @click="subNum">-</span>
                        <span class="text">{{goodsNum}}</span>
                        <span class="btn" @click="addNum">+</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-item item-money">
            <div class="list-item-content born">
                <span>金额</span>
                <div class="con-r">
                    <span class="gray">{{initPrice}} USDT</span>
                </div>
            </div>
        </div>
        <!-- 配置类型 -->
        <p class="title-type">配置类型 </p>
        <div class="list-item">
            <div class="list-item-content">
                <span>单价</span>
                <div class="con-r">
                    <span class="gray">{{matchItem.usdtPrice}} USDT</span>
                </div>
            </div>
        </div>
        <div class="list-item">
            <div class="list-item-content">
                <span>算力</span>
                <div class="con-r">
                    <span class="gray">{{matchItem.producePerHour}}T/小时</span>
                </div>
            </div>
        </div>
        <div class="list-item">
            <div class="list-item-content">
                <span>预计产量</span>
                <div class="con-r">
                    <span class="gray">{{matchItem.producePerDay}}枚/天</span>
                </div>
            </div>
        </div>
        <div class="list-item">
            <div class="list-item-content born">
                <span>预计累计产量</span>
                <div class="con-r">
                    <span class="gray">{{matchItem.allProduce}}TN</span>
                </div>
            </div>
        </div>
        <!-- 收件信息 -->
        <p class="title-type">收件信息</p>
        <div class="info-message">
            <div class="info-message-content">
                <p class="label">邮箱</p>
                <input type="text" placeholder="请输入邮箱" v-model="user.email">
            </div>
        </div>
        <div class="info-message">
            <div class="info-message-content born">
                <p class="label">手机</p>
                <input type="text" placeholder="请输入手机号" v-model="user.mobile">
            </div>
        </div>

        <p class="bot-tips">注意：邮箱和手机输错后将无法收到矿机CDK，请认真填写！</p>
        <button class="purchase" @click="handlePurchase">购买</button>
        <!-- 联系我们 -->
        <ConcatCustom />
    </div>
</template>

<script>
    import ConcatCustom from '@/components/ConcatCustom'
    import store from 'store'
    export default {
        components: {
            ConcatCustom
        },
        data() {
            return {
                inviteCode: '', //邀请码
                goodsNum: 1, //默认数量为1
                numLock: false, //是否锁定数据
                matchItem: {}, //匹配的购买项目
                goodsList: [], //矿机列表
                initPrice: 0, //矿机的金额
                user: {
                    email: '', //邮箱
                    mobile: '' //电话
                },
                orderDetail: ''
            }
        },
        methods: {
            async handlePurchase() {
                if (!this.user.email) {
                    this.$toast.fail('请输入邮箱')
                } else if (!this.user.mobile) {
                    this.$toast.fail('请输入手机号')
                } else if (!this.inviteCode) {
                    this.$toast.fail('邀请码不能为空')
                } else {
                    const result = await this.$ajax('/minerConfig/h5Rent', {
                        id: this.matchItem.id,
                        rentNum: this.goodsNum,
                        mobile: this.user.mobile,
                        email: this.user.email,
                        inviteCode: this.inviteCode
                    })
                    if (result.data) {
                        store.set('orderDetail', result.data)
                    }
                    if (result.code === 0) {
                        this.$router.push('/orderDetails');
                    }

                }
            },
            addNum() {
                if (!this.numLock) {
                    this.goodsNum = parseInt(this.goodsNum) + 1;
                    this.initPrice = this.initPrice + parseInt(this.matchItem.usdtPrice)
                }
            },
            subNum() {
                if (!this.numLock) {
                    const {
                        goodsNum
                    } = this;

                    if (goodsNum <= 1) {
                        return
                    } else {
                        this.goodsNum = parseInt(this.goodsNum) - 1
                        this.initPrice = this.initPrice - parseInt(this.matchItem.usdtPrice)
                    }
                }
            },
            //通过id 匹配矿机名称
            getGoodNameById(idx) {
                parseInt(idx) === 1 ? this.numLock = true : this.numLock = false //当为体验矿机的时候锁定数目
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
            //匹配购买的id项
            matchIdContent(id) {
                this.goodsList.forEach((item, index) => {
                    if (item.id == id) {
                        this.matchItem = item
                        this.initPrice = item.usdtPrice
                    }
                })
            },
            //获取矿机列表
            async getGoodsList() {
                const result = store.get('kcList')
                this.goodsList = result.data
                this.matchIdContent(this.$route.params.buyId)
            }


        },
        mounted() {
            this.getGoodsList();
            this.inviteCode = store.get('inviteCode')
        }
    }
</script>

<style lang="less" scoped>
    @import url('./Order.less');
</style>

<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-title">温馨提示</div>
            <div class="content">
                <p>手机号或者邮箱输错后将无法收到矿机CDK，请认真填写！</p>
            </div>
            <a href="javascript:;" class="sure" @click="confirmBtn">确定</a>
        </div>
    </div>
</template>

<script>
    export default {
        props:['confirm'],
        data() {
            return {
                showMask: true,
            }
        },
        methods: {
            closeMask() {
                this.showMask = false;
            },
            confirmBtn() {
                this.$emit('confirm');
            },
        }

    }
</script>

<style lang="less" scoped>
    .dialog {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;

        .dialog-container {
            width: 2.7rem;
            background: #fff;
            border-radius: .02rem;
            box-sizing: border-box;
            padding-top: 0.22rem;
            font-size: 0.14rem;
            color: #333;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .dialog-title {
                font-weight: 700;
            }

            .content p {
                line-height: .2rem;
                margin-top: 0.08rem;
                padding-bottom: .2rem;
                border-bottom: .01rem solid #ddd;
            }

            .sure {
                display: block;
                text-align: center;
                padding: .12rem 0;

            }

        }
    }
</style>
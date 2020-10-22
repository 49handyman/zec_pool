<template>
    <div class="service">
        <p class="call">
            <a :href="serviceUrl"><i class="icon-call"></i>联系客服</a>
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                serviceUrl:''
            }
        },
        methods: {
            async concatService() {
                const result = await this.$ajax('/customerService/getList')
                this.serviceUrl = result.data[0].headUrl
            }
        },
        created() {
            this.concatService()
        }
    }
</script>

<style lang="less" scoped>
    .service {
        p {
            box-sizing: border-box;
            padding: 0 .16rem;
            line-height: .2rem;
            text-align: center;

            &.call {
                a {
                    display: inline-block;
                    color: #369CBB;
                    font-size: .14rem;
                    margin-top: 0.21rem;
                    margin-bottom: 0.48rem;

                    i {
                        display: inline-block;
                        width: .2rem;
                        height: .16rem;
                        margin-right: .05rem;
                        position: relative;
                        top: .03rem;
                        background: url("~@/assets/images/icon-phone.png") no-repeat center/cover;
                    }
                }

            }
        }
    }
</style>
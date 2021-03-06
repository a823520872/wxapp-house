<template>
    <view v-if="isShow" @touchmove.stop.prevent="empty">
        <v-mask @click="hide"></v-mask>
        <view class="ui-dialog ui-dialog-ani" :class="[cls]">
            <view v-if="titleModal" class="ui-dialog__hd">
                <view class="ui-dialog__title">{{ titleModal }}</view>
            </view>
            <scroll-view scroll-y class="ui-dialog__bd">
                <slot name="content">
                    {{ contentModal }}
                </slot>
            </scroll-view>
            <view class="ui-dialog__ft">
                <view v-if="cancelTextModal" class="ui-dialog__btn ui-dialog__btn_default" @tap.stop="hide(true)">
                    <text>{{ cancelTextModal }}</text>
                </view>
                <view class="ui-dialog__btn ui-dialog__btn_primary">
                    <slot name="footer">
                        <view @tap.stop="confirm">{{ confirmTextModal }}</view>
                    </slot>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'modal',
    props: {
        title: {
            type: String,
            default() {
                return ''
            },
        },
        content: {
            type: String,
            default() {
                return ''
            },
        },
        cancelText: {
            type: String,
            default() {
                return ''
            },
        },
        confirmText: {
            default() {
                return ''
            },
        },
    },
    data() {
        return {
            isShow: false,
            cls: '',
            titleModal: '',
            contentModal: '',
            cancelTextModal: '',
            confirmTextModal: '',
        }
    },
    methods: {
        show(cfg) {
            this.isShow = true

            this.cls = cfg.bodyCls

            this.titleModal = cfg.title || this.title

            this.contentModal = cfg.content || this.content

            this.cancelTextModal = cfg.cancelText || this.cancelText

            this.confirmTextModal = cfg.confirmText || this.confirmText

            this.successFun = cfg.success || null
            this.failFun = cfg.fail || null
        },
        hide(boolean) {
            this.isShow = false
            // boolean为true时，代表点击的取消按钮
            this.failFun && this.failFun(boolean)
        },
        confirm() {
            if (this.successFun) {
                const callback = this.successFun()
                callback
                    ? callback.then(() => {
                          this.isShow = false
                      })
                    : (this.isShow = false)
            } else {
                this.isShow = false
            }
        },
        empty() {},
    },
}
</script>

<style lang="scss">
.ui-dialog {
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 600upx;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: $uni-bg-color;
    text-align: center;
    border-radius: 6upx;
    overflow: hidden;
    font-size: 32upx;

    &.width-91 {
        width: 91%;
        max-width: 100%;
    }

    &-ani {
        animation: aniDialog 0.3s forwards ease-in 0s 1 normal;
    }

    @keyframes aniDialog {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    &__hd {
        padding: 1.3em 1.6em 0.5em;
    }

    &__title {
        line-height: 1.6;
        font-weight: 400;
        font-size: 36upx;
    }

    &__bd {
        width: 100%;
        min-height: 80upx;
        max-height: 700upx;
        overflow: auto;
        box-sizing: border-box;
        font-size: 30upx;
        line-height: 1.3;
        word-wrap: break-word;
        word-break: break-all;
        color: $uni-text-color-placeholder;
    }

    &__bd:first-child {
        padding: 2.7em 40upx 1.7em;
        color: #353535;
    }

    &__ft {
        position: relative;
        // height: 96upx;
        line-height: 96upx;
        font-size: 36upx;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }

    &__ft:after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1upx;
        border-top: 1upx solid $border-color;
        color: $border-color;
    }

    &__btn {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #09bb07;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        position: relative;

        button {
            line-height: 96upx;
            font-size: 36upx;
            padding: 0;
        }
    }

    &__btn:active {
        background-color: $uni-bg-color-hover;
    }

    &__btn:after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 1upx;
        bottom: 0;
        border-left: 1upx solid $border-color;
        color: $border-color;
    }

    &__btn:first-child:after {
        display: none;
    }

    &__btn_default {
        color: #353535;
    }

    &__btn_primary {
        color: $main-color;
        background-color: #fff;
    }
}
</style>

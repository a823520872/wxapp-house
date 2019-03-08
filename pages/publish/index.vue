<template>
    <view class="content content_bg_ff">
        <view class="not_landlord" v-if="step === 0">
            <view class="bd m_flex">
                <image class="m_flex_item" src="/static/image/publish/intro.png" mode="aspectFit"></image>
            </view>
            <view class="fd" @tap="showLink">
                <text>咨询村长</text>
            </view>
            <button class="m_button main btn_add m_flex_center m_flex_middle m_flex_column" plain @tap="goPage(`/pages/publish/settled`)">
                <view>申请</view>
                <view>入驻</view>
            </button>
            <v-modal ref="modal">
                <view slot="content">
                    <link-modal :temp="temp"></link-modal>
                </view>
            </v-modal>
        </view>
        <view class="is_landlord" v-if="step === 1">
            <view class="hd">
                <view class="title">发帖真实性承诺</view>
                <view class="con">为维护真房源环境，请据实发帖</view>
                <view class="con">如发现虚假，平台将删帖并扣除保证金。</view>
            </view>
            <view class="bd">
                <view class="cells">
                    <view class="cell m_flex_middle">
                        <view class="img">
                            <image src="/static/image/publish/shangchuan.png" mode="aspectFit"></image>
                        </view>
                        <view class="m_flex_item">
                            <view>上传实拍图片</view>
                            <view>上传与房源相关的真实图片</view>
                        </view>
                    </view>
                    <view class="cell m_flex_middle">
                        <view class="img">
                            <image src="/static/image/publish/info.png" mode="aspectFit"></image>
                        </view>
                        <view class="m_flex_item">
                            <view>房源如实描述</view>
                            <view>房源真实在租，位置及厅室等信息真实有效</view>
                        </view>
                    </view>
                    <view class="cell m_flex_middle">
                        <view class="img">
                            <image src="/static/image/publish/rent.png" mode="aspectFit"></image>
                        </view>
                        <view class="m_flex_item">
                            <view>房租标价合理</view>
                            <view>标明实际租住价格，承诺不收取额外费用</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="fd m_button primary" @tap="goPage(`/pages/publish/house`)">我承诺并立即发布</view>
        </view>
    </view>
</template>

<script>
import { mapActions } from "vuex";
import linkModal from '../components/link-modal';
export default {
    components: {
        linkModal
    },
    data() {
        return {
            step: 0,
            temp: {
                contact_mobile: '',
                wechat_number: ''
            }
        };
    },
    methods: {
        getData() { },
        showLink() {
            this.$refs.modal.show({
                title: "联系方式",
                confirmText: "确定",
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.not_landlord {
    .bd {
        width: 750upx;
        height: 2228upx;
        padding-top: 90upx;
    }

    .fd {
        height: 100upx;
        line-height: 100upx;
        text-decoration: underline;
        text-align: center;
        color: #0404ff;
    }
    .btn_add {
        display: flex;
        position: fixed;
        right: 20upx;
        bottom: 100upx;
        width: 120upx;
        height: 120upx;
        line-height: 1.2;
        background-color: $main-color;
        color: #fff;
        border-radius: 50%;
        overflow: hidden;
    }
}
.is_landlord {
    padding: 0 30upx;

    .hd {
        font-size: 30upx;
        line-height: 1.7;

        .title {
            padding: 57upx 0 23upx;
            font-size: 37upx;
            color: $primary-color;
        }
    }

    .bd {
        padding: 90upx 0;
        line-height: 1.77;
        font-size: 26upx;

        .cell {
            padding: 27upx 0 28upx;
        }

        .img {
            width: 85upx;
            height: 85upx;
            padding-left: 24upx;
            padding-right: 40upx;
        }
    }

    .fd {
        width: 100%;
        height: 100upx;
        margin: 30upx 0;
        padding: 0;
        text-align: center;
        line-height: 100upx;
        font-size: 33upx;
    }
}
</style>

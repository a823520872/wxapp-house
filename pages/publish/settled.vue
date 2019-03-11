<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view class="bg">
                <image src="/static/image/publish/settled_bg.png" mode="aspectFit"></image>
            </view>
        </view>
        <view class="bd">
            <view class="cells">
                <view class="cell m_flex">
                    <view class="label">姓名</view>
                    <view class="model m_flex_middle"><input type="text" v-model="form.name" placeholder="请输入您的姓名" maxlength="20" /></view>
                </view>
                <view class="cell m_flex">
                    <view class="label">手机号</view>
                    <view class="model m_flex_middle"><input type="number" v-model="form.mobile" placeholder="请输入您的手机号" /></view>
                </view>
                <!-- <view class="cell m_flex">
                    <view class="label">验证码</view>
                    <view class="model m_flex_middle">
                        <input class="m_flex_item" type="number" v-model="code" placeholder="请输入短信验证码" />
                        <view class="m_button main btn_code" @tap="getCode">获取验证码</view>
                    </view>
                </view> -->
                <!-- <view class="cell m_flex">
                    <view class="label">房源数量</view>
                    <view class="model m_flex_middle"><input type="number" v-model="form.num" /></view>
                </view> -->
                <view class="cell m_flex">
                    <view class="label">房源位置</view>
                    <view class="model m_flex_middle">
                        <picker mode="multiSelector" :range="[]" @change="addrChange">
                            <view class="addr_picker m_flex_middle">
                                <view class="addr_item m_textover">广州市</view>
                                <view class="addr_pull bottom_icon"></view>
                            </view>
                            <!-- </picker>
                        <picker :range="[]" @change=""> -->
                            <view class="addr_picker m_flex_middle">
                                <view class="addr_item m_textover">天河区</view>
                                <view class="addr_pull bottom_icon"></view>
                            </view>
                            <!-- </picker>
                        <picker :range="[]" @change=""> -->
                            <view class="addr_picker last m_flex_middle">
                                <view class="addr_item m_textover">上社</view>
                                <view class="addr_pull bottom_icon"></view>
                            </view>
                        </picker>
                    </view>
                </view>
                <view class="cell m_flex">
                    <view class="label">
                        推荐人
                        <text class="tips">（选填）</text>
                    </view>
                    <view class="model m_flex_middle"><input type="number" v-model="form.referrer_user_mobile" placeholder="输入推荐人手机号" /></view>
                </view>
            </view>
            <view class="m_button main btn_confirm" @tap="confirm">提交</view>
        </view>
        <view class="fd"></view>
    </view>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            form: {
                name: "",
                mobile: "",
                position_province_id: "",
                position_province: "广东省",
                position_city_id: "",
                position_city: "广州市",
                postion_district_id: "",
                postion_district: "天河区",
                postion_street_id: "",
                postion_street: "上社",
                // num: "",
                referrer_user_mobile: ""
            },
            // addrList: {
            //     p: null,
            //     c: null,
            //     d: null,
            //     s: null
            // },
            code: ""
        };
    },
    // computed: {
    //     citys() {
    //         return this;
    //     }
    // },
    onReady() {
        this.getData();
    },
    methods: {
        getData() {
            this.$request.getAddrList().then(res => {
                console.log(res);
            });
        },
        getCode() {},
        addrChange(e) {
            console.log(e);
        },
        validate() {
            return new Promise((resolve, reject) => {
                if (!this.form.name) {
                    reject({
                        msg: "请输入姓名"
                    });
                }
                if (!this.form.mobile) {
                    reject({
                        msg: "请输入手机号码"
                    });
                }
                if (!this.testMobile(this.form.mobile)) {
                    reject({
                        msg: "手机号码不正确"
                    });
                }
                if (!this.form.postion_street) {
                    reject({
                        msg: "请选择地址"
                    });
                }
                resolve();
            });
        },
        confirm() {
            this.validate().then(
                () => {
                    this.$request.addLandlord(this.form).then(res => {
                        this.goPage(`/pages/publish/settled_succ`);
                    });
                },
                e => {
                    uni.showToast({
                        title: e.msg,
                        icon: "none"
                    });
                }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    background-color: #e9f9f9;
}
.hd {
    padding: 0 92upx;
    background-color: #e9f9f9;
    .bg {
        width: 566upx;
        height: 362upx;
    }
}
.bd {
    margin: 0 30upx;
    padding: 50upx 30upx;
    background-color: #fff;

    .cells {
        font-size: 30upx;
    }

    .cell {
        height: 90upx;
        line-height: 90upx;
        border-bottom: 1upx solid $border-color;
    }

    .label {
        min-width: 148upx;
        padding-right: 20upx;
    }

    input {
        font-size: 30upx;
    }

    .tips {
        font-size: 25upx;
    }

    .btn {
        &_code {
            min-width: 140upx;
            margin-left: 20upx;
            padding: 8upx 28upx;
            border-radius: 22upx;
            text-align: center;
        }
        &_confirm {
            width: 100%;
            height: 66upx;
            margin: 91upx 0 26upx;
            padding: 0;
            line-height: 64upx;
            text-align: center;
            border-radius: 7upx;
            font-size: 33upx;
        }
    }
}
.fd {
    height: 158upx;
    background-color: #e9f9f9;
}
.addr {
    &_picker {
        padding-right: 30upx;
    }
    &_item {
        width: 100upx;
    }
    &_pull {
        width: 14upx;
        height: 14upx;
    }
}
</style>

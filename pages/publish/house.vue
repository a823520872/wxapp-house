<template>
    <view class="content">
        <view class="step_one" v-if="step === 0">
            <view class="hd">
                <view class="bg">
                    <image src="/static/image/publish/house_bg.png" mode="aspectFit"></image>
                </view>
                <view class="warn">请如实填写信息，如有虚假会有账号封禁及扣除保证金等处罚</view>
                <view class="main m_flex_column m_flex_middle">
                    <view class="photo_box m_flex_column m_flex_middle m_flex_center" @tap="chooseImg">
                        <image class="photo" src="/static/image/publish/photo.png" mode="aspectFit"></image>
                        <text>{{houseTempImg && houseTempImg.length ? '编辑' : '上传'}}照片</text>
                    </view>
                    <view class="tips">上传房间、厨房、厕所、阳台、楼照租房率更高哦~</view>
                </view>
            </view>
            <view class="bd">
                <view class="cells">
                    <view class="cells_title m_flex_middle">基本信息</view>
                    <view class="cell m_flex_center m_flex_middle">
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">租金</view>
                            <input class="cell_bd" type="text" v-model="form.rental" placeholder="请输入房源租金" />
                        </view>
                    </view>
                    <view class="cell m_flex_center m_flex_middle">
                        <picker class="m_flex_item" :range="[]" @change="">
                            <view class="cell_box m_flex_item">
                                <view class="cell_hd">地址</view>
                                <view class="cell_bd">请选择</view>
                            </view>
                        </picker>
                        <picker class="m_flex_item" :range="[]" @change="">
                            <view class="cell_box m_flex_item">
                                <view class="cell_hd">标志建筑</view>
                                <view class="cell_bd">请选择</view>
                            </view>
                        </picker>
                        <picker class="m_flex_item" :range="[]" @change="">
                            <view class="cell_box m_flex_item">
                                <view class="cell_hd">路边距离</view>
                                <view class="cell_bd">请选择</view>
                            </view>
                        </picker>
                    </view>
                    <view class="cell m_flex_center m_flex_middle">
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">具体地址</view>
                            <input class="cell_bd" type="text" v-model="form.address_detail" placeholder="请输入具体地址" />
                        </view>
                    </view>
                    <view class="cell m_flex_center m_flex_middle">
                        <picker class="m_flex_item" :range="[]" @change="">
                            <view class="cell_box m_flex_item">
                                <view class="cell_hd">房型</view>
                                <view class="cell_bd">请选择</view>
                            </view>
                        </picker>
                        <picker class="m_flex_item" :range="[]" @change="">
                            <view class="cell_box m_flex_item">
                                <view class="cell_hd">楼层</view>
                                <view class="cell_bd">请选择</view>
                            </view>
                        </picker>
                    </view>
                </view>
                <view class="cells">
                    <view class="cells_title m_flex_middle">联系方式</view>
                    <view class="cell m_flex_middle">
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">联系电话</view>
                            <input class="cell_bd" type="text" v-model="form.contact_mobile" placeholder="请输入联系电话" />
                        </view>
                    </view>
                    <view class="cell m_flex_middle">
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">微信号</view>
                            <input class="cell_bd" type="text" v-model="form.wechat_number" placeholder="请输入微信号" />
                        </view>
                    </view>
                </view>
            </view>
            <view class="fd" @tap="next">下一步</view>
        </view>
        <view class="step_two next" v-else-if="step === 1">
            <view class="cells">
                <view class="cells_title">
                    一般配置
                </view>
                <view class="cell m_flex_wrap">
                    <view class="info_item">床</view>
                    <view class="info_item">衣柜</view>
                    <view class="info_item">桌椅</view>
                    <view class="info_item">热水器</view>
                </view>
            </view>
            <view class="cells">
                <view class="cells_title">
                    房屋亮点
                </view>
                <view class="cell m_flex_wrap">
                    <view class="info_item">空调</view>
                    <view class="info_item">洗衣机</view>
                    <view class="info_item">冰箱</view>
                    <view class="info_item">阳台</view>
                    <view class="info_item">沙发</view>
                    <view class="info_item">茶几</view>
                    <view class="info_item">电梯</view>
                    <view class="info_item">光线好</view>
                    <view class="info_item">房大</view>
                </view>
            </view>
            <view class="cells">
                <view class="cells_title">
                    补充说明（选填）
                </view>
                <view class="cell">
                    <textarea placeholder="详细的介绍会加大租房率" v-model="form.supplement"></textarea>
                </view>
            </view>
            <view class="fd" @tap="confirm">确认发布</view>
        </view>
        <view class="empty"></view>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(["userInfo", "houseTempImg"])
    },
    data() {
        return {
            step: 0,
            form: {
                images: [],
                landlord_id: "",
                landlord_mobile: "",
                rental: "",
                address_street_id: 1969,
                address_street: "上社15",
                address_flag_id: 3752,
                address_flag: "上社市场",
                road_distance_id: 1,
                road_distance: "第一栋",
                address_detail: "二巷四号",
                house_type_id: 10,
                house_type: "一房一厅",
                floor_number: 2,
                contact_mobile: "19900010001",
                wechat_number: "19900010001",
                config_base_ids: "1,2",
                config_base: "床,衣柜",
                config_lightspot_ids: "1,2",
                config_lightspot: "空调,洗衣机",
                supplement: "非常好"
            },
            house_id: ""
        };
    },
    onLoad(res) {
        if (res.id) {
            this.house_id = res.id;
        }
    },
    onReady() {
        this.getData();
    },
    methods: {
        ...mapMutations(["setHouseTempImg"]),
        getData() {},
        chooseImg() {
            const self = this;
            if (this.houseTempImg && this.houseTempImg.length) {
                self.goPage(`/pages/publish/img`);
            } else {
                uni.chooseImage({
                    sourceType: "album",
                    success(e) {
                        console.log(e);
                        if (e.errMsg === "chooseImage:ok") {
                            self.setHouseTempImg(e.tempFilePaths);
                            self.goPage(`/pages/publish/img`);
                        }
                    }
                });
            }
        },
        next() {
            this.step = 1;
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
            this.$validate(this.form, {
                name: [{}]
            });
            this.goPage({ path: `/pages/publish/publish_succ`, replace: true });
        }
    }
};
</script>

<style lang="scss" scoped>
.step_one,
.step_two {
    overflow: auto;
}
.hd {
    position: relative;
    .bg {
        width: 750upx;
        height: 375upx;
    }
    .warn {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 55upx;
        padding: 0 30upx;
        line-height: 55upx;
        background-color: #283136;
        font-size: 25upx;
        color: #fff;
    }
    .main {
        position: absolute;
        top: 55upx;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .photo_box {
        width: 166upx;
        height: 166upx;
        margin-top: 56upx;
        border: 1upx solid #cad3d7;
        background-color: #738995;
        border-radius: 50%;
        font-size: 25upx;
        color: #fff;
    }
    .photo {
        width: 56upx;
        height: 42upx;
        padding-bottom: 5upx;
    }
    .tips {
        margin-top: 39upx;
        font-size: 25upx;
        color: #fff;
    }
}
.bd {
    text-align: center;
    .cells {
        padding: 0 30upx;
        background-color: #fff;

        & + .cells {
            margin-top: 18upx;
        }

        &_title {
            height: 90upx;
            line-height: 90upx;
            font-size: 33upx;

            &::before {
                content: " ";
                display: inline-block;
                width: 5upx;
                height: 22upx;
                margin-right: 7upx;
                background-color: $main-color;
            }
        }
    }
    .cell {
        height: 132upx;
        border-top: 1upx solid $border-color;

        picker {
            position: relative;
            & + picker::before {
                content: " ";
                position: absolute;
                top: 50%;
                left: 0;
                width: 0;
                height: 69upx;
                border-left: 1upx solid #a8a8a8;
                transform: translateY(-50%);
            }
        }

        &_hd {
            font-size: 33upx;
            padding-bottom: 5upx;
        }

        &_bd {
            font-size: 25upx;
            color: $text-color-inverse;
        }
    }
}
.empty {
    height: 100upx;
}
.fd {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100upx;
    line-height: 100upx;
    text-align: center;
    font-size: 33upx;
    background-color: $main-color;
    color: #fff;
}

.next {
    padding-top: 30upx;
    .cells {
        padding: 0 30upx;
        &_title {
            padding-bottom: 30upx;
            font-size: 33upx;
        }
    }
    .cell {
        &.m_flex_wrap {
            margin-right: -26upx;
        }
    }
    .info_item {
        height: 56upx;
        margin-right: 26upx;
        margin-bottom: 30upx;
        padding: 0 30upx;
        min-width: 80upx;
        line-height: 56upx;
        background-color: #f5f5f5;
        border-radius: 20upx;
        font-size: 25upx;
        text-align: center;
        color: $text-color-inverse;
        &.active {
            background-color: $primary-color;
            color: #fff;
        }
    }
    textarea {
        width: 100%;
        padding: 10upx 16upx;
        border: 1upx solid $border-color;
        font-size: 33upx;
        box-sizing: border-box;
        line-height: 1.2;
    }
    .fd {
        background-color: $primary-color;
    }
}
</style>

<template>
    <view>
        <view class="hd">
            <image src="/static/image/index/tie1.png" mode="aspectFill"></image>
        </view>
        <view class="bd">
            <view class="cells">
                <view class="cells_hd">
                    户型
                </view>
                <view class="cells_bd"></view>
            </view>
            <view class="cells">
                <view class="cells_hd">
                    期望地点
                </view>
                <view class="cells_bd"></view>
            </view>
            <view class="cells">
                <view class="cells_hd">
                    预期租金
                </view>
                <view class="cells_bd"></view>
            </view>
            <view class="cells">
                <view class="cells_hd">
                    预计租房日期
                </view>
                <view class="cells_bd"></view>
            </view>
            <view class="cells">
                <view class="cells_hd">
                    微信号
                </view>
                <view class="cells_bd"></view>
            </view>
            <view class="cells">
                <view class="cells_hd">
                    其他说明
                </view>
                <view class="cells_bd"></view>
            </view>
        </view>
        <view class="fd">
            <button class="m_button primary" @tap="confirm">提交</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        };
    },
    methods: {
        confirm() {
            // this.$validate(this.form, {
            //     rental: [{ required: true, msg: "请输入租金" }],
            //     address_street: [{ required: true, msg: "请选择地址" }],
            //     address_flag: [{ required: true, msg: "请选择标志建筑" }],
            //     road_distance: [{ required: true, msg: "请选择路边距离" }],
            //     house_type: [{ required: true, msg: "请选择房型" }],
            //     floor_number: [{ required: true, msg: "请输入楼层" }],
            //     images: [
            //         { type: "array", msg: "请上传图片" },
            //         { min: 2, msg: "请至少上传2张图片" }
            //     ]
            // });
            this.goPage("/pages/index/require_succ");
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

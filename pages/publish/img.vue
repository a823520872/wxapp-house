<template>
    <view class="content">
        <view class="hd">
            <view class="banner">
                <image :src="houseTempImg[0]" @tap="showImg(houseTempImg[0])" :mode="CONFIG.house_mode"></image>
            </view>
            <template v-if="houseTempImg && houseTempImg.length">
                <view class="close" @tap="del(0)">
                    <image src="/static/image/index/del.png" mode="aspectFit"></image>
                </view>
                <view class="intro">首图</view>
            </template>
        </view>
        <view class="bd m_flex_wrap">
            <block v-for="(li, i) in houseTempImg" :key="i">
                <view v-if="i > 0" class="item">
                    <view class="img" @tap="showImg(li)">
                        <image :src="li" :mode="CONFIG.house_mode"></image>
                    </view>
                    <view class="close" @tap="del(i)">
                        <image src="/static/image/index/del.png" mode="aspectFit"></image>
                    </view>
                </view>
            </block>
            <view v-if="houseTempImg.length < 8" class="item m_flex_center m_flex_middle" @tap="chooseImg">
                <view class="photo">
                    <image src="/static/image/publish/photo_1.png" mode="aspectFit"></image>
                </view>
            </view>
        </view>
        <view class="empty" :class="{ ipx: CONFIG.isIphoneX }"></view>
        <view class="fd">
            <button class="m_button btn" @tap="confirm">完成</button>
        </view>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState(['houseTempImg', 'houseImg']),
    },
    data() {
        return {}
    },
    methods: {
        ...mapMutations(['setHouseTempImg', 'setHouseImg']),
        showImg(li) {
            uni.previewImage({
                current: li,
                urls: this.houseTempImg,
            })
        },
        chooseImg() {
            const num = 9 - this.houseTempImg.length
            this.chooseImage(num).then(e => {
                if (e.errMsg === 'chooseImage:ok') {
                    const list = [...this.houseTempImg, ...e.tempFilePaths]
                    this.setHouseTempImg(list)
                }
            })
        },
        del(i) {
            const list = [...this.houseTempImg]
            list.splice(i, 1)
            this.setHouseTempImg(list)
        },
        uploadImg(filePath) {
            return new Promise((resolve, reject) => {
                if (filePath.indexOf('zhiqiang.ink') > 0) {
                    resolve({
                        url: filePath,
                    })
                } else {
                    this.$request
                        .uploadImg({
                            filePath,
                        })
                        .then(
                            res => {
                                resolve(res.data)
                            },
                            e => {
                                reject(e)
                            }
                        )
                }
            })
        },
        confirm() {
            if (this.houseTempImg.length < 2) {
                uni.showToast({
                    title: '至少上传两张图片',
                    icon: 'none',
                })
                return
            }
            let tasks = this.houseTempImg.map(item => {
                return this.uploadImg(item)
            })
            this.queneUpload(tasks)
            this.setHouseImg([])
            this.setHouseTempImg([])
        },
        queneUpload(tasks) {
            uni.showLoading({
                title: '正在上传中……',
                mask: true,
            })
            let houseImg = []
            new Promise((resolve, reject) => {
                if (tasks.length > 4) {
                    let arr = tasks.splice(0, 4)
                    Promise.all(arr)
                        .then(res => {
                            houseImg.push(...res)
                            return Promise.all(tasks)
                        })
                        .then(resolve)
                } else {
                    Promise.all(tasks).then(resolve)
                }
            })
                .then(res => {
                    houseImg.push(...res)
                    this.setHouseImg(houseImg)
                    uni.hideLoading()
                    uni.navigateBack({
                        delta: 1,
                    })
                })
                .catch(e => {
                    uni.hideLoading()
                    uni.showToast({
                        title: e && e.message,
                        icon: 'none',
                    })
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.hd {
    position: relative;
    padding-bottom: 30upx;
    background-color: #fff;
    .banner {
        width: 100%;
        height: 479upx;
    }
    .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 46upx;
        height: 46upx;
        padding: 10upx;
    }
    .intro {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 75upx;
        margin-bottom: 30upx;
        background-color: rgba(0, 0, 0, 0.3);
        line-height: 75upx;
        text-align: center;
        font-size: 30upx;
        color: #fff;
    }
}
.bd {
    margin-top: 18upx;
    padding: 30upx 10upx 20upx;
    background-color: #fff;

    &.m_flex_wrap {
        margin-right: -10upx;

        .item {
            position: relative;
            width: 237upx;
            height: 177upx;
            margin-right: 10upx;
            margin-bottom: 10upx;
            background-color: #dfdfdf;
        }

        .img {
            width: 100%;
            height: 100%;
        }

        .close {
            position: absolute;
            top: 0;
            right: 0;
            width: 46upx;
            height: 46upx;
            padding: 10upx;
        }
        .photo {
            width: 86upx;
            height: 65upx;
        }
    }
}
.fd {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: #eee;
    font-size: 0;

    .btn {
        width: 100%;
        height: 100upx;
        padding: 0;
        line-height: 100upx;
        background-color: $primary-color;
        border-radius: 0;
        text-align: center;
        font-size: 33upx;
        color: #fff;
    }
}
</style>

<template>
    <view class="content">
        <!-- <view class="cells" v-if="userInfo">
            <view class="cell">
                <view class="cell_hd m_flex_middle">
                    <image class="avatar" :src="userInfo.avatar" mode="aspectFit"></image>
                    <text>{{ userInfo.nickname }}</text>
                </view>
                <view class="cell_bd">
                    <image class="qrcode" :src="qrcode" mode="aspectFit"></image>
                </view>
                <view class="cell_fd m_text_center">扫码可识别我的全部房源</view>
            </view>
        </view>
        <view class="btns">
            <button class="m_button main long btn" @tap="saveImg">保存我的二维码图片</button>
        </view> -->
        <view class="hd" v-if="userInfo && houseInfo">
            <view class="poster">
                <view class="title">村里租房 | {{ userInfo.nickname }}的房源信息</view>
                <view class="main">
                    <view class="info">
                        <image class="avatar" :src="userInfo.avatar" mode="aspectFit"></image>
                        <view class="name">{{ userInfo.nickname }}</view>
                        <view class="addr">{{ houseInfo.postion_district }} {{ houseInfo.postion_street }} 房东</view>
                        <view class="num" v-if="houseInfo.house_data">我有{{ houseInfo.house_data.house_count }}套现房出租</view>
                    </view>
                    <view class="house">
                        <view class="house_info m_flex">
                            <view class="label">户型：</view>
                            <view class="value m_flex_item">{{ houseInfo.house_data.house_type }}</view>
                        </view>
                        <view class="house_info m_flex">
                            <view class="label">位置：</view>
                            <view class="value m_flex_item">{{ houseInfo.house_data.house_address_street }}</view>
                        </view>
                        <view class="house_info m_flex">
                            <view class="label">租金：</view>
                            <view class="value m_flex_item">{{ houseInfo.house_data.house_rental }}/月</view>
                        </view>
                    </view>
                    <view class="point">“为远在他乡的您提供最温馨的服务”</view>
                    <view class="m_flex_center m_flex_middle">
                        <image class="qrcode" :src="qrcode" mode="aspectFit"></image>
                        <view class="intro">
                            <view>长按识别二维码</view>
                            <view>查看我的现房信息</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="bd">
            <canvas class="canvas" canvas-id="downloadCanvas" :style="{ width: canvasImg.width + 'px', height: canvasImg.height + 'px' }"></canvas>
        </view>
        <view class="empty"></view>
        <view class="fd">
            <button class="m_button main btn" @tap="savePhoto">保存海报</button>
        </view>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
const r = 0.5
export default {
    onShareAppMessage() {
        return {
            title: '房源列表',
            path: `/pages/index/index?p=` + encodeURIComponent(`/pages/me/publish/?user_id=${this.userInfo.landlord_id}`),
        }
    },
    computed: {
        ...mapState(['userInfo', 'urlPrefix']),
        // qrcode() {
        //     // '/api/qrcode/build?text=/pages/index/index?p=%2Fpages%2Fme%2Fpublish%3Fid%3D435'
        //     return `${this.urlPrefix}/api/qrcode/build?text=/pages/index/index?p=${encodeURIComponent('/pages/me/publish?id=' + this.userInfo.landlord_id)}`
        // },
    },
    data() {
        return {
            houseInfo: null,
            qrcode: '',
            canvasImg: {
                width: 690 * r,
                height: 1026 * r,
            },
            canvasImgSrc: '',
            hasDownload: false,
        }
    },
    onLoad(res) {
        this.getData()
    },
    watch: {
        canvasImgSrc(v) {
            if (v && this.hasDownload) {
                this.saveImg()
            }
        },
    },
    methods: {
        getData() {
            Promise.all([
                this.$request.getHouseResourceInfo({
                    landlord_id: this.userInfo.landlord_id,
                }),
                this.$request.getPublishQRCode({
                    // page: `pages/index/index?page=${encodeURIComponent('/pages/me/publish?user_id=' + this.userInfo.user_id)}`,
                    page: `pages/me/publish?user_id=${this.userInfo.user_id}`,
                }),
            ]).then(([res1, res2]) => {
                this.houseInfo = {
                    ...{
                        house_data: {
                            house_address_street: '',
                            house_count: 0,
                            house_rental: 0,
                            house_type: '',
                        },
                    },
                    ...(res1.data || {}),
                }
                let { data, errmsg } = res2.data || {}
                if (errmsg) {
                    uni.showToast({
                        icon: 'none',
                        title: errmsg,
                    })
                } else if (data) {
                    this.qrcode = data
                    this.getCanvasTempFile().then(res => {
                        console.log(res)
                        this.canvasImgSrc = res
                    })
                }
            })
        },
        saveImg() {
            uni.showLoading({
                title: '正在下载中……',
                mask: true,
            })
            this.downloadFile(this.qrcode).then(
                filePath => {
                    uni.showLoading({
                        mask: true,
                    })
                    this.saveImgToPhoto(filePath)
                },
                e => {
                    console.log(e)
                    uni.hideLoading()
                    uni.showToast({
                        icon: 'none',
                        title: '图片保存失败',
                    })
                }
            )
        },
        savePhoto() {
            console.log(this.canvasImgSrc)
            console.log(this.hasDownload)
            if (!this.canvasImgSrc) {
                this.hasDownload = true
                return uni.showLoading({
                    title: '正在下载中……',
                    mask: true,
                })
            } else if (!this.hasDownload) {
                uni.showLoading({
                    mask: true,
                })
            }
            this.saveImgToPhoto(this.canvasImgSrc)
        },
        saveImgToPhoto(uri) {
            uni.saveImageToPhotosAlbum({
                filePath: uri,
                success: res => {
                    console.log(res)
                    uni.hideLoading()
                    uni.showToast({
                        icon: 'none',
                        title: '图片保存成功',
                    })
                },
                fail: e => {
                    console.log(e)
                    uni.hideLoading()
                    uni.showToast({
                        icon: 'none',
                        title: '图片保存失败',
                    })
                },
            })
        },
        downloadFile(url) {
            return new Promise((resolve, reject) => {
                // #ifdef H5
                if (url.indexOf('https://house.zhiqiang.ink') !== -1) {
                    url = url.replace('https://house.zhiqiang.ink', 'http://127.0.0.1:8081')
                }
                // #endif
                uni.downloadFile({
                    url,
                    success: res => {
                        console.log('downloadFile')
                        if (res.statusCode === 200) {
                            resolve(res.tempFilePath)
                        } else {
                            reject(res)
                        }
                    },
                    fail: e => reject(e),
                })
            })
        },
        getImageInfo(uri) {
            return new Promise((resolve, reject) => {
                // #ifdef MP-WEIXIN
                if (uri.indexOf('http://') === 0) {
                    uri = uri.replace('http://', 'https://')
                }
                uni.getImageInfo({
                    src: uri,
                    success: res => {
                        console.log(res)
                        resolve(res.path)
                    },
                    fail: reject,
                })
                // #endif
                // #ifdef H5
                if (uri.indexOf('https://house.zhiqiang.ink') !== -1) {
                    uri = uri.replace('https://house.zhiqiang.ink', 'http://127.0.0.1:8081')
                }
                fetch(uri)
                    .then(response => response.blob())
                    .then(res => {
                        resolve(URL.createObjectURL(res))
                    })
                // #endif
            })
        },
        getCanvasTempFile() {
            return this.draw().then(ctx => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        uni.canvasToTempFilePath({
                            canvasId: 'downloadCanvas',
                            x: 0,
                            y: 0,
                            width: this.canvasImg.width,
                            height: this.canvasImg.height,
                            success: res => {
                                console.log('getCanvasTempFile')
                                resolve(res.tempFilePath)
                            },
                            fail: e => {
                                reject()
                            },
                            complete: () => {},
                        })
                    }, 100)
                })
            })
        },
        draw() {
            return Promise.all([this.getImageInfo(this.userInfo.avatar), this.getImageInfo(this.qrcode)]).then(([avatar, qrcode]) => {
                console.log(avatar, qrcode)
                const ctx = uni.createCanvasContext('downloadCanvas')
                let y = 0
                // 背景
                ctx.setFillStyle('#d5efef')
                ctx.fillRect(0 * r, 0 * r, 690 * r, 1026 * r)

                // 文字从顶部开始
                ctx.setTextBaseline('middle')
                // 文字居中
                ctx.setTextAlign('center')

                // 标题
                y += 36
                ctx.setFontSize(Math.round(24 * r))
                ctx.setFillStyle('#0E868F')
                ctx.fillText(`村里租房 | ${this.userInfo.nickname}的房源信息`, 345 * r, y * r)

                // 白色背景
                y += 36
                ctx.setFillStyle('#ffffff')
                ctx.fillRect(20 * r, y * r, 650 * r, 934 * r)

                ctx.save()

                // 头像圆角
                y += 40
                ctx.arc(345 * r, y * r + (120 * r) / 2, 60 * r, 0, Math.PI * 2, false)
                ctx.setFillStyle('#0E868F')
                ctx.fill()
                ctx.clip()

                // 头像
                ctx.drawImage(avatar, 345 * r - (120 * r) / 2, y * r, 120 * r, 120 * r)
                ctx.restore()

                // 名字
                y += 150
                ctx.setFontSize(Math.round(32 * r))
                ctx.setFillStyle('#333')
                ctx.fillText(this.userInfo.nickname, 345 * r, y * r)

                // 地址
                y += 47
                ctx.setFontSize(Math.round(26 * r))
                ctx.setFillStyle('#666')
                ctx.fillText(`${this.houseInfo.postion_district} ${this.houseInfo.postion_street} 房东`, 345 * r, y * r)

                // 房源数量
                y += 86
                ctx.setFontSize(Math.round(60 * r))
                ctx.setFillStyle('#0E868F')
                ctx.fillText(`我有${this.houseInfo.house_data.house_count}套现房出租`, 345 * r, y * r)

                // 浅蓝色背景
                y += 69
                ctx.setFillStyle('#F6FBFB')
                ctx.fillRect(50 * r, y * r, 590 * r, 186 * r)

                // 文字居左
                ctx.setTextAlign('left')

                // 户型
                y += 40
                ctx.setFontSize(Math.round(30 * r))
                ctx.setFillStyle('#999')
                ctx.fillText(`户型：`, 90 * r, y * r)

                ctx.setFillStyle('#333')
                ctx.fillText(`${this.houseInfo.house_data.house_type}`, 180 * r, y * r)

                // 位置
                y += 56
                ctx.setFontSize(Math.round(30 * r))
                ctx.setFillStyle('#999')
                ctx.fillText(`位置：`, 90 * r, y * r)

                ctx.setFillStyle('#333')
                ctx.fillText(`${this.houseInfo.house_data.house_address_street}`, 180 * r, y * r)

                // 租金
                y += 56
                ctx.setFontSize(Math.round(30 * r))
                ctx.setFillStyle('#999')
                ctx.fillText(`租金：`, 90 * r, y * r)

                ctx.setFillStyle('#333')
                ctx.fillText(`${this.houseInfo.house_data.house_rental}/月`, 180 * r, y * r)

                // 文字居中
                ctx.setTextAlign('center')

                // 标语
                y += 87
                ctx.setFontSize(Math.round(26 * r))
                ctx.setFillStyle('#999')
                ctx.fillText(`“为远在他乡的您提供最温馨的服务”`, 345 * r, y * r)

                // 线
                y += 48
                ctx.setStrokeStyle('#f2f2f2')
                ctx.beginPath()
                ctx.moveTo(50 * r, y * r)
                ctx.lineTo(640 * r, y * r)
                ctx.stroke()

                // 二维码
                y += 31
                ctx.drawImage(qrcode, 92 * r, y * r, 200 * r, 200 * r)

                // 文字居左
                ctx.setTextAlign('left')

                // 提示
                y += 80
                ctx.setFontSize(Math.round(32 * r))
                ctx.setFillStyle('#0E868F')
                ctx.fillText(`长按识别二维码`, 342 * r, y * r)

                y += 40
                ctx.fillText(`查看我的现房信息`, 342 * r, y * r)

                return new Promise((resolve, reject) => {
                    ctx.draw(false, () => resolve(ctx))
                })
            })
        },
    },
}
</script>

<style lang="scss" scoped>
// .cells {
//     .cell {
//         margin: 60upx 30upx 0;
//         background-color: #fff;
//         border-radius: 10upx;
//         line-height: 40upx;
//         font-weight: bold;
//         font-size: 32upx;
//         color: #333;
//     }
//     .cell_hd {
//         padding: 50upx;
//     }
//     .avatar {
//         width: 120upx;
//         height: 120upx;
//         margin-right: 30upx;
//         border-radius: 50%;
//     }
//     .cell_bd {
//         padding: 0 50upx;
//     }
//     .qrcode {
//         width: 590upx;
//         height: 590upx;
//     }
//     .cell_fd {
//         padding: 50upx;
//     }
// }
// .btns {
//     margin: 60upx 30upx;
//     .btn {
//         padding: 25upx 0;
//         line-height: 40upx;
//         border-radius: 45upx;
//         font-size: 32upx;
//     }
// }
.hd {
    position: relative;
    margin: 30upx;
    overflow: hidden;
    border-radius: 10upx;
    background-color: #d5efef;
    .title {
        padding: 20upx 0;
        text-align: center;
        line-height: 32upx;
        font-size: 24upx;
        color: #0e868f;
    }
    .main {
        margin: 0 20upx 20upx;
        padding: 30upx;
        background-color: #fff;
        border-radius: 20upx;
    }

    .info {
        text-align: center;
    }

    .avatar {
        width: 120upx;
        height: 120upx;
        margin: 10upx;
        border-radius: 50%;
    }

    .name {
        line-height: 40upx;
        // font-weight: bold;
        font-size: 32upx;
        color: #333;
    }

    .addr {
        margin-top: 10upx;
        line-height: 34upx;
        font-size: 26upx;
        color: #666;
    }

    .num {
        padding: 35upx 0;
        line-height: 68upx;
        // font-weight: bold;
        font-size: 60upx;
        color: #0e868f;
    }

    .house {
        padding: 20upx 40upx;
        background-color: #f6fbfb;
        line-height: 38upx;
        font-size: 30upx;
    }

    .house_info {
        margin-top: 16upx;
        &:first-child {
            margin-top: 0;
        }
    }

    .label {
        color: #999;
    }
    .value {
        color: #333;
    }
    .point {
        margin-bottom: 30upx;
        padding: 30upx;
        border-bottom: 1upx solid #f2f2f2;
        text-align: center;
        line-height: 34upx;
        font-size: 26upx;
        color: #999;
    }

    .qrcode {
        width: 200upx;
        height: 200upx;
        border-radius: 10upx;
    }

    .intro {
        margin-left: 50upx;
        line-height: 40upx;
        // font-weight: bold;
        font-size: 32upx;
        color: #0e868f;
    }
}
.bd {
    position: relative;
    overflow: hidden;

    .canvas {
        position: fixed;
        top: -10000upx;
        right: 0;
        left: 0;
        width: 690upx;
        height: 1026upx;
    }
}
.empty {
    height: 120upx;
}
.fd {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 15upx 30upx;
    background-color: #fff;
    z-index: 999;
    .btn {
        display: block;
        height: 90upx;
        padding: 0;
        line-height: 88upx;
        font-size: 32upx;
        border-radius: 45upx;
    }
}
</style>

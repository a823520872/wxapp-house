<template>
    <view class="content">
        <view class="step_one" v-if="step === 0">
            <view class="hd">
                <view class="tips">请如实填写信息，如有虚假会有账号封禁及扣除保证金等处罚</view>
                <view class="cells">
                    <view class="cells_title m_flex_middle">照片视频</view>
                    <view class="upload m_flex_justify">
                        <view class="media_box">
                            <view class="upload_box" v-if="houseImg && houseImg.length" @tap="chooseImg">
                                <image :src="houseImg[0].url" :mode="CONFIG.house_mode"></image>
                            </view>
                            <view class="upload_box m_flex_center m_flex_middle m_flex_column" v-else @tap="chooseImg">
                                <!-- <view class="upload_icon"></view> -->
                                <!-- <view class="upload_info">上传照片（必填）</view> -->
                                <image class="upload_img" src="/static/image/publish/choose_image.png" mode="aspectFit"></image>
                            </view>
                            <button class="m_button btn" @tap.stop="chooseImg">{{ houseImg && houseImg.length ? '编辑' : '上传' }}照片（必填）</button>
                        </view>
                        <view class="media_box">
                            <view class="upload_box" v-if="form.videos && form.videos.length">
                                <video class="vdo" :src="form.videos[0].url" controls></video>
                            </view>
                            <view class="upload_box m_flex_center m_flex_middle m_flex_column" v-else @tap="chooseVdo">
                                <view class="tips">支持20s内</view>
                                <!-- <view class="upload_icon"></view> -->
                                <!-- <view class="upload_info">上传视频（选填）</view> -->
                                <image class="upload_img" src="/static/image/publish/choose_video.png" mode="aspectFit"></image>
                            </view>
                            <button class="m_button btn" @tap.stop="chooseVdo">{{ form.videos && form.videos.length ? '重新选择' : '上传视频' }}（选填）</button>
                        </view>
                    </view>
                </view>
            </view>
            <!-- <view class="hd">
                <view class="bg">
                    <image :src="houseImg[0] ? houseImg[0].url : '/static/image/publish/house_bg.png'" :mode="CONFIG.house_mode"></image>
                </view>
                <view class="warn">请如实填写信息，如有虚假会有账号封禁及扣除保证金等处罚</view>
                <view class="main m_flex_column m_flex_middle">
                    <view class="photo_box m_flex_column m_flex_middle m_flex_center" @tap="chooseImg">
                        <image class="photo" src="/static/image/publish/photo.png" mode="aspectFit"></image>
                        <text>{{ houseImg[0] ? '编辑' : '上传' }}照片</text>
                    </view>
                    <view class="tips">上传房间、厨房、厕所、阳台、楼照租房率更高哦~</view>
                </view>
            </view> -->
            <view class="bd">
                <view class="cells">
                    <view class="cells_title m_flex_middle">基本信息</view>
                    <view class="cell m_flex_center m_flex_middle">
                        <picker class="picker_box cell_box m_flex_item" :range="house_type" mode="selector" @change="pickerChange('house_type', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">房型</view>
                            <view class="cell_bd">{{ form.house_type ? form.house_type : '请选择' }}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.house_type" placeholder="请输入房型" />
                        </view> -->
                        </picker>
                        <picker class="picker_box cell_box m_flex_item" :range="floor" mode="selector" @change="pickerChange('floor', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">楼层</view>
                            <view class="cell_bd">{{ form.floor ? form.floor : '请选择' }}</view>
                            <!-- <input class="cell_bd" type="number" v-model="form.floor" placeholder="请输入楼层" />
                        </view> -->
                        </picker>
                    </view>
                    <view class="cell m_flex_center m_flex_middle">
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">租金</view>
                            <input class="cell_bd" type="digit" v-model="form.rental" placeholder="请输入" />
                        </view>
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">水费/度</view>
                            <input class="cell_bd" type="digit" v-model.number="form.fee_wather" placeholder="请输入" />
                        </view>
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">电费/吨</view>
                            <input class="cell_bd" type="digit" v-model.number="form.fee_electric" placeholder="请输入" />
                        </view>
                    </view>
                    <view class="cell m_flex_center m_flex_middle" v-if="config && config.deposit">
                        <picker class="picker_box cell_box m_flex_item" :range="depositArray" mode="selector" @change="pickerChange('deposit', $event)">
                            <view class="cell_hd">押金</view>
                            <view class="cell_bd">{{ form.deposit ? form.deposit : '请选择房源押金' }}</view>
                        </picker>
                    </view>
                    <view class="cell m_flex_center m_flex_middle" v-if="config">
                        <picker class="picker_box cell_box m_flex_item" :range="address_street" mode="multiSelector" @change="pickerChange('address_street', $event)" @columnchange="columnChange">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">地址</view>
                            <view class="cell_bd">{{ form.address_street ? form.address_street : '请选择' }}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.address_street" placeholder="请输入地址" /> -->
                            <!-- </view> -->
                        </picker>
                        <picker class="picker_box cell_box m_flex_item" :range="address_flag" mode="selector" @change="pickerChange('address_flag', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">标志建筑</view>
                            <view class="cell_bd">{{ form.address_flag ? form.address_flag : '请选择' }}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.address_flag" placeholder="请输入标志建筑" /> -->
                            <!-- </view> -->
                        </picker>
                        <picker class="picker_box cell_box m_flex_item" :range="road_distance" mode="selector" @change="pickerChange('road_distance', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">路边距离</view>
                            <view class="cell_bd">{{ form.road_distance ? form.road_distance : '请选择' }}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.road_distance" placeholder="请输入路边距离" /> -->
                            <!-- </view> -->
                        </picker>
                    </view>
                    <view class="cell m_flex_center m_flex_middle">
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">详细地址（选填）</view>
                            <input class="cell_bd" type="text" v-model="form.address_detail" placeholder="请输入具体地址" />
                        </view>
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
            <view class="empty" :class="{ ipx: CONFIG.isIphoneX }"></view>
            <view class="fd">
                <button class="m_button btn" @tap="next">下一步</button>
            </view>
        </view>
        <view class="step_two next" v-else-if="step === 1">
            <view class="cells">
                <template v-if="config && config.config_base && config && config.config_base.length">
                    <view class="cells_title m_flex_middle">
                        一般配置
                    </view>
                    <view class="cell m_flex_wrap">
                        <view :class="{ info_item: true, active: li.active }" v-for="(li, i) in config.config_base" :key="i" @tap="chooseCfgBase(li)">{{ li.value }}</view>
                    </view>
                </template>
                <template v-if="config && config.config_lightspot && config && config.config_lightspot.length">
                    <view class="cells_title m_flex_middle">
                        房屋亮点
                    </view>
                    <view class="cell m_flex_wrap">
                        <view :class="{ info_item: true, active: li.active }" v-for="(li, i) in config.config_lightspot" :key="i" @tap="chooseCfgLight(li)">{{ li.value }}</view>
                    </view>
                </template>
            </view>
            <view class="cells">
                <view class="cells_title m_flex_middle">
                    房屋描述
                </view>
                <view class="cell">
                    <textarea class="txta" placeholder="详细的介绍会加大租房率" v-model="form.remarks"></textarea>
                </view>
            </view>
            <view class="empty" :class="{ ipx: CONFIG.isIphoneX }"></view>
            <!-- <view class="fd" @tap="confirm">确认发布</view> -->
            <view class="fd">
                <button class="m_button btn" @tap="confirm">确认发布</button>
            </view>
        </view>
        <v-modal ref="modal">
            <view class="modal m_flex_middle" slot="content">
                <input class="modal_input m_flex_item" type="digit" v-model.number="deposit" placeholder="请输入押金" />
                <text>元</text>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
const qiniuUploader = require('../../common/qiniuUploader.js')
export default {
    computed: {
        ...mapState(['userInfo', 'houseTempImg', 'houseImg']),
        address_street() {
            return (
                this.config &&
                this.config.address_street &&
                this.config.address_street.map(lis => {
                    return lis.map(li => li.name)
                })
            )
        },
        address_flag() {
            return this.config && this.config.address_flag && this.config.address_flag.map(item => item.shortname || '')
        },
        road_distance() {
            return this.config && this.config.road_distance && this.config.road_distance.map(item => item.value)
        },
        house_type() {
            return this.config && this.config.house_type && this.config.house_type.map(item => item.value)
        },
        floor() {
            return this.config && this.config.floor && this.config.floor.map(item => item.value)
        },
        address() {
            return this.form.address_street || ''
        },
        depositArray() {
            return this.config && this.config.deposit && this.config.deposit.map(item => item.value)
        },
    },
    data() {
        return {
            step: 0,
            form: {
                images: [],
                videos: [],
                landlord_id: '',
                // landlord_mobile: "",
                rental: '',
                fee_wather: '',
                fee_electric: '',
                deposit: '',
                address_street_id: 1969,
                address_street: '',
                address_flag_id: 3752,
                address_flag: '',
                road_distance_id: 1,
                road_distance: '',
                address_detail: '',
                house_type_id: '',
                house_type: '',
                floor: '',
                floor_number: '',
                contact_mobile: '',
                wechat_number: '',
                config_base_ids: '',
                config_base: '',
                config_lightspot_ids: '',
                config_lightspot: '',
                remarks: '',
            },
            house_id: '',
            config: {
                house_type: null,
                floor: null,
                road_distance: null,
                address_street: null,
                address_flag: null,
                config_base: null,
                config_lightspot: null,
                deposit: null,
            },
            addr: null,
            deposit: '',
        }
    },
    onLoad(res) {
        if (res.id) {
            this.house_id = res.id
        }
        this.setHouseImg([])
    },
    onShow() {
        if (this.houseImg && this.houseImg.length) {
            this.form.images = this.houseImg
        }
    },
    onReady() {
        // #ifdef MP-WEIXIN
        this.login().then(code => {
            // #endif
            this.getData()
            this.getInfo()
            // #ifdef MP-WEIXIN
        })
        // #endif
    },
    methods: {
        ...mapMutations(['setHouseTempImg', 'setHouseImg', 'setHomeReload', 'setCollectReload']),
        ...mapActions(['login', 'getInfo', 'checkAuth']),
        getData() {
            this.getConfig()
            this.getAddr()
            this.getHouse()
            // this.getLandlord();
        },
        getConfig() {
            this.$request.getConfig().then(res => {
                if (res && res.data) {
                    const config = res.data.reduce((obj, item) => {
                        if (item.remark && item.remark === 'calculate') return obj
                        if (!obj[item.type]) {
                            obj[item.type] = []
                        }
                        item.active = false
                        obj[item.type].push(item)
                        return obj
                    }, {})
                    if (config.deposit && config.deposit.length) {
                        config.deposit.push({
                            value: '自定义',
                        })
                    }

                    this.config = { ...this.config, ...config }
                }
            })
        },
        getAddr() {
            this.$request.getAddrList().then(res => {
                if (res && res.data) {
                    const city = res.data.filter(item => item.level === 2)
                    const addr = res.data.reduce((obj, item) => {
                        if (!item.pid) return obj
                        if (!obj[item.pid]) {
                            obj[item.pid] = []
                        }
                        obj[item.pid].push(item)
                        return obj
                    }, {})
                    const address_street = [[...city]]
                    const district = addr[city[0].id]
                    if (district && district.length) {
                        address_street.push([...district])
                        const county = addr[district[0].id]
                        if (county && county.length) {
                            address_street.push([...county])
                        }
                    }
                    this.addr = addr
                    this.config = {
                        ...this.config,
                        address_street,
                    }
                }
            })
        },
        getAreaFlag(id) {
            this.$request.getAreaFlag({ pid_area_street: id }).then(res => {
                if (res && res.data) {
                    try {
                        this.config = {
                            ...this.config,
                            address_flag: res.data,
                        }
                    } catch (error) {
                        this.log(error)
                    }
                }
            })
        },
        getHouse() {
            if (this.house_id) {
                this.$request.getHouse({ id: this.house_id }).then(res => {
                    if (res && res.data) {
                        let data = res.data
                        const images = data.image_urls ? data.image_urls.split(',') : []
                        this.setHouseTempImg([...images])
                        this.setHouseImg(
                            images.map(item => ({
                                url: item,
                            }))
                        )
                        data.images = images.map(item => ({
                            url: item,
                        }))
                        data.videos = data.video_urls ? data.video_urls.split(',') : []
                        this.form = { ...data, address_detail: data.address_detail || '', remarks: data.remarks || '' }
                    }
                })
            } else {
                this.form.contact_mobile = this.userInfo.landlord_mobile
                this.form.wechat_number = this.userInfo.landlord_mobile
            }
        },
        chooseImg() {
            return new Promise(resolve => {
                if (this.houseImg && this.houseImg.length) {
                    resolve(this.houseImg.map(item => item.url))
                } else {
                    this.chooseImage(9).then(e => {
                        if (e.errMsg === 'chooseImage:ok') {
                            resolve(e.tempFilePaths)
                        }
                    })
                }
            }).then(imgs => {
                this.setHouseTempImg(imgs)
                this.goPage(`/pages/publish/img`)
            })
        },
        chooseVdo() {
            this.chooseVideo().then(video => {
                if (video.errMsg === 'chooseVideo:ok') {
                    if (video.duration > 20)
                        return uni.showToast({
                            title: '视频已超过20S，请上传短视频',
                            icon: 'none',
                        })
                    if (video.size > 20 * 1024 * 1024)
                        return uni.showToast({
                            title: '视频已超出20MB，请上传短视频',
                            icon: 'none',
                        })
                    uni.showLoading({
                        title: '上传视频中',
                    })
                    this.getQiniuToken().then(
                        token => {
                            qiniuUploader.upload(
                                video.tempFilePath,
                                res => {
                                    uni.hideLoading()
                                    uni.showToast({
                                        title: '上传成功',
                                        icon: 'success',
                                    })
                                    this.form.videos = [
                                        {
                                            url: res.imageURL,
                                        },
                                    ]
                                },
                                e => {
                                    uni.hideLoading()
                                    uni.showToast({
                                        title: '上传失败',
                                        icon: 'none',
                                    })
                                    console.log(e)
                                },
                                {
                                    uptoken: token,
                                    // uploadURL: 'https://house.zhiqiang.ink/api/upload/uploadImage',
                                    // uptokenURL: 'https://house.zhiqiang.ink/api/upload/getUploadToken',
                                    uploadURL: 'https://upload-z0.qiniup.com',
                                    domain: 'https://image.zhiqiang.ink/',
                                }
                            )
                        },
                        e => {
                            uni.hideLoading()
                        }
                    )
                }
            })
        },
        getQiniuToken() {
            return this.$request
                .getQiniuToken()
                .then(
                    res => {
                        if (res.data && res.data.token) {
                            return res.data.token
                        }
                    },
                    e => {
                        if (e.data && e.data.token) {
                            return res.data.token
                        }
                    }
                )
                .catch(e => {
                    this.log(e)
                })
        },
        columnChange(e) {
            let { column, value } = e.detail
            const setColumn = () => {
                let item = this.config.address_street[column][value]
                if (!item) return
                if (column++ < 2) {
                    let p = this.config.address_street
                    p[column] = this.addr[item.id] || []
                    this.config = {
                        ...this.config,
                        address_street: p,
                    }
                    value = 0
                    setColumn()
                }
            }
            setColumn()
        },
        pickerChange(key, e) {
            const value = e.detail.value
            const mappings = new Map([
                [
                    'address_street',
                    () => {
                        const item = this.config.address_street[2][value[2]]
                        this.form.address_street = item ? item.name : ''
                        this.form.address_street_id = item ? item.id : ''
                        item && this.getAreaFlag(item.id)
                    },
                ],
                [
                    'address_flag',
                    () => {
                        this.form[key] = this.config[key][value].shortname
                        this.form[`${key}_id`] = this.config[key][value].id
                    },
                ],
                [
                    'road_distance',
                    () => {
                        this.form[key] = this.config[key][value].value
                        this.form[`${key}_id`] = this.config[key][value].id
                    },
                ],
                [
                    'house_type',
                    () => {
                        this.form[key] = this.config[key][value].value
                        this.form[`${key}_id`] = this.config[key][value].id
                    },
                ],
                [
                    'floor',
                    () => {
                        let item = this.config[key][value]
                        this.form.floor_number = item.key
                        this.form.floor = item.value
                    },
                ],
                [
                    'deposit',
                    () => {
                        let item = this.config[key][value]
                        if (item.id) {
                            this.form.deposit = item.value
                        } else {
                            this.$refs.modal.show({
                                title: '押金',
                                confirmText: '确定',
                                success: () => {
                                    if (this.deposit > 0) {
                                        this.form.deposit = this.deposit + '元'
                                    }
                                },
                            })
                        }
                    },
                ],
            ])
            let fn = mappings.get(key)
            fn && fn()
        },
        next() {
            this.checkAuth().then(res => {
                if (!res) return

                this.$validate(this.form, {
                    rental: [{ required: true, msg: '请输入租金' }],
                    deposit: [{ require: true, msg: '请选择押金' }],
                    address_street: [{ required: true, msg: '请选择地址' }],
                    address_flag: [{ required: true, msg: '请选择标志建筑' }],
                    road_distance: [{ required: true, msg: '请选择路边距离' }],
                    house_type: [{ required: true, msg: '请选择房型' }],
                    floor_number: [{ required: true, msg: '请输入楼层' }],
                    images: [
                        { type: 'array', msg: '请上传图片' },
                        { min: 2, msg: '请至少上传2张图片' },
                    ],
                }).then(
                    () => {
                        const config_base = this.form.config_base ? this.form.config_base.split(',') : []
                        const config_lightspot = this.form.config_lightspot ? this.form.config_lightspot.split(',') : []
                        this.config.config_base.map(item => {
                            if (config_base.indexOf(item.value) > -1) {
                                item.active = true
                            }
                        })
                        this.config.config_lightspot.map(item => {
                            if (config_lightspot.indexOf(item.value) > -1) {
                                item.active = true
                            }
                        })
                        this.step = 1
                    },
                    e => {
                        uni.showToast({
                            title: e.msg,
                            icon: 'none',
                        })
                    }
                )
            })
        },
        filterForm() {
            const config_base = this.config.config_base.filter(item => item.active)
            const config_lightspot = this.config.config_lightspot.filter(item => item.active)
            this.form.landlord_id = this.userInfo.landlord_id
            this.form.config_base_ids = config_base.map(item => item.id).join(',')
            this.form.config_base = config_base.map(item => item.value).join(',')
            this.form.config_lightspot_ids = config_lightspot.map(item => item.id).join(',')
            this.form.config_lightspot = config_lightspot.map(item => item.value).join(',')
        },
        confirm() {
            this.checkAuth().then(res => {
                if (!res) return
                this.filterForm()
                this.$validate(this.form, {
                    house_type: [{ required: true, msg: '请选择房型' }],
                    floor_number: [{ required: true, msg: '请输入楼层' }],
                    rental: [{ required: true, msg: '请输入租金' }],
                    address_street: [{ required: true, msg: '请选择地址' }],
                    address_flag: [{ required: true, msg: '请选择标志建筑' }],
                    road_distance: [{ required: true, msg: '请选择路边距离' }],
                    images: [
                        { type: 'array', msg: '请上传图片' },
                        { min: 2, msg: '请至少上传2张图片' },
                    ],
                }).then(
                    () => {
                        const api = this.form.id ? ((this.form.hr_id = this.form.id), 'editHouse') : 'addHouse'
                        const { landlord_info, image_urls, video_urls, ...params } = this.form
                        params.images = params.images.map(item => {
                            if (typeof item === 'string') {
                                item = {
                                    url: item,
                                }
                            }
                            return item
                        })
                        params.videos = params.videos.map(item => {
                            if (typeof item === 'string') {
                                item = {
                                    url: item,
                                }
                            }
                            return item
                        })
                        this.$request[api](params).then(res => {
                            if (res && res.data) {
                                this.setHouseTempImg([])
                                this.setHouseImg([])
                                this.setHomeReload(true)
                                this.setCollectReload(true)
                                this.goPage({
                                    path: `/pages/publish/publish_succ?id=${this.form.id || res.data}`,
                                    replace: true,
                                })
                            }
                        })
                    },
                    e => {
                        uni.showToast({
                            title: e.msg,
                            icon: 'none',
                        })
                    }
                )
            })
        },
        chooseCfgBase(li) {
            li.active = !li.active
        },
        chooseCfgLight(li) {
            li.active = !li.active
        },
    },
}
</script>

<style lang="scss" scoped>
.hd {
    .tips {
        padding: 13upx 24upx;
        background-color: #0e868f;
        font-size: 26upx;
        line-height: 34upx;
        color: #fff;
    }
}
.upload {
    padding: 10upx 0 40upx;
    text-align: center;
    .tips {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: transparent;
        color: #0e868f;
    }
    .upload_box {
        position: relative;
        width: 335upx;
        height: 252upx;
        background-color: #f2f2f2;
        overflow: hidden;
    }
    .upload_icon {
        position: relative;
        width: 81upx;
        height: 81upx;
        &::before,
        &::after {
            content: ' ';
            position: absolute;
            top: 0;
            left: 50%;
            width: 0;
            height: 100%;
            border-left: 10upx solid #d8d8d8;
            border-radius: 5upx;
            transform: translateX(-50%);
        }
        &::after {
            transform-origin: center;
            transform: translateX(-50%) rotate(90deg);
        }
    }
    .upload_info {
        margin-top: 21upx;
        line-height: 34upx;
        font-size: 26upx;
        color: #666;
    }
    .upload_img {
        width: 66upx;
        height: 66upx;
    }
    .vdo {
        width: 100%;
        height: 100%;
    }
    .btn {
        width: 250upx;
        height: 60upx;
        margin-top: 32upx;
        padding: 0;
        line-height: 60upx;
        text-align: center;
        background-color: #e9fbfb;
        border-radius: 30upx;
        font-size: 26upx;
        color: #0e868f;
    }
}
.hd,
.bd {
    .cells {
        padding: 0 30upx;
        background-color: #fff;

        & + .cells {
            margin-top: 18upx;
        }

        &_title {
            // height: 90upx;
            padding: 30upx 0 20upx;
            line-height: 40upx;
            font-weight: bold;
            font-size: 32upx;
            color: #333;

            &::before {
                content: ' ';
                display: inline-block;
                width: 8upx;
                height: 30upx;
                margin-right: 10upx;
                background-color: $main-color;
                border-radius: 4upx;
            }

            & + .cell {
                border-top: none;
            }
        }
    }
    .cell {
        height: 132upx;
        border-top: 1upx solid $border-color;

        // &_box {
        //     height: 100%;
        // }

        &_hd {
            font-size: 33upx;
            padding-bottom: 5upx;
        }

        &_bd {
            height: 52upx;
            line-height: 52upx;
            font-size: 30upx;
            color: $text-color-inverse;
        }
    }
}
.bd {
    margin-top: 20upx;
    text-align: center;

    .picker_box {
        position: relative;
        & + .picker_box::before {
            content: ' ';
            position: absolute;
            top: 50%;
            left: 0;
            width: 0;
            height: 69upx;
            border-left: 1upx solid #a8a8a8;
            transform: translateY(-50%);
        }
    }
}
.fd {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 15upx 30upx;
    background-color: #fff;
    font-size: 0;

    .btn {
        width: 100%;
        height: 90upx;
        padding: 0;
        line-height: 90upx;
        background-color: $main-color;
        border-radius: 45upx;
        text-align: center;
        font-size: 33upx;
        color: #fff;
    }
}

.next {
    .cells {
        margin-bottom: 20upx;
        padding: 0 30upx;
        background-color: #fff;
        &_title {
            padding: 30upx 0;
            line-height: 40upx;
            font-weight: bold;
            font-size: 32upx;
            color: #333;

            &::before {
                content: ' ';
                display: inline-block;
                width: 8upx;
                height: 30upx;
                margin-right: 10upx;
                background-color: $main-color;
                border-radius: 4upx;
            }
        }
    }
    .cell {
        padding-bottom: 20upx;
        + .cells_title {
            padding-top: 0;
        }
        &.m_flex_wrap {
            margin-right: -20upx;
        }
    }
    .info_item {
        // height: 56upx;
        margin-right: 20upx;
        margin-bottom: 20upx;
        padding: 10upx 40upx;
        // min-width: 80upx;
        line-height: 38upx;
        background-color: #f5f5f5;
        border-radius: 29upx;
        font-size: 30upx;
        text-align: center;
        color: #666;
        &.active {
            background-color: $main-color;
            // background-color: #0e868f;
            color: #fff;
        }
    }
    .txta {
        width: 100%;
        padding: 20upx;
        margin-bottom: 100upx;
        box-sizing: border-box;
        border-radius: 10upx;
        background-color: #f2f2f2;
        line-height: 38upx;
        font-size: 30upx;
        color: #666;
    }
    // .fd {
    //     .btn {
    //         background-color: $primary-color;
    //     }
    // }
}
.empty {
    height: 150upx;
    &.ipx {
        height: 218upx;
    }
}
.modal {
    padding: 16upx 72upx 40upx 96upx;
    background-color: #f2f2f2;
    font-size: 24upx;
    .modal_input {
        font-size: 24upx;
    }
}
</style>

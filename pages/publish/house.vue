<template>
    <view class="content">
        <view class="step_one" v-if="step === 0">
            <view class="hd">
                <view class="bg">
                    <image :src="houseImg[0] ? houseImg[0].url : '/static/image/publish/house_bg.png'" :mode="CONFIG.house_mode"></image>
                </view>
                <view class="warn">请如实填写信息，如有虚假会有账号封禁及扣除保证金等处罚</view>
                <view class="main m_flex_column m_flex_middle">
                    <view class="photo_box m_flex_column m_flex_middle m_flex_center" @tap="chooseImg">
                        <image class="photo" src="/static/image/publish/photo.png" mode="aspectFit"></image>
                        <text>{{houseImg[0] ? '编辑' : '上传'}}照片</text>
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
                            <input class="cell_bd" type="number" v-model="form.rental" placeholder="请输入房源租金" />
                        </view>
                    </view>
                    <view class="cell m_flex_center m_flex_middle" v-if="config">
                        <picker class="cell_box m_flex_item" :range="address_street" mode="multiSelector" @columnchange="columnChange" @change="pickerChange('address_street', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">地址</view>
                            <view class="cell_bd">{{form.address_street ? form.address_street : '请选择'}}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.address_street" placeholder="请输入地址" /> -->
                            <!-- </view> -->
                        </picker>
                        <picker class="cell_box m_flex_item" :range="address_flag" mode="selector" @change="pickerChange('address_flag', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">标志建筑</view>
                            <view class="cell_bd">{{form.address_flag ? form.address_flag : '请选择'}}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.address_flag" placeholder="请输入标志建筑" /> -->
                            <!-- </view> -->
                        </picker>
                        <picker class="cell_box m_flex_item" :range="road_distance" mode="selector" @change="pickerChange('road_distance', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">路边距离</view>
                            <view class="cell_bd">{{form.road_distance ? form.road_distance : '请选择'}}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.road_distance" placeholder="请输入路边距离" /> -->
                            <!-- </view> -->
                        </picker>
                    </view>
                    <view class="cell m_flex_center m_flex_middle">
                        <view class="cell_box m_flex_item">
                            <view class="cell_hd">具体地址</view>
                            <input class="cell_bd" type="text" v-model="form.address_detail" placeholder="可不填" />
                        </view>
                    </view>
                    <view class="cell m_flex_center m_flex_middle">
                        <picker class="cell_box m_flex_item" :range="house_type" mode="selector" @change="pickerChange('house_type', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">房型</view>
                            <view class="cell_bd">{{form.house_type ? form.house_type : '请选择'}}</view>
                            <!-- <input class="cell_bd" type="text" v-model="form.house_type" placeholder="请输入房型" />
                        </view> -->
                        </picker>
                        <picker class="cell_box m_flex_item" :range="floor" mode="selector" @change="pickerChange('floor', $event)">
                            <!-- <view class="cell_box m_flex_item"> -->
                            <view class="cell_hd">楼层</view>
                            <view class="cell_bd">{{form.floor_number ? form.floor_number : '请选择'}}</view>
                            <!-- <input class="cell_bd" type="number" v-model="form.floor_number" placeholder="请输入楼层" />
                        </view> -->
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
            <view class="cells" v-if="config && config.config_base && config && config.config_base.length">
                <view class="cells_title">
                    一般配置
                </view>
                <view class="cell m_flex_wrap">
                    <view :class="{'info_item': true, 'active': li.active}" v-for="(li, i) in config.config_base" :key="i" @tap="chooseCfgBase(li)">{{li.value}}</view>
                </view>
            </view>
            <view class="cells" v-if="config && config.config_lightspot && config && config.config_lightspot.length">
                <view class="cells_title">
                    房屋亮点
                </view>
                <view class="cell m_flex_wrap">
                    <view :class="{'info_item': true, 'active': li.active}" v-for="(li, i) in config.config_lightspot" :key="i" @tap="chooseCfgLight(li)">{{li.value}}</view>
                </view>
            </view>
            <view class="cells">
                <view class="cells_title">
                    补充说明（选填）
                </view>
                <view class="cell">
                    <textarea placeholder="详细的介绍会加大租房率" v-model="form.remarks"></textarea>
                </view>
            </view>
            <view class="fd" @tap="confirm">确认发布</view>
        </view>
        <view class="empty"></view>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
            return (
                this.config &&
                this.config.address_flag &&
                this.config.address_flag.map(item => item.shortname || '')
            )
        },
        road_distance() {
            return (
                this.config &&
                this.config.road_distance &&
                this.config.road_distance.map(item => item.value)
            )
        },
        house_type() {
            return (
                this.config &&
                this.config.house_type &&
                this.config.house_type.map(item => item.value)
            )
        },
        floor() {
            return (
                this.config &&
                this.config.floor &&
                this.config.floor.map(item => item.value)
            )
        },
        address() {
            return this.form.address_street || ''
        }
    },
    data() {
        return {
            step: 0,
            form: {
                images: [],
                landlord_id: '',
                // landlord_mobile: "",
                rental: '',
                address_street_id: 1969,
                address_street: '',
                address_flag_id: 3752,
                address_flag: '',
                road_distance_id: 1,
                road_distance: '',
                address_detail: '',
                house_type_id: '',
                house_type: '',
                floor_number: '',
                contact_mobile: '',
                wechat_number: '',
                config_base_ids: '',
                config_base: '',
                config_lightspot_ids: '',
                config_lightspot: '',
                remarks: ''
            },
            house_id: '',
            config: {
                house_type: null,
                floor: null,
                road_distance: null,
                address_street: null,
                address_flag: null,
                config_base: null,
                config_lightspot: null
            },
            addr: null
        }
    },
    onLoad(res) {
        if (res.id) {
            this.house_id = res.id
        }
        this.setHouseImg([])
    },
    onShow() {
        // this.setHouseTempImg([])
        if (this.houseImg && this.houseImg.length) {
            this.form.images = this.houseImg
        }
    },
    onReady() {
        this.login().then(code => {
            this.getData()
            this.getInfo()
        })
    },
    methods: {
        ...mapMutations([
            'setHouseTempImg',
            'setHouseImg',
            'setHomeReload',
            'setCollectReload'
        ]),
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
                        if (!obj[item.type]) {
                            obj[item.type] = []
                        }
                        item.active = false
                        obj[item.type].push(item)
                        return obj
                    }, {})

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
                        address_street
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
                            address_flag: res.data
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
                        const images = res.data.image_urls
                            ? res.data.image_urls.split(',')
                            : []
                        this.setHouseTempImg([...images])
                        this.setHouseImg(
                            images.map(item => ({
                                url: item
                            }))
                        )
                        res.data.images = images.map(item => ({
                            url: item
                        }))
                        this.form = { ...res.data }
                    }
                })
            } else {
                this.form.contact_mobile = this.userInfo.landlord_mobile
                this.form.wechat_number = this.userInfo.landlord_mobile
            }
        },
        // getLandlord() {
        //     this.$request
        //         .getLandlordDetail({ id: this.userInfo.landlord_id })
        //         .then(res => {
        //             if (res && res.data) {
        //                 this.form.contact_mobile =
        //                     res.data.landlord_mobile || "";
        //             }
        //         });
        // },
        chooseImg() {
            return new Promise((resolve) => {
                if (this.houseImg && this.houseImg.length) {
                    resolve(this.houseImg.map(item => item.url))
                } else {
                    this.chooseImage(9).then(e => {
                        if (e.errMsg === 'chooseImage:ok') {
                            resolve(e.tempFilePaths)
                        }
                    })
                }
            }).then((imgs) => {
                this.setHouseTempImg(imgs)
                this.goPage(`/pages/publish/img`)
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
                        address_street: p
                    }
                    value = 0
                    setColumn()
                }
            }
            setColumn()
        },
        pickerChange(key, e) {
            const value = e.detail.value
            switch (key) {
                case 'address_street':
                    const item = this.config.address_street[2][value[2]]
                    if (!item) {
                        this.form.address_street = ''
                        this.form.address_street_id = ''
                    } else {
                        this.form.address_street = item.name
                        this.form.address_street_id = item.id
                        this.getAreaFlag(item.id)
                    }
                    break
                case 'address_flag':
                    this.form[key] = this.config[key][value].shortname
                    this.form[`${key}_id`] = this.config[key][value].id
                    break
                case 'road_distance':
                case 'house_type':
                    this.form[key] = this.config[key][value].value
                    this.form[`${key}_id`] = this.config[key][value].id
                    break
                case 'floor':
                    this.form.floor_number = +this.config[key][
                        value
                    ].value.replace('楼', '')
                    break
                default:
                    break
            }
        },
        next() {
            this.checkAuth().then(res => {
                if (!res) return

                this.$validate(this.form, {
                    rental: [{ required: true, msg: '请输入租金' }],
                    address_street: [{ required: true, msg: '请选择地址' }],
                    address_flag: [{ required: true, msg: '请选择标志建筑' }],
                    road_distance: [{ required: true, msg: '请选择路边距离' }],
                    house_type: [{ required: true, msg: '请选择房型' }],
                    floor_number: [{ required: true, msg: '请输入楼层' }],
                    images: [
                        { type: 'array', msg: '请上传图片' },
                        { min: 2, msg: '请至少上传2张图片' }
                    ]
                }).then(
                    () => {
                        const config_base = this.form.config_base
                            ? this.form.config_base.split(',')
                            : []
                        const config_lightspot = this.form.config_lightspot
                            ? this.form.config_lightspot.split(',')
                            : []
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
                            icon: 'none'
                        })
                    }
                )
            })
        },
        filterForm() {
            const config_base = this.config.config_base.filter(
                item => item.active
            )
            const config_lightspot = this.config.config_lightspot.filter(
                item => item.active
            )
            this.form.landlord_id = this.userInfo.landlord_id
            this.form.config_base_ids = config_base
                .map(item => item.id)
                .join(',')
            this.form.config_base = config_base
                .map(item => item.value)
                .join(',')
            this.form.config_lightspot_ids = config_lightspot
                .map(item => item.id)
                .join(',')
            this.form.config_lightspot = config_lightspot
                .map(item => item.value)
                .join(',')
        },
        confirm() {
            this.checkAuth().then(res => {
                if (!res) return
                this.filterForm()
                this.$validate(this.form, {
                    rental: [{ required: true, msg: '请输入租金' }],
                    address_street: [{ required: true, msg: '请选择地址' }],
                    address_flag: [{ required: true, msg: '请选择标志建筑' }],
                    road_distance: [{ required: true, msg: '请选择路边距离' }],
                    house_type: [{ required: true, msg: '请选择房型' }],
                    floor_number: [{ required: true, msg: '请输入楼层' }],
                    images: [
                        { type: 'array', msg: '请上传图片' },
                        { min: 2, msg: '请至少上传2张图片' }
                    ]
                }).then(
                    () => {
                        const api = this.form.id
                            ? ((this.form.hr_id = this.form.id), 'editHouse')
                            : 'addHouse'
                        const {
                            landlord_info,
                            image_urls,
                            ...params
                        } = this.form
                        params.images = params.images.map(item => {
                            if (typeof item === 'string') {
                                item = {
                                    url: item
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
                                    path: `/pages/publish/publish_succ?id=${this
                                        .form.id || res.data}`,
                                    replace: true
                                })
                            }
                        })
                    },
                    e => {
                        uni.showToast({
                            title: e.msg,
                            icon: 'none'
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
        }
    }
}
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
        // background-color: transparent;
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
                content: ' ';
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

        // &_box {
        //     height: 100%;
        // }

        picker {
            position: relative;
            & + picker::before {
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
.empty {
    height: 100upx;
}
.fd {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
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

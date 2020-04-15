<template>
    <view class="content">
        <swiper class="swiper" indicator-dots circular indicator-color="#6d7271" indicator-active-color="#4ce6e8" autoplay :interval="2000" :duration="1000">
            <swiper-item>
                <view class="swiper-item">
                    <image src="/static/image/index/banner.jpg" mode="aspectFill"></image>
                </view>
            </swiper-item>
        </swiper>
        <view class="m_sticky">
            <view class="cells">
                <view class="cells_hd m_flex_middle m_flex_justify">
                    <view class="title">房东直租</view>
                    <view class="m_flex_middle">
                        <view class="addr_icon">
                            <image src="/static/image/index/addr.png" mode="aspectFit"></image>
                        </view>
                        <view class="addr_box m_flex">
                            <picker :range="address_street" @change="pickerChange" @columnchange="columnChange" :value="addrVal" mode="multiSelector">
                                <view class="m_flex_middle" v-if="addrVal && addrVal.length && (address_city || params.address_street || params.area_id)">
                                    <view class="addr_picker m_flex_middle">
                                        <view class="addr_item m_textover">{{ address_street[0][addrVal[0]] }}</view>
                                        <view class="addr_pull">
                                            <image src="/static/image/index/pull.png" mode="aspectFit"></image>
                                        </view>
                                    </view>
                                    <view class="addr_picker m_flex_middle" :class="{ last: !params.address_street }" v-if="!address_city">
                                        <view class="addr_item m_textover">{{ address_street[1][addrVal[1]] }}</view>
                                        <view class="addr_pull">
                                            <image src="/static/image/index/pull.png" mode="aspectFit"></image>
                                        </view>
                                    </view>
                                    <view class="addr_picker last m_flex_middle" v-if="params.address_street">
                                        <view class="addr_item m_textover">{{ params.address_street }}</view>
                                        <view class="addr_pull">
                                            <image src="/static/image/index/pull.png" mode="aspectFit"></image>
                                        </view>
                                    </view>
                                </view>
                                <view class="addr_picker last m_flex_middle" v-else>
                                    <view class="addr_item m_textover">选择村</view>
                                    <view class="addr_pull">
                                        <image src="/static/image/index/pull.png" mode="aspectFit"></image>
                                    </view>
                                </view>
                            </picker>
                        </view>
                    </view>
                </view>
                <view class="cells_bd m_flex_justify">
                    <view class="filter_title" @tap="showModal(1, '户型')">
                        <text class="title">户型</text>
                        <text class="triangle_down_icon"></text>
                    </view>
                    <view class="filter_title" @tap="showModal(2, '价格')">
                        <text class="title">价格</text>
                        <text class="triangle_down_icon"></text>
                    </view>
                    <view class="filter_title" @tap="showModal(4, '路边距离')">
                        <text class="title">路边距离</text>
                        <text class="triangle_down_icon"></text>
                    </view>
                    <view class="filter_title" @tap="showModal(3, '个性筛选')">
                        <text class="title">个性筛选</text>
                        <text class="triangle_down_icon"></text>
                    </view>
                </view>
                <view class="cells_fd">
                    <scroll-view class="scroll_view" :scroll-x="true" v-if="activeItems && activeItems.length">
                        <view class="m_flex_middle">
                            <view class="house_type" v-for="li in activeItems" :key="li.value">
                                <view class="btn active">{{ li.value }}</view>
                                <view class="del_btn" @tap="delParams(li)">
                                    <image src="/static/image/index/close.png" mode="aspectFit"></image>
                                </view>
                            </view>
                            <!-- <template v-if="house_type_active">
                                <view class="house_type" v-for="li in house_type_active" :key="li.value">
                                    <view class="btn active">{{ li.value }}</view>
                                    <view class="del_btn" @tap="delParams(li)">
                                        <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                    </view>
                                </view>
                            </template>
                            <template v-if="price_active">
                                <view class="house_type" v-for="li in price_active" :key="li.value">
                                    <view class="btn active">{{ li.value }}</view>
                                    <view class="del_btn" @tap="delParams(li)">
                                        <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                    </view>
                                </view>
                            </template>
                            <template v-if="road_distance_active">
                                <view class="house_type" v-for="li in road_distance_active" :key="li.value">
                                    <view class="btn active">{{ li.value }}</view>
                                    <view class="del_btn" @tap="delParams(li)">
                                        <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                    </view>
                                </view>
                            </template>
                            <template v-if="config_base_active">
                                <view class="house_type" v-for="li in config_base_active" :key="li.value">
                                    <view class="btn active">{{ li.value }}</view>
                                    <view class="del_btn" @tap="delParams(li)">
                                        <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                    </view>
                                </view>
                            </template>
                            <template v-if="config_lightspot_active">
                                <view class="house_type" v-for="li in config_lightspot_active" :key="li.value">
                                    <view class="btn active">{{ li.value }}</view>
                                    <view class="del_btn" @tap="delParams(li)">
                                        <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                    </view>
                                </view>
                            </template> -->
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>
        <view class="list">
            <house-list :list.sync="list"></house-list>
            <v-page ref="page" :list.sync="list"></v-page>
            <!-- #ifdef MP-WEIXIN -->
            <view v-if="hasFocus" class="official-account"></view>
            <official-account @load="viewSucc"></official-account>
            <!-- #endif -->
        </view>
        <view class="fix_right_icon m_flex_center m_flex_middle" @tap="goPage('/pages/index/hot')">
            <!-- <image src="/static/image/index/hot.png" mode="aspectFill"></image> -->
            <view>
                <view>最热</view>
                <view>房源</view>
            </view>
        </view>
        <!-- <view class="fix_right_icon" @tap="goPage('/pages/index/require')">
            <image src="/static/image/index/tie.png" mode="aspectFill"></image>
        </view> -->
        <!-- <v-auth ref="auth"></v-auth> -->
        <v-modal ref="modal">
            <view slot="content">
                <view class="modal" v-if="modalList && modalList.length">
                    <view class="m_flex_center" v-for="(lis, i) in modalList" :key="i">
                        <view class="modal_list m_flex_wrap">
                            <view class="modal_item" v-for="(li, j) in lis" :key="j">
                                <view :class="['m_button', 'main', { plain: !li.tmpActive }]" @tap="toggleList(i, j)">{{ li.value || li }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import HouseList from '../components/house-list'
export default {
    components: {
        HouseList,
    },
    computed: {
        ...mapState(['homeReload']),
        address_street() {
            return (
                this.config &&
                this.config.address_street &&
                this.config.address_street.map(lis => {
                    return lis.map(li => li.name)
                })
            )
        },
        house_type() {
            return this.config && this.config.house_type && this.config.house_type.map(li => li.value)
        },
        price() {
            return this.config && this.config.price && this.config.price.map(li => li.value)
        },
        house_type_active() {
            return (
                (this.config &&
                    this.config.house_type &&
                    this.config.house_type.reduce((arr, li) => {
                        if (li.active) {
                            arr.push(li)
                        }
                        return arr
                    }, [])) ||
                []
            )
        },
        price_active() {
            return (
                (this.config &&
                    this.config.price &&
                    this.config.price.reduce((arr, li) => {
                        if (li.active) {
                            arr.push(li)
                        }
                        return arr
                    }, [])) ||
                []
            )
        },
        road_distance_active() {
            return (
                (this.config &&
                    this.config.road_distance &&
                    this.config.road_distance.reduce((arr, li) => {
                        if (li.active) {
                            arr.push(li)
                        }
                        return arr
                    }, [])) ||
                []
            )
        },
        config_base_active() {
            return (
                (this.config &&
                    this.config.config_base &&
                    this.config.config_base.reduce((arr, li) => {
                        if (li.active) {
                            arr.push(li)
                        }
                        return arr
                    }, [])) ||
                []
            )
        },
        config_lightspot_active() {
            return (
                (this.config &&
                    this.config.config_lightspot &&
                    this.config.config_lightspot.reduce((arr, li) => {
                        if (li.active) {
                            arr.push(li)
                        }
                        return arr
                    }, [])) ||
                []
            )
        },
        activeItems() {
            return [...this.house_type_active, ...this.price_active, ...this.road_distance_active, ...this.config_base_active, ...this.config_lightspot_active]
        },
    },
    data() {
        return {
            addrVal: [],
            params: {
                area_id: '',
                address_street_id: '',
                address_street: '',
                house_type_id: '',
                // house_type: "",
                road_distance_ids: '',
                rental_begin: '',
                rental_end: '',
                config_base_ids: '',
                // config_base: "",
                config_lightspot_ids: '',
                // config_lightspot: ""
            },
            list: [],
            config: {
                house_type: null,
                floor: null,
                price: [
                    {
                        rental_begin: 0,
                        rental_end: 500,
                        value: '500以下',
                        active: false,
                        tmpActive: false,
                    },
                    {
                        rental_begin: 500,
                        rental_end: 700,
                        value: '500-700',
                        active: false,
                        tmpActive: false,
                    },
                    {
                        rental_begin: 700,
                        rental_end: 900,
                        value: '700-900',
                        active: false,
                        tmpActive: false,
                    },
                    {
                        rental_begin: 900,
                        rental_end: 1200,
                        value: '900-1200',
                        active: false,
                        tmpActive: false,
                    },
                    {
                        rental_begin: 1500,
                        rental_end: '',
                        value: '1500以上',
                        active: false,
                        tmpActive: false,
                    },
                ],
                road_distance: null,
                address_street: null,
                address_flag: null,
                config_base: null,
                config_lightspot: null,
            },
            addr: null,
            modalType: null,
            modalList: null,
            hasFocus: false,
            address_city: '',
        }
    },
    onLoad(res) {
        if (res.scene) {
            const scene = decodeURIComponent(res.scene)
            if (scene) {
                res.p = scene.replace('page=', '')
            }
        } else if (res.p) {
            res.p = decodeURIComponent(res.p)
        }
        if (res.p) {
            this.goPage(res.p)
        }
    },
    onShow() {
        this.login().then(code => {
            this.getInfo()
        })
        if (this.homeReload) {
            this.setHomeReload(false)
            this.init()
            this.getData()
        }
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1)
    },
    onReachBottom() {
        this.$refs.page.next()
    },
    onReady() {
        // const tk = uni.getStorageSync("tk");
        // if (tk) {
        //     this.getInfo();
        // }
        this.init()
        this.getData()
    },
    onShareAppMessage() {
        return {
            title: '村里租房',
            desc: '村里租房',
            path: '/pages/index/index',
        }
    },
    methods: {
        ...mapMutations(['setHomeReload']),
        ...mapActions(['login', 'getInfo']),
        init() {
            const self = this
            this.filterParams()
            this.$refs.page &&
                this.$refs.page.init({
                    url: 'getHouseList',
                    params: self.params,
                    fn: null,
                })
        },
        getData() {
            this.$request.getConfig().then(res => {
                if (res.data) {
                    const config = res.data.reduce((obj, item) => {
                        if (!obj[item.type]) {
                            obj[item.type] = []
                        }
                        item.active = false
                        item.tmpActive = false
                        obj[item.type].push(item)
                        return obj
                    }, {})
                    this.config = { ...this.config, ...config }
                }
            })
            this.$request.getAddrList().then(res => {
                if (res.data) {
                    const city = res.data.filter(item => item.level === 2)
                    const addr = res.data.reduce((obj, item) => {
                        if (!item.pid) return obj
                        if (!obj[item.pid]) {
                            obj[item.pid] = item.level === 4 || item.level === 3 ? [{ name: '不限' }] : []
                        }
                        obj[item.pid].push(item)
                        return obj
                    }, {})
                    const address_street = [[...city]]
                    const district = addr[city[0].id]
                    if (district && district.length) {
                        address_street.push([...district])
                        if (district[0] && district[0].id) {
                            const county = addr[district[0].id]
                            if (county && county.length) {
                                address_street.push([...county])
                            }
                        } else {
                            address_street.push([{ name: '不限' }])
                        }
                    }
                    this.addr = addr
                    this.config = {
                        ...this.config,
                        address_street,
                    }
                    // this.params.address_street = address_street[2][0].name;
                }
            })
        },
        viewSucc(e) {
            this.hasFocus = true
        },
        filterParams() {
            const house_type = this.config.house_type ? this.config.house_type.filter(item => item.active) : []
            const price = this.config.price.filter(item => item.active)[0]
            const road_distance = this.config.road_distance ? this.config.road_distance.filter(item => item.active) : []
            const config_base = this.config.config_base ? this.config.config_base.filter(item => item.active) : []
            const config_lightspot = this.config.config_lightspot ? this.config.config_lightspot.filter(item => item.active) : []
            // this.params.house_type = house_type
            //     .map(item => item.value)
            //     .join(",");
            this.params.house_type_id = house_type.map(item => item.id).join(',')
            if (price) {
                this.params.rental_begin = price.rental_begin || ''
                this.params.rental_end = price.rental_end || ''
            } else {
                this.params.rental_begin = ''
                this.params.rental_end = ''
            }
            this.params.road_distance_ids = road_distance.map(item => item.id).join(',')
            // this.params.config_base = config_base
            //     .map(item => item.value)
            //     .join(",");
            this.params.config_base_ids = config_base.map(item => item.id).join(',')
            // this.params.config_lightspot = config_lightspot
            //     .map(item => item.value)
            //     .join(",");
            this.params.config_lightspot_ids = config_lightspot.map(item => item.id).join(',')
        },
        columnChange(e) {
            const self = this
            let { column, value } = e.detail
            function setColumn() {
                let item = self.config.address_street[column][value]
                if (!item) return
                if (column++ < 2) {
                    let p = self.config.address_street
                    p[column] = self.addr[item.id] || []
                    self.config = {
                        ...self.config,
                        address_street: p,
                    }
                    value = 0
                    setColumn()
                }
            }
            setColumn()
        },
        pickerChange(e) {
            const value = e.detail.value
            let item = {}
            if (value.length === 3) {
                item = this.config.address_street[2][value[2]]
            }
            this.addrVal = value
            if (item && item.id) {
                // 选择了市区村
                this.params.address_street = item.name
                this.params.address_street_id = item.id
                this.params.area_id = ''
                this.address_city = ''
            } else {
                this.params.address_street = ''
                this.params.address_street_id = ''
                if (item) {
                    let area = this.config.address_street[1][value[1]]
                    this.params.area_id = area && area.id ? area.id : ''
                    if (area && area.id) {
                        // 选择了市区
                        this.params.area_id = area.id
                        this.address_city = ''
                    } else {
                        // 选择了市
                        this.params.area_id = ''
                        this.address_city = this.config.address_street[0][value[0]].name
                    }
                } else {
                    this.params.area_id = ''
                    this.address_city = ''
                }
            }
            this.init()
        },
        filterType(type) {
            switch (type) {
                case 1:
                    return ['house_type']
                case 2:
                    return ['price']
                case 3:
                    // return ["config_base", "config_lightspot"];
                    return ['config_lightspot']
                case 4:
                    return ['road_distance']
                default:
                    return []
            }
        },
        showModal(type, title) {
            const self = this
            const key = this.filterType(type)
            this.modalType = type
            this.modalList = key.map(item => {
                return this.config[item]
            })
            if (key && key.length) {
                this.$refs.modal.show({
                    title,
                    confirmText: '确定',
                    success() {
                        key.map(item => {
                            self.config[item].map(it => {
                                it.active = it.tmpActive
                            })
                        })
                        self.init()
                    },
                    fail() {},
                })
            }
        },
        delParams(li) {
            li.tmpActive = false
            li.active = false
            this.init()
        },
        toggleList(i, j) {
            const key = this.filterType(this.modalType)
            key.map(item => {
                if (item === 'price') {
                    this.config[item].map((it, k) => {
                        if (j === k) {
                            this.config[item][j].tmpActive = !this.config[item][j].tmpActive
                        } else {
                            this.config[item][k].tmpActive = false
                        }
                    })
                    return
                }
                //                 if (
                //                     (item === "config_base" && i === 0) ||
                //                     (item === "config_lightspot" && i === 1)
                //                 )
                //                     return;
                this.config[item][j].tmpActive = !this.config[item][j].tmpActive
            })
        },
    },
}
</script>

<style lang="scss">
.swiper {
    height: 330upx;
    padding: 30upx 30upx 0;
    background-color: #fff;
    .swiper-item {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 20upx;
        overflow: hidden;
    }
    image {
        width: 100%;
        height: 100%;
    }
}
.cells {
    background-color: #eee;
    &_hd {
        height: 80upx;
        line-height: 80upx;
        padding: 0 30upx;
        background-color: #fff;
        font-size: 25upx;
        color: $text-color-inverse;
        .title {
            font-size: 34upx;
            color: #2cdbdb;
        }
        .addr {
            &_icon {
                width: 24upx;
                height: 31upx;
            }
            &_box {
                margin-left: 10upx;
            }
            &_picker {
                position: relative;
                padding: 0 20upx;
                &.last {
                    padding-right: 0;
                    &::after {
                        border-right: none;
                    }
                }
                &:first-child::before {
                    display: none;
                }
                &::before {
                    content: ' ';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 0;
                    height: 14upx;
                    border-right: 1upx solid #eee;
                    transform: translateY(-50%);
                }
                &::after {
                    content: ' ';
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 0;
                    height: 12upx;
                    border-right: 2upx solid $border-color;
                    transform: translateY(-50%);
                }
            }
            &_item {
                width: 80upx;
                min-width: 40upx;
            }
            &_pull {
                width: 16upx;
                height: 10upx;
                margin-left: 16upx;
            }
        }
    }
    &_bd {
        height: 80upx;
        margin-top: 20upx;
        padding: 0 30upx;
        line-height: 80upx;
        background-color: #fff;
        border-bottom: 1upx solid #eee;

        .filter_title {
            padding: 0 16upx;
        }

        .title {
            padding: 0 12upx;
        }
    }
    &_fd {
    }
}
.scroll_view {
    padding: 0 30upx;
    line-height: 1;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 0;
    .house_type {
        position: relative;
        // width: 200upx;
        margin-right: 16upx;
        padding: 18upx 20upx 12upx 0;
        font-size: 0;
    }
    .btn {
        // width: 200upx;
        // height: 56upx;
        padding: 8upx 30upx;
        line-height: 34upx;
        border-radius: 8upx;
        background-color: #fff;
        text-align: center;
        font-size: 26upx;
        white-space: nowrap;
        color: $main-color;
    }
    .active {
        background-color: $main-color;
        color: #fff;
    }
    .del_btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 24upx;
        height: 24upx;
        padding: 10upx;
    }
}
// .list {
//     margin-top: 22upx;
// }
.fix_right_icon {
    position: fixed;
    right: 40upx;
    bottom: 120upx;
    // width: 143upx;
    // height: 143upx;
    width: 120upx;
    height: 120upx;
    line-height: 40upx;
    // background: linear-gradient(to bottom, #ffffbe, rgba(255, 255, 190, 0.75));
    background: linear-gradient(137deg, rgba(255, 137, 71, 1) 0%, rgba(254, 98, 10, 1) 100%);
    box-shadow: 0 2upx 30upx 0 rgba(254, 98, 10, 0.2);
    text-shadow: 0 2upx 30upx rgba(254, 98, 10, 0.2);
    border-radius: 50%;
    font-size: 32upx;
    overflow: hidden;
    color: #fff;
}
.modal {
    &_list {
        width: 380upx;
        padding-left: 30upx;
    }
    &_item {
        margin-top: 15upx;
        margin-right: 30upx;
        margin-bottom: 15upx;
        text-align: center;
    }
    .m_button {
        width: 160upx;
        height: 56upx;
        line-height: 54upx;
        padding: 0 14upx;
        border-radius: 4upx;
        overflow: hidden;
    }
}
</style>

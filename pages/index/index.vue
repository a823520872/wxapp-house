<template>
    <view class="content">
        <swiper class="swiper"
                indicator-dots
                circular
                indicator-color="#6d7271"
                indicator-active-color="#4ce6e8"
                autoplay
                :interval="2000"
                :duration="1000">
            <swiper-item @tap="goPage(`/pages/index/webview?src=${config.gss}`)">
                <view class="swiper-item">
                    <image src="/static/image/index/banner1.jpg"
                           mode="aspectFit"></image>
                </view>
            </swiper-item>
            <swiper-item>
                <view class="swiper-item">
                    <image src="/static/image/index/banner.jpg"
                           mode="aspectFit"></image>
                </view>
            </swiper-item>
        </swiper>
        <view class="cells">
            <view class="cells_hd m_flex_middle m_flex_justify">
                <view class="title">房东直租</view>
                <view class="m_flex_middle">
                    <view class="addr_icon">
                        <image src="/static/image/index/addr.png"
                               mode="aspectFit"></image>
                    </view>
                    <view class="addr_box m_flex">
                        <picker :range="address_street"
                                @change="pickerChange"
                                @columnchange="columnChange"
                                mode="multiSelector">
                            <view class="addr_picker last m_flex_middle">
                                <view class="addr_item m_textover">{{params.address_street || '选择村'}}</view>
                                <view class="addr_pull">
                                    <image src="/static/image/index/pull.png"
                                           mode="aspectFit"></image>
                                </view>
                            </view>
                        </picker>
                    </view>
                </view>
            </view>
            <view class="cells_bd m_flex_justify">
                <view class="filter_title"
                      @tap="showModal(1, '户型')">
                    <text class="title">户型</text>
                    <text class="bottom_icon"></text>
                </view>
                <view class="filter_title"
                      @tap="showModal(2, '价格')">
                    <text class="title">价格</text>
                    <text class="bottom_icon"></text>
                </view>
                <view class="filter_title"
                      @tap="showModal(4, '路边距离')">
                    <text class="title">路边距离</text>
                    <text class="bottom_icon"></text>
                </view>
                <view class="filter_title"
                      @tap="showModal(3, '更多')">
                    <text class="title">更多</text>
                    <text class="bottom_icon"></text>
                </view>
            </view>
            <view class="cells_fd">
                <scroll-view class="scroll_view"
                             :scroll-x="true">
                    <view class="m_flex">
                        <template v-if="house_type_active">
                            <view class="house_type"
                                  v-for="li in house_type_active"
                                  :key="Math.random()">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn"
                                      @tap="delParams(li)">
                                    <image src="/static/image/index/del.png"
                                           mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                        <template v-if="price_active">
                            <view class="house_type"
                                  v-for="li in price_active"
                                  :key="Math.random()">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn"
                                      @tap="delParams(li)">
                                    <image src="/static/image/index/del.png"
                                           mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                        <template v-if="road_distance_active">
                            <view class="house_type"
                                  v-for="li in road_distance_active"
                                  :key="Math.random()">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn"
                                      @tap="delParams(li)">
                                    <image src="/static/image/index/del.png"
                                           mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                        <template v-if="config_base_active">
                            <view class="house_type"
                                  v-for="li in config_base_active"
                                  :key="Math.random()">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn"
                                      @tap="delParams(li)">
                                    <image src="/static/image/index/del.png"
                                           mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                        <template v-if="config_lightspot_active">
                            <view class="house_type"
                                  v-for="li in config_lightspot_active"
                                  :key="Math.random()">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn"
                                      @tap="delParams(li)">
                                    <image src="/static/image/index/del.png"
                                           mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="list">
            <house-list :list.sync="list"></house-list>
            <v-page ref="page"
                    :list.sync="list"></v-page>
            <view v-if="hasFocus"
                  class="official-account"></view>
            <official-account @load="viewSucc"></official-account>
        </view>
        <view class="fix_right_icon m_flex_center m_flex_middle"
              @tap="goPage('/pages/index/hot')">
            <image src="/static/image/index/hot.png"
                   mode="aspectFill"></image>
        </view>
        <!-- <view class="fix_right_icon" @tap="goPage('/pages/index/require')">
            <image src="/static/image/index/tie.png" mode="aspectFill"></image>
        </view> -->
        <!-- <v-auth ref="auth"></v-auth> -->
        <v-modal ref="modal">
            <view slot="content">
                <view class="modal"
                      v-if="modalList && modalList.length">
                    <view class="m_flex_center"
                          v-for="(lis, i) in modalList"
                          :key="Math.random()">
                        <view class="modal_list m_flex_wrap">
                            <view class="modal_item"
                                  v-for="(li, j) in lis"
                                  :key="Math.random()">
                                <view :class="['m_button', 'main', {'plain': !li.tmpActive}]"
                                      @tap="toggleList(i, j)">{{ li.value || li }}</view>
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
        HouseList
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
            return (
                this.config &&
                this.config.house_type &&
                this.config.house_type.map(li => li.value)
            )
        },
        price() {
            return (
                this.config &&
                this.config.price &&
                this.config.price.map(li => li.value)
            )
        },
        house_type_active() {
            return (
                this.config &&
                this.config.house_type &&
                this.config.house_type.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li)
                    }
                    return arr
                }, [])
            )
        },
        price_active() {
            return (
                this.config &&
                this.config.price &&
                this.config.price.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li)
                    }
                    return arr
                }, [])
            )
        },
        road_distance_active() {
            return (
                this.config &&
                this.config.road_distance &&
                this.config.road_distance.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li)
                    }
                    return arr
                }, [])
            )
        },
        config_base_active() {
            return (
                this.config &&
                this.config.config_base &&
                this.config.config_base.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li)
                    }
                    return arr
                }, [])
            )
        },
        config_lightspot_active() {
            return (
                this.config &&
                this.config.config_lightspot &&
                this.config.config_lightspot.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li)
                    }
                    return arr
                }, [])
            )
        }
    },
    data() {
        return {
            params: {
                address_street_id: '',
                address_street: '',
                house_type_id: '',
                // house_type: "",
                road_distance_ids: '',
                rental_begin: '',
                rental_end: '',
                config_base_ids: '',
                // config_base: "",
                config_lightspot_ids: ''
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
                        tmpActive: false
                    },
                    {
                        rental_begin: 500,
                        rental_end: 700,
                        value: '500-700',
                        active: false,
                        tmpActive: false
                    },
                    {
                        rental_begin: 700,
                        rental_end: 900,
                        value: '700-900',
                        active: false,
                        tmpActive: false
                    },
                    {
                        rental_begin: 900,
                        rental_end: 1200,
                        value: '900-1200',
                        active: false,
                        tmpActive: false
                    },
                    {
                        rental_begin: 1500,
                        rental_end: '',
                        value: '1500以上',
                        active: false,
                        tmpActive: false
                    }
                ],
                road_distance: null,
                address_street: null,
                address_flag: null,
                config_base: null,
                config_lightspot: null
            },
            addr: null,
            modalType: null,
            modalList: null,
            hasFocus: false
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
            path: '/pages/index/index'
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
                    fn: null
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
                    // this.params.address_street = address_street[2][0].name;
                }
            })
        },
        viewSucc(e) {
            this.hasFocus = true
        },
        filterParams() {
            const house_type = this.config.house_type
                ? this.config.house_type.filter(item => item.active)
                : []
            const price = this.config.price.filter(item => item.active)[0]
            const road_distance = this.config.road_distance
                ? this.config.road_distance.filter(item => item.active)
                : []
            const config_base = this.config.config_base
                ? this.config.config_base.filter(item => item.active)
                : []
            const config_lightspot = this.config.config_lightspot
                ? this.config.config_lightspot.filter(item => item.active)
                : []
            // this.params.house_type = house_type
            //     .map(item => item.value)
            //     .join(",");
            this.params.house_type_id = house_type
                .map(item => item.id)
                .join(',')
            if (price) {
                this.params.rental_begin = price.rental_begin || ''
                this.params.rental_end = price.rental_end || ''
            } else {
                this.params.rental_begin = ''
                this.params.rental_end = ''
            }
            this.params.road_distance_ids = road_distance
                .map(item => item.id)
                .join(',')
            // this.params.config_base = config_base
            //     .map(item => item.value)
            //     .join(",");
            this.params.config_base_ids = config_base
                .map(item => item.id)
                .join(',')
            // this.params.config_lightspot = config_lightspot
            //     .map(item => item.value)
            //     .join(",");
            this.params.config_lightspot_ids = config_lightspot
                .map(item => item.id)
                .join(',')
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
                        address_street: p
                    }
                    value = 0
                    setColumn()
                }
            }
            setColumn()
        },
        pickerChange(e) {
            const value = e.detail.value
            const item = this.config.address_street[2][value[2]]
            if (!item) {
                this.params.address_street = ''
                this.params.address_street_id = ''
            } else {
                this.params.address_street = item.name
                this.params.address_street_id = item.id
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
                    fail() {}
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
                            this.config[item][j].tmpActive = !this.config[item][
                                j
                            ].tmpActive
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
        }
    }
}
</script>

<style lang="scss">
.swiper {
    height: 398upx;
    padding: 0 30upx;
    &-item {
        image {
            width: 690upx;
            height: 398upx;
        }
    }
}
.cells {
    &_hd {
        height: 80upx;
        line-height: 80upx;
        padding: 0 30upx;
        background-color: #fff;
        font-size: 25upx;
        color: $text-color-inverse;
        .title {
            font-size: 33upx;
            color: $main-color;
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
            }
        }
    }
    &_bd {
        height: 80upx;
        margin-top: 18upx;
        padding: 0 30upx;
        line-height: 80upx;
        background-color: #fff;

        .filter_title {
            padding: 0 16upx;
        }

        .title {
            padding: 0 12upx;
        }
    }
}
.scroll_view {
    padding: 0 30upx;
    line-height: 1;
    box-sizing: border-box;
    .house_type {
        position: relative;
        width: 200upx;
        height: 56upx;
        margin-right: 8upx;
        padding: 22upx 22upx 0 0;
    }
    .btn {
        width: 200upx;
        height: 56upx;
        line-height: 56upx;
        border-radius: 4upx;
        background-color: #fff;
        text-align: center;
        font-size: 25upx;
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
.list {
    margin-top: 22upx;
}
.fix_right_icon {
    position: fixed;
    right: 40upx;
    bottom: 120upx;
    // width: 143upx;
    // height: 143upx;
    width: 120upx;
    height: 120upx;
    line-height: 1.2;
    // background: linear-gradient(to bottom, #ffffbe, rgba(255, 255, 190, 0.75));
    border-radius: 50%;
    overflow: hidden;
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

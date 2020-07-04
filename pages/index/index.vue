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
                <!-- <index-select></index-select> -->
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
                    <view class="filter_title" v-for="(li, i) in houseParam" :key="i" @tap="showModal(li.key, li.title)">
                        <text class="title">{{ li.title }}</text>
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
            <view>
                <view>最热</view>
                <view>房源</view>
            </view>
        </view>
        <v-modal ref="modal" class="modal">
            <view slot="content">
                <view v-if="modalList && modalList.length">
                    <block v-for="(lis, i) in modalList" :key="i">
                        <view class="modal_title m_flex_middle" v-if="lis.title">{{ lis.title }}</view>
                        <view class="modal_list m_flex_wrap">
                            <block v-for="(li, j) in lis.list" :key="j">
                                <view class="modal_item" :class="['m_button', 'grey', { main: li.tmpActive }]" @tap="toggleList(li, i, j)">{{ li.value || li }}</view>
                            </block>
                        </view>
                    </block>
                </view>
            </view>
            <button slot="footer" class="m_button main modal_btn" @tap.stop="handleModalSuccess">完成</button>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import indexSelect from '../components/index-select'
import HouseList from '../components/house-list'
import Defer from '../../common/defer.js'

const houseParammappings = new Map([
    [1, { label: '户型', value: [{ key: 'house_type' }] }],
    [2, { label: '价格', value: [{ key: 'price' }] }],
    [3, { label: '路边距离', value: [{ key: 'road_distance' }] }],
    [
        4,
        {
            label: '个性筛选',
            value: [
                { key: 'config_base', title: '房源配置' },
                { key: 'floor', title: '房源楼层' },
                { key: 'config_lightspot', title: '其他' },
            ],
        },
    ],
])
export default {
    components: {
        // indexSelect,
        HouseList,
    },
    computed: {
        houseParam() {
            return [...houseParammappings.entries()].map(([key, value]) => {
                return {
                    key,
                    title: value.label,
                }
            })
        },
        address_street() {
            return (this.config.address_street || []).map(lis => {
                return lis.map(li => li.name)
            })
        },
        house_type() {
            return (this.config.house_type || []).map(li => li.value)
        },
        price() {
            return (this.config.price || []).map(li => li.value)
        },
        house_type_active() {
            return (this.config.house_type || []).reduce((arr, li) => {
                if (li.active) {
                    arr.push(li)
                }
                return arr
            }, [])
        },
        price_active() {
            return (this.config.price || []).reduce((arr, li) => {
                if (li.active) {
                    arr.push(li)
                }
                return arr
            }, [])
        },
        road_distance_active() {
            return (this.config.road_distance || []).reduce((arr, li) => {
                if (li.active) {
                    arr.push(li)
                }
                return arr
            }, [])
        },
        config_base_active() {
            return (this.config.config_base || []).reduce((arr, li) => {
                if (li.active) {
                    arr.push(li)
                }
                return arr
            }, [])
        },
        floor_active() {
            return (this.config.floor || []).reduce((arr, li) => {
                if (li.active) {
                    arr.push(li)
                }
                return arr
            }, [])
        },
        config_lightspot_active() {
            return (this.config.config_lightspot || []).reduce((arr, li) => {
                if (li.active) {
                    arr.push(li)
                }
                return arr
            }, [])
        },
        activeItems() {
            return [...this.house_type_active, ...this.price_active, ...this.road_distance_active, ...this.config_base_active, ...this.floor_active, ...this.config_lightspot_active]
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
                floor_number: '',
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
            getDataDefer: new Defer(),
        }
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1)
    },
    onReachBottom() {
        this.$refs.page.next()
    },
    onLoad(res) {
        if (res.scene) {
            const scene = decodeURIComponent(res.scene)
            if (scene) {
                console.log(scene)
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
        let reloadPage = [...this.$store.state.reloadPage]
        if (reloadPage.length) {
            let i = reloadPage.findIndex(v => v === '/pages/index/index')
            if (i === -1) return
            reloadPage.splice(i, 1)
            this.$store.commit('setVal', { key: 'reloadPage', val: reloadPage })
            this.init()
            this.getDataDefer.done(() => {
                this.getData()
            })
        }
    },
    onReady() {
        this.init()
        this.getDataDefer.done(() => {
            this.getData()
        })
    },
    onShareAppMessage() {
        return {
            title: '村里租房',
            desc: '村里租房',
            path: '/pages/index/index',
        }
    },
    methods: {
        ...mapActions(['login', 'getInfo']),
        init(n) {
            const self = this
            this.filterParams()
            this.$refs.page &&
                this.$refs.page.init({
                    url: 'getHouseList',
                    params: self.params,
                    n,
                    fn: null,
                }).then(() => {
                    this.getDataDefer.resolve()
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
                }
            })
        },
        viewSucc(e) {
            this.hasFocus = true
        },
        filterParams() {
            const house_type = (this.config.house_type || []).filter(item => item.active)
            const price = this.config.price.filter(item => item.active)[0]
            const road_distance = (this.config.road_distance || []).filter(item => item.active)
            const config_base = (this.config.config_base || []).filter(item => item.active)
            const config_lightspot = (this.config.config_lightspot || []).filter(item => item.active)
            const floor = (this.config.floor || []).filter(item => item.active)
            let { rental_begin = '', rental_end = '' } = price || {}
            this.params.rental_begin = rental_begin
            this.params.house_type_id = house_type.map(item => item.id).join(',')
            this.params.rental_end = rental_end
            this.params.road_distance_ids = road_distance.map(item => item.id).join(',')
            this.params.config_base_ids = config_base.map(item => item.id).join(',')
            this.params.floor_number = floor.map(item => item.key).join(',')
            this.params.config_lightspot_ids = config_lightspot.map(item => item.id).join(',')
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
                    if (!(this.config.address_street[1] && this.config.address_street[1].length)) return
                    let area = this.config.address_street[1][value[1]]
                    this.params.area_id = area && area.id ? area.id : ''
                    if (area && area.id) {
                        // 选择了市区
                        this.params.area_id = area.id
                        this.address_city = ''
                    } else {
                        // 选择了市
                        this.params.area_id = ''
                        let city = this.config.address_street[0][value[0]]
                        this.address_city = city ? city.name : ''
                    }
                } else {
                    this.params.area_id = ''
                    this.address_city = ''
                }
            }
            this.init()
        },
        filterTypeArray(type) {
            let mappings = new Map()
            ;[...houseParammappings.entries()].map(([key, value]) => {
                mappings.set(key, value.value)
            })
            return mappings.get(type) || []
        },
        filterType(type) {
            let t = this.filterTypeArray(type)
            return t.map(li => li.key)
        },
        showModal(type, title) {
            let arr = this.filterTypeArray(type)
            const key = arr.map(li => li.key)
            const _title = arr.reduce((a, li) => {
                if (li.title) {
                    a.push(li.title)
                }
                return a
            }, [])
            this.modalType = type
            this.modalList = key.map((item, i) => {
                return {
                    list: this.config[item],
                    title: _title[i],
                }
            })
            if (key && key.length) {
                this.$refs.modal.show({
                    title,
                    confirmText: '确定',
                    bodyCls: 'width-91',
                    success: () => {
                        key.map(item => {
                            (this.config[item] || []).map(it => {
                                it.active = it.tmpActive || false
                            })
                        })
                        this.init()
                    },
                    fail() {},
                })
            }
        },
        handleModalSuccess() {
            this.$refs.modal.confirm()
        },
        delParams(li) {
            li.tmpActive = false
            li.active = false
            this.init()
        },
        toggleList(li, i, j) {
            const key = this.filterType(this.modalType)
            key.map(item => {
                if (item === 'price') {
                    this.config[item].map((it, k) => {
                        if (j === k) {
                            li.tmpActive = !(li.tmpActive || false)
                        } else {
                            this.config[item][k].tmpActive = false
                        }
                    })
                    return
                }
                li.tmpActive = !(li.tmpActive || false)
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
    font-size: 30upx;
    .modal_title {
        padding: 0 30upx 20upx;
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

        & ~ .modal_title {
            padding-top: 20upx;
        }
    }
    .modal_list {
        padding: 0 10upx 12upx 30upx;
    }
    .modal_item {
        min-width: 140upx;
        margin-top: 10upx;
        margin-right: 20upx;
        margin-bottom: 10upx;
        text-align: center;
        line-height: 38upx;
        padding: 10upx;
        font-size: 30upx;
        border-radius: 8upx;
        overflow: hidden;
    }
    .modal_btn {
        display: block;
        height: 88upx;
        margin: 30upx 30upx 50upx;
        padding: 0;
        line-height: 86upx;
        border-radius: 44upx;
    }
}
</style>

<template>
    <view class="content min_height">
        <swiper class="swiper" indicator-dots circular indicator-color="#6d7271" indicator-active-color="#4ce6e8" autoplay :interval="2000" :duration="1000">
            <swiper-item>
                <view class="swiper-item">
                    <image src="/static/image/index/banner.jpg" mode="aspectFill"></image>
                </view>
            </swiper-item>
        </swiper>
        <view class="m_sticky">
            <view class="cells">
                <index-select @change="selectChange" :selectType="selectType" :params="params"></index-select>
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
import indexSelect from '../components/index-select'
import HouseList from '../components/house-list'
import Defer from '../../common/defer.js'

const houseParammappings = new Map([
    [1, { label: '户型', value: [{ key: 'house_type' }] }],
    [2, { label: '价格', value: [{ key: 'price' }] }],
    [3, { label: '路边距离', value: [{ key: 'road_distance' }] }],
    [
        4,
        {
            label: '更多',
            value: [
                { key: 'config_base', title: '房源配置' },
                { key: 'floor', title: '房源楼层' },
                { key: 'deposit', title: '押金' },
                { key: 'config_lightspot', title: '其他' },
            ],
        },
    ],
    [5, { label: '排序', value: [{ key: 'sort' }] }],
])
export default {
    components: {
        indexSelect,
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
        activeItems() {
            return Object.keys(this.config).reduce((arr, key) => {
                arr.push(...(this.config[key] || []).filter(v => v.active))
                return arr
            }, [])
        },
    },
    data() {
        return {
            addrVal: [],
            selectType: '',
            params: {
                area_id: '',
                address_street_id: '',
                // address_street: '',
                address_flag_id: '',
                house_type_id: '',
                // house_type: "",
                road_distance_ids: '',
                rental_begin: '',
                rental_end: '',
                config_base_ids: '',
                // config_base: "",
                config_lightspot_ids: '',
                deposit: '',
                floor_number: '',
                // config_lightspot: "",
                lat: '',
                lng: '',
                map_distance: '',
                metro_id: '',
                sort: '',
            },
            list: [],
            config: {
                house_type: null,
                floor: null,
                price: [
                    {
                        type: 'price',
                        rental_begin: 0,
                        rental_end: 500,
                        value: '500以下',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'price',
                        rental_begin: 500,
                        rental_end: 700,
                        value: '500-700',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'price',
                        rental_begin: 700,
                        rental_end: 900,
                        value: '700-900',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'price',
                        rental_begin: 900,
                        rental_end: 1200,
                        value: '900-1200',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'price',
                        rental_begin: 1200,
                        rental_end: 1500,
                        value: '1200-1500',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'price',
                        rental_begin: 1500,
                        rental_end: '',
                        value: '1500以上',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                ],
                road_distance: null,
                address_street: null,
                address_flag: null,
                config_base: null,
                config_lightspot: null,
                deposit: null,
                sort: [
                    {
                        type: 'sort',
                        value: '发布从新到旧',
                        key: 'public_new',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'sort',
                        value: '距离从近到远',
                        key: 'distance_near',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'sort',
                        value: '价格从低到高',
                        key: 'price_low',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                    {
                        type: 'sort',
                        value: '价格从高到低',
                        key: 'price_high',
                        active: false,
                        tmpActive: false,
                        is_multi: false,
                    },
                ],
            },
            // addr: null,
            modalType: null,
            modalList: null,
            hasFocus: false,
            // address_city: '',
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
            this.getData()
            this.getDataDefer.done(() => {
                this.init()
            })
        }
    },
    onReady() {
        this.getData()
        this.getDataDefer.done(() => {
            this.init()
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
            this.filterParams()
            let obj = { ...this.params }
            if (!obj.map_distance && this.selectType !== 1) {
                obj.map_distance = 5000
            }
            this.$refs.page &&
                this.$refs.page.init({
                    url: 'getHouseList',
                    params: obj,
                    n,
                    fn: null,
                // }).then(() => {
                //     this.getDataDefer.resolve()
                })
        },
        getData() {
            this.$request.getConfig().then(res => {
                if (res.data) {
                    const config = res.data.reduce((obj, item) => {
                        if (!obj[item.type]) {
                            obj[item.type] = []
                        }
                        item.active = item.is_active && item.is_active === 1
                        item.tmpActive = item.is_active && item.is_active === 1
                        obj[item.type].push(item)
                        return obj
                    }, {})
                    this.config = { ...this.config, ...config }
                    this.getDataDefer.resolve()
                }
            })
        },
        viewSucc(e) {
            this.hasFocus = true
        },
        filterParams() {
            const house_type = (this.config.house_type || []).filter(item => item.active)
            const price = (this.config.price || []).find(item => item.active)
            const road_distance = (this.config.road_distance || []).filter(item => item.active)
            const config_base = (this.config.config_base || []).filter(item => item.active)
            const config_lightspot = (this.config.config_lightspot || []).filter(item => item.active)
            const deposit = (this.config.deposit || []).filter(item => item.active)
            const floor = (this.config.floor || []).filter(item => item.active)
            const sort = (this.config.sort || []).find(item => item.active)
            let [rental_begin = '', rental_end = ''] = []
            if (price) {
                if (price.key) {
                    [rental_begin = '', rental_end = ''] = price.key.split(',')
                } else if (price.value) {
                    [rental_begin = '', rental_end = ''] = price.value.split('-')
                }
            }
            this.params.rental_begin = rental_begin
            this.params.house_type_id = house_type.map(item => item.id).join(',')
            this.params.rental_end = rental_end
            this.params.road_distance_ids = road_distance.map(item => item.id).join(',')
            this.params.config_base_ids = config_base.map(item => item.id).join(',')
            this.params.deposit = deposit.map(item => item.value).join(',')
            this.params.floor_number = floor.map(item => item.key).join(',')
            this.params.config_lightspot_ids = config_lightspot.map(item => item.id).join(',')
            this.params.sort = sort ? sort.key : ''
        },
        selectChange(obj) {
            if (obj) {
                console.log(JSON.stringify(obj));
                this.selectType = obj.type || 0
                Object.keys(obj.params).map(key => {
                    this.params[key] = obj.params[key]
                })
                this.init()
            }
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
            let t = li.type
            if (li.is_multi) {
                li.tmpActive = !(li.tmpActive || false)
            } else {
                this.config[t].map((it, k) => {
                    if (j === k) {
                        li.tmpActive = !(li.tmpActive || false)
                    } else {
                        this.$set(this.config[t][k], 'tmpActive', false)
                    }
                })
            }
        },
    },
}
</script>

<style lang="scss">
.content.min_height {
    min-height: calc(100vh + 360rpx);
}
.swiper {
    height: 330rpx;
    padding: 30rpx 30rpx 0;
    background-color: #fff;
    .swiper-item {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
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
        height: 80rpx;
        line-height: 80rpx;
        padding: 0 30rpx;
        background-color: #fff;
        font-size: 25rpx;
        color: $text-color-inverse;
        .title {
            font-size: 34rpx;
            color: $main-color;
        }
        .addr {
            &_icon {
                width: 24rpx;
                height: 31rpx;
            }
            &_box {
                margin-left: 10rpx;
            }
            &_picker {
                position: relative;
                padding: 0 20rpx;
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
                    height: 14rpx;
                    border-right: 1rpx solid #eee;
                    transform: translateY(-50%);
                }
                &::after {
                    content: ' ';
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 0;
                    height: 12rpx;
                    border-right: 2rpx solid $border-color;
                    transform: translateY(-50%);
                }
            }
            &_item {
                width: 80rpx;
                min-width: 40rpx;
            }
            &_pull {
                width: 16rpx;
                height: 10rpx;
                margin-left: 16rpx;
            }
        }
    }
    &_bd {
        height: 80rpx;
        margin-top: 20rpx;
        padding: 0 30rpx;
        line-height: 80rpx;
        background-color: #fff;
        border-bottom: 1rpx solid #eee;

        .filter_title {
            padding: 0 16rpx;
        }

        .title {
            padding: 0 12rpx;
        }
    }
    &_fd {
    }
}
.scroll_view {
    padding: 0 30rpx;
    line-height: 1;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 0;
    .house_type {
        position: relative;
        // width: 200rpx;
        margin-right: 16rpx;
        padding: 18rpx 20rpx 12rpx 0;
        font-size: 0;
    }
    .btn {
        // width: 200rpx;
        // height: 56rpx;
        padding: 8rpx 30rpx;
        line-height: 34rpx;
        border-radius: 8rpx;
        background-color: #fff;
        text-align: center;
        font-size: 26rpx;
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
        width: 24rpx;
        height: 24rpx;
        padding: 10rpx;
    }
}
// .list {
//     margin-top: 22rpx;
// }
.fix_right_icon {
    position: fixed;
    right: 40rpx;
    bottom: 120rpx;
    // width: 143rpx;
    // height: 143rpx;
    width: 120rpx;
    height: 120rpx;
    line-height: 40rpx;
    // background: linear-gradient(to bottom, #ffffbe, rgba(255, 255, 190, 0.75));
    background: linear-gradient(137deg, rgba(255, 137, 71, 1) 0%, rgba(254, 98, 10, 1) 100%);
    box-shadow: 0 2rpx 30rpx 0 rgba(254, 98, 10, 0.2);
    text-shadow: 0 2rpx 30rpx rgba(254, 98, 10, 0.2);
    border-radius: 50%;
    font-size: 32rpx;
    overflow: hidden;
    color: #fff;
}
.modal {
    font-size: 30rpx;
    .modal_title {
        padding: 0 30rpx 20rpx;
        line-height: 40rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: #333;

        &::before {
            content: ' ';
            display: inline-block;
            width: 8rpx;
            height: 30rpx;
            margin-right: 10rpx;
            background-color: $main-color;
            border-radius: 4rpx;
        }

        & ~ .modal_title {
            padding-top: 20rpx;
        }
    }
    .modal_list {
        padding: 0 10rpx 12rpx 30rpx;
    }
    .modal_item {
        min-width: 140rpx;
        margin-top: 10rpx;
        margin-right: 20rpx;
        margin-bottom: 10rpx;
        text-align: center;
        line-height: 38rpx;
        padding: 10rpx;
        font-size: 30rpx;
        border-radius: 8rpx;
        overflow: hidden;
    }
    .modal_btn {
        display: block;
        height: 88rpx;
        margin: 30rpx 30rpx 50rpx;
        padding: 0;
        line-height: 86rpx;
        border-radius: 44rpx;
    }
}
</style>

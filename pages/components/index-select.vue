<template>
    <view id="addr" class="select_wrap" @touchmove.stop.prevent="empty" @tap.stop.prevent="modalVisible = false">
        <view class="select_box m_flex_justify">
            <view class="select_item m_flex_middle m_flex_center m_flex_item" @tap="chooseLocation">
                <image class="select_icon" src="/static/image/index/map.png" mode="aspectFit"></image>
                <view class="name m_cmain" v-if="selectType == 0 && address">{{address}}</view>
                <view v-else>地图定位</view>
            </view>
            <view class="select_item m_flex_middle m_flex_center m_flex_item" @tap.stop="showModal">
                <image class="select_icon" src="/static/image/index/area.png" mode="aspectFit"></image>
                <view class="name" v-if="selectType === 1">{{params.map_distance ? params.map_distance + 'm内' : '附近不限'}}</view>
                <view class="name" v-else-if="selectType === 2">{{params.address_street_id | getStreetCity(params.area_id)}}</view>
                <view class="name" v-else-if="selectType === 3">
                    <text class="line m_cmain">{{params.metro_id | getMetroLine}}</text>
                    <text>{{params.metro_id | getMetroArea}}</text>
                </view>
                <view class="name" v-else-if="selectType === 4">{{params.address_street_id | getAddrCity(params.area_id)}}</view>
                <view v-else>区域定位</view>
            </view>
        </view>
        <v-auth ref="auth"></v-auth>
        <view class="select_modal" :style="styl" v-if="modalVisible" @tap.stop="empty">
            <view class="select_mask"></view>
            <view class="select_picker m_flex_column">
                <view class="select_picker_bd m_flex m_flex_item">
                    <view class="picker zero m_flex_column">
                        <block v-for="li in typeList" :key="li.value">
                            <view class="item" :class="{on: type === li.value}" @tap="typeChange(li.value)">{{li.name}}</view>
                        </block>
                    </view>
                    <scroll-view v-if="type === 1" class="picker_scroll" scroll-y>
                        <view class="picker first m_flex_column">
                            <view class="item" :class="{on: li.on}" v-for="(li, i) in mapDistanceList" :key="i" @tap="distanceChange(li)">{{li.name}}</view>
                        </view>
                    </scroll-view>
                    <template v-else-if="type === 2">
                        <template v-if="streetList && streetList.length">
                            <scroll-view v-if="streetList[0]" class="picker_scroll" scroll-y>
                                <view class="picker first m_flex_column">
                                    <view class="item" :class="{on: li.on}" v-for="(li, i) in streetList[0]" :key="i" @tap="streetChange(li, 0)">{{li.name}}</view>
                                </view>
                            </scroll-view>
                            <scroll-view class="picker_scroll" scroll-y>
                                <view class="picker first m_flex_column" v-if="streetList[1]">
                                    <view class="item" :class="{on: li.on}" v-for="(li, i) in streetList[1]" :key="i" @tap="streetChange(li, 1)">{{li.name}}</view>
                                </view>
                            </scroll-view>
                        </template>
                    </template>
                    <template v-else-if="type === 3">
                        <template v-if="metroList && metroList.length">
                            <scroll-view v-if="metroList[0]" class="picker_scroll" scroll-y>
                                <view class="picker first m_flex_column">
                                    <view class="item" :class="{on: li.on}" v-for="(li, i) in metroList[0]" :key="i" @tap="metroChange(li, 0)">{{li.name}}</view>
                                </view>
                            </scroll-view>
                            <scroll-view class="picker_scroll" scroll-y>
                                <view class="picker first m_flex_column" v-if="metroList[1]">
                                    <view class="item" :class="{on: li.on}" v-for="(li, i) in metroList[1]" :key="i" @tap="metroChange(li, 1)">{{li.name}}</view>
                                </view>
                            </scroll-view>
                        </template>
                    </template>
                    <template v-else-if="type === 4">
                        <template v-if="addrList && addrList.length">
                            <scroll-view v-if="addrList[0]" class="picker_scroll" scroll-y>
                                <view class="picker first m_flex_column">
                                    <view class="item" :class="{on: li.on}" v-for="(li, i) in addrList[0]" :key="i" @tap="addrChange(li, 0)">{{li.name}}</view>
                                </view>
                            </scroll-view>
                            <scroll-view class="picker_scroll" scroll-y>
                                <view class="picker first m_flex_column" v-if="addrList[1]">
                                    <view class="item" :class="{on: li.on}" v-for="(li, i) in addrList[1]" :key="i" @tap="addrChange(li, 1)">{{li.name}}</view>
                                </view>
                            </scroll-view>
                        </template>
                    </template>
                </view>
                <view class="select_picker_fd">
                    <button class="m_button main btn" plain @tap="handleConfirm">确定</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
let street = null
let metro = null
let addr = null
export default {
    props: {
        selectType: [String, Number],
        params: Object,
    },
    computed: {
        styl() {
            return this.h ? `height: ${this.h}px` : ''
        }
    },
    data() {
        return {
            addrParams: {
                area_id: '',
                address_street_id: '',
                address_street: '',
                lat: '',
                lng: '',
                map_distance: '',
                metro_id: '',
            },
            address: '',
            address_street: '',
            type: '',
            modalVisible: false,
            typeList: [
                { value: 1, name: '附近', on: true },
                { value: 2, name: '区域', on: false },
                { value: 3, name: '地铁', on: false },
                { value: 4, name: '城中村', on: false },
            ],
            mapDistanceList: [
                { value: '', name: '不限', on: true },
                { value: 1000, name: '1000m内', on: false },
                { value: 3000, name: '3000m内', on: false },
                { value: 5000, name: '5000m内', on: false },
            ],
            street: null,
            streetList: [],
            metro: null,
            metroList: [],
            addr: null,
            addrList: [],
            h: '',
        }
    },
    methods: {
        getStreet() {
            if (this.street) return Promise.resolve()
            return new Promise((resolve, reject) => {
                this.$request.getAddrList({ pid: 1965 }).then(res => {
                    let data = res.data || []
                    resolve(data)
                }, e => {
                    reject(e)
                })
            }).then(data => {
                this.street = street = [...data]
                this.streetList.push(...[[{ name: '不限', pid_area_district: 1965, on: true }, ...data], [{ name: '不限', pid_area_district: 1965, on: true }]])
            })
        },
        getMetro() {
            if (this.metro) return Promise.resolve()
            return new Promise((resolve, reject) => {
                this.$request.getSubway({ parent_id: 1, level: 1, page_size: 200 }).then(res => {
                    let { data } = res.data || {}
                    this.metro = metro = [...data]
                    this.metroList.push(...[[...data].map((v, i) => ({ ...v, on: false })), []])
                    resolve()
                })
            })
        },
        getAddr() {
            if (this.addr) return Promise.resolve()
            return new Promise((resolve, reject) => {
                this.$request.getAddrList({ pid: 1965 }).then(res => {
                    let data = res.data || []
                    resolve(data)
                }, e => {
                    reject(e)
                })
            }).then(data => {
                this.addr = addr = [...data].map((v, i) => ({ ...v }))
                this.addrList.push(...[[{ name: '不限', pid: 1965, on: true }, ...data], [{ name: '不限', pid: 1965, on: true }]])
            })
        },
        typeChange(e) {
            this.type = e
            if (this.type === 2) {
                this.getStreet()
            } else if (this.type === 3) {
                this.getMetro().then(() => {
                    this.metroChange(this.metro[0], 0)
                })
            } else if (this.type === 4) {
                this.getAddr()
            }
        },
        chooseLocation() {
            this.$refs.auth.chooseLocation().done(addr => {
                this.type = 0
                this.address = addr.address
                this.addrParams = {
                    ...{
                        area_id: '',
                        address_street_id: '',
                        address_street: '',
                        lat: '',
                        lng: '',
                        map_distance: '',
                        metro_id: '',
                        // metro: '',
                    },
                    ...{
                        lng: addr.longitude,
                        lat: addr.latitude,
                    },
                }
                this.handleConfirm()
            }).fail(e => {
                console.log(e);
            })
        },
        distanceChange(e) {
            this.mapDistanceList.map(v => v.on = v.value === e.value)
            this.$refs.auth.getLocation().done(addr => {
                this.addrParams = {
                    ...{
                        area_id: '',
                        address_street_id: '',
                        address_street: '',
                        lat: '',
                        lng: '',
                        map_distance: '',
                        metro_id: '',
                        // metro: '',
                    },
                    ...{
                        map_distance: e.value,
                        lng: addr.longitude,
                        lat: addr.latitude,
                    },
                }
            }).fail(e => {
                console.log(e);
            })
        },
        streetChange(e, i) {
            if (e.id) {
                this.streetList[i].map(v => v.on = v && v.id === e.id)
            } else {
                this.streetList[i].map((v, i) => ({ ...v, on: i === 0 }))
            }
            if (i === 0) {
                let parent = e
                let list = []
                new Promise((resolve, reject) => {
                    if (e.id) {
                        list.push(...this.street.filter(v => v.pid_area_district === e.id))
                        if (!list.length) {
                            this.getStreetChildren(e.id).then(data => {
                                list.push(...data)
                                resolve(list)
                            })
                        } else {
                            resolve(list)
                        }
                    } else {
                        resolve(list)
                    }
                }).then(list => {
                    list.unshift({ name: '不限', pid_area_district: 1965, on: true })
                    this.streetList.splice(1, 1, list)
                })
                this.address_street = ''
                this.addrParams = {
                    ...{
                        area_id: '',
                        address_street_id: '',
                        address_street: '',
                        lat: '',
                        lng: '',
                        map_distance: '',
                        metro_id: '',
                        // metro: '',
                    },
                    ...{ area_id: parent && parent.id }
                }
            } else if (i === 1) {
                this.address_street = e.name
                this.addrParams = {
                    ...{
                        area_id: '',
                        address_street_id: '',
                        address_street: '',
                        lat: '',
                        lng: '',
                        map_distance: '',
                        metro_id: '',
                    },
                    ...{ address_street_id: e.id }
                }
            }
        },
        metroChange(e, i) {
            this.metroList[i].map(v => v.on = v.id === e.id)
            if (i === 0) {
                let parent = e
                let list = []
                new Promise((resolve, reject) => {
                    list.push(...this.metro.filter(v => v.parent_id === e.id))
                    if (!list.length) {
                        this.getMetroChildren(e.id).then(data => {
                            list.push(...data)
                            resolve(list)
                        })
                    } else {
                        resolve(list)
                    }
                }).then(list => {
                    this.metroList.splice(1, 1, [...list].map((v, i) => ({ ...v, on: i === 0 })))
                })
            } else {
                this.addrParams = {
                    ...{
                        area_id: '',
                        address_street_id: '',
                        address_street: '',
                        lat: '',
                        lng: '',
                        map_distance: '',
                        metro_id: '',
                    },
                    ...{ metro_id: e.id }
                }
            }
        },
        addrChange(e, i) {
            if (e.id) {
                this.addrList[i].map(v => v.on = v && v.id === e.id)
            }
            if (i === 0) {
                let parent = e
                let list = []
                new Promise((resolve, reject) => {
                    if (e.id) {
                        list.push(...this.addr.filter(v => v.pid === e.id))
                        if (!list.length) {
                            this.getAddrChildren(e.id).then(data => {
                                list.push(...data)
                                resolve(list)
                            })
                        } else {
                            resolve(list)
                        }
                    } else {
                        resolve(list)
                    }
                }).then(list => {
                    list.unshift({ name: '不限', pid: 1965, on: true })
                    this.addrList.splice(1, 1, list)
                })
                this.address_street = ''
                this.addrParams = {
                    ...{
                        area_id: '',
                        address_street_id: '',
                        address_street: '',
                        lat: '',
                        lng: '',
                        map_distance: '',
                        metro_id: '',
                        // metro: '',
                    },
                    ...{ area_id: parent && parent.id }
                }
            } else if (i === 1) {
                this.address_street = e.name
                this.addrParams = {
                    ...{
                        area_id: '',
                        address_street_id: '',
                        address_street: '',
                        lat: '',
                        lng: '',
                        map_distance: '',
                        metro_id: '',
                    },
                    ...{ address_street_id: e.id }
                }
            }
        },
        getStreetChildren(id) {
            return this.$request.getStreet({ pid_area_district: id }).then(res => {
                let { data } = res.data || {}
                data = data.map((v, i) => ({ ...v, on: false }))
                this.street = street = [...this.street, ...data]
                return data
            })
        },
        getMetroChildren(id) {
            return this.$request.getSubway({ parent_id: id, level: 2, page_size: 200 }).then(res => {
                let { data } = res.data || {}
                data = data.map((v, i) => ({ ...v, on: false }))
                this.metro = metro = [...this.metro, ...data]
                return data
            })
        },
        getAddrChildren(id) {
            return this.$request.getStreet({ pid: id }).then(res => {
                let { data } = res.data || {}
                data = data.map((v, i) => ({ ...v, on: false }))
                this.addr = addr = [...this.addr, ...data]
                return data
            })
        },
        calculate() {
            const query = uni.createSelectorQuery().in(this)
            query.select('#addr').boundingClientRect(data => {
                if (data.top > 0) {
                    uni.pageScrollTo({
                        scrollTop: data.top,
                        duration: 50
                    })
                }
                this.h = uni.getSystemInfoSync().windowHeight - data.height - 10
            }).exec()
        },
        showModal() {
            if (this.modalVisible) {
                return this.hideModal()
            }
            this.calculate()
            this.type = this.selectType || 1
            this.modalVisible = true
        },
        hideModal(bl) {
            if (!bl) {
                Object.keys(this.addrParams).map(key => {
                    this.addrParams[key] = this.params[key]
                })
            }
            this.modalVisible = false
            this.type = ''
        },
        handleConfirm() {
            this.$emit('change', { type: this.type, params: { ...this.addrParams }})
            this.hideModal(true)
        },
        empty() {},
    },
    filters: {
        getStreetCity(aid, cid) {
            if (street) {
                if (aid) {
                    let v = street.find(v => v.id === aid)
                    return v.name
                } else if (cid) {
                    let v = street.find(v => v.id === cid)
                    return v.name
                }
            }
            return '广州市'
        },
        getMetroArea(id) {
            if (metro) {
                let v = metro.find(v => v.id === id)
                return v ? v.name : ''
            }
            return ''
        },
        getMetroLine(id) {
            if (metro) {
                let s = metro.find(v => v.id === id)
                if (s) {
                    let v = metro.find(v => v.id === s.parent_id)
                    return v ? v.name : ''
                }
            }
            return ''
        },
        getAddrCity(aid, cid) {
            if (addr) {
                if (aid) {
                    let v = addr.find(v => v.id === aid)
                    return v.name
                } else if (cid) {
                    let v = addr.find(v => v.id === cid)
                    return v.name
                }
            }
            return '广州市'
        },
    },
}
</script>

<style lang="scss" scoped>
.select_wrap {
    position: relative;
    .m_cmain {
        color: $main-color;
    }
    .line {
        padding-right: 10upx;
    }
    .select_box {
        position: relative;
        height: 80upx;
        line-height: 80upx;
        padding: 0 30upx;
        background-color: #fff;
    }
    .select_item {
        position: relative;
        padding: 0 20upx;
        overflow: hidden;
    }
    .select_icon {
        flex: 0 0 32upx;
        width: 32upx;
        height: 32upx;
        margin-right: 25upx;
    }
    .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .select_modal {
        position: absolute;
        z-index: 100;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin-top: 100upx;
    }
    .select_mask {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: $uni-bg-color-mask;
    }
    .select_picker {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 2upx 4upx 0 rgba(0, 0, 0, 0.11);

        &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 25%;
            width: 0;
            height: 0;
            border: 16upx solid #fff;
            transform: rotate(45deg) translate(-10upx, -10upx);
            transform-origin: center;
        }
    }
    .picker_scroll {
        height: 100%;
    }
    .picker {
        height: 100%;
        line-height: 34upx;
        font-size: 26upx;
        color: #666;
        &.zero {
            position: relative;
            flex: 0 0 185upx;
            width: 185upx;
            background-color: #F2F2F2;
            .item {
                height: 80upx;
                line-height: 34upx;
                box-sizing: border-box;
                padding: 23upx 0 23upx 50upx;
                &.on {
                    background-color: #fff;
                }
            }
        }
        &.first {
            flex: 1;
            padding: 45upx 0;
            box-sizing: border-box;
            .item {
                padding: 15upx 0;
                line-height: 34upx;
                text-align: center;
                &.on {
                    color: $main-color;
                }
            }
        }
        &.second,
        &.third {
            flex: 1;
            .item {
                line-height: 68upx;
                padding-left: 50upx;
            }
        }
    }
    .btn {
        display: block;
        height: 88upx;
        margin: 30upx 30upx 50upx;
        padding: 0;
        line-height: 86upx;
        border-radius: 44upx;
    }
}
</style>
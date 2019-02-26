<template>
	<view class="content">
        <swiper class="swiper" :indicator-dots="true" indicator-color="#6d7271" indicator-active-color="#4ce6e8" :autoplay="true" :interval="3000" :duration="1000">
        	<swiper-item>
        		<view class="swiper-item">
                    <image src="/static/image/index/banner.png" mode="aspectFit"></image>
                </view>
        	</swiper-item>
        </swiper>
		<house-list :list.sync="list"></house-list>
	</view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import HouseList from '../components/house-list';
export default {
	components: {
		HouseList
	},
	data() {
		return {
			list: [1, 2]
		};
	},
	onLoad(res) {
		console.log('onLoad');
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
	},
	onReachBottom() {
		console.log('onReachBottom');
	},
	onReady() {
		this.setInitFn(this.getData);
	},
	methods: {
		...mapMutations(['setInitFn']),
		getData() {
			console.log('init');
			this.setInitFn(null);
		}
	}
};
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
</style>

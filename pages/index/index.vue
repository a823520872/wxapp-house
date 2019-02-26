<template>
	<view class="content">
        <swiper class="swiper" :indicator-dots="true" indicator-color="#6d7271" indicator-active-color="#4ce6e8" :autoplay="true" :interval="3000" :duration="1000">
        	<swiper-item>
        		<view class="swiper-item">
                    <image src="/static/image/index/banner.png" mode="aspectFit"></image>
                </view>
        	</swiper-item>
        </swiper>
		<view class="cells">
			<view class="cells_hd">
				
			</view>
			<view class="cells_bd">
				
			</view>
			<view class="cells_fd">
				<scroll-view class="scroll_view" :scroll-x="true">
					<view class="m_flex">
						<view class="category">
							<view class="btn active">
								单间
							</view>
						</view>
						<view class="category">
							<view class="btn">
								一房一厅
							</view>
						</view>
						<view class="category">
							<view class="btn">
								单间
							</view>
						</view>
						<view class="category">
							<view class="btn">
								一房一厅
							</view>
						</view>
						<view class="category">
							<view class="btn">
								单间
							</view>
						</view>
						<view class="category">
							<view class="btn">
								一房一厅
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<house-list :list.sync="list"></house-list>
	</view>
</template>

<script>
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
		this.getData()
	},
	methods: {
		getData() {
			console.log('init');
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
	.scroll_view {
		padding: 10upx 30upx;
		.category {
			position: relative;
			width: 200upx;
			height: 56upx;
			margin: 5upx 30upx 5upx 0;
		}
		.btn {
			width: 200upx;
			height: 56upx;
			line-height: 56upx;
			background-color: #fff;
			text-align: center;
			font-size: 25upx;
			color: $main-color;
		}
		.active {
			background-color: $main-color;
			color: #fff;
		}
	}
</style>

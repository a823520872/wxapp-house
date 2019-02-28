<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="true" indicator-color="#6d7271" indicator-active-color="#4ce6e8" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image src="/static/image/index/house_banner.png" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="bd">
			<view class="cells">
				<view class="cell">

				</view>
			</view>
			<view class="cells">
				<view class="cell">

				</view>
			</view>
			<view class="cells">
				<view class="cells_title title">房源位置<text class="intro">（房源在定位附件）</text></view>
				<view class="cell map">

				</view>
			</view>
			<view class="cells">
				<view class="cell">
					<view class="other m_flex_middle">
						<view class="title m_flex_item">客观描述</view>
						<view>阅读量：500</view>
						<view class="praise m_flex_middle">
							点赞：
							<image src="/static/image/index/praise.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty"></view>
		<view class="fd m_flex">
			<view class="collection m_flex_column m_flex_middle m_flex_center m_flex_item">
				<image src="/static/image/index/collect.png" mode="aspectFit"></image>
				<text>收藏</text>
			</view>
			<view class="gift m_flex_column m_flex_middle m_flex_center m_flex_item">
				<image src="/static/image/index/gift.png" mode="aspectFit"></image>
				<text>拿乔迁礼</text>
			</view>
			<view class="link m_flex_column m_flex_middle m_flex_center" @tap="linkLandlord">
				<image src="/static/image/index/tel.png" mode="aspectFit"></image>
				<text>联系房东</text>
			</view>
		</view>
		<v-modal class="modal" ref="modal">
			<view slot="content">
				<view class="link m_flex_justify">
					<view>手机号：13123456789</view>
					<button class="m_button main" plain @tap="call">拨打</button>
				</view>
				<view class="link m_flex_justify">
					<view>微信号：13123456789</view>
					<button class="m_button main" plain @tap="copy">复制</button>
				</view>
			</view>
		</v-modal>
	</view>
</template>

<script>
	export default {
		methods: {
			linkLandlord() {
				this.$refs.modal.show({
					title: "联系方式",
					confirmText: "确定",
					success() {}
				});
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: "114"
				});
			},
			copy() {
				uni.setClipboardData({
					data: "hello",
					success() {
						uni.showToast({
							title: "复制成功",
							icon: "success"
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.swiper {
		width: 750upx;
		height: 348upx;
		&-item {
			width: 100%;
			height: 100%;
		}
	}
	.bd {
		.cells {
			background-color: #fff;
			& + .cells {
				margin-top: 18upx;
			}
		}
		.other {
			height: 100upx;
			padding: 0 30upx;
			image {
				width: 40upx;
				height: 40upx;
			}
		}
		.title {
			font-size: 33upx;
		}

		.praise {
			height: 100%;
			padding-left: 30upx;
		}
	}
	.fd {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100upx;
		background-color: #fff;
		font-size: 20upx;
		.collection {
			background-color: #f5f5f5;
			color: $text-color-inverse;
		}
		.gift {
			background-color: $primary-color;
			color: #fff;
		}
		.link {
			flex: 2;
			background-color: $main-color;
			color: #fff;
		}
		image {
			width: 48upx;
			height: 48upx;
		}
	}
</style>

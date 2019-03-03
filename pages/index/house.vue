<template>
	<view class="content">
		<!-- <swiper class="swiper" :indicator-dots="true" indicator-color="#6d7271" indicator-active-color="#4ce6e8" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image src="/static/image/index/house_banner.png" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper> -->
		<view class="bd">
			<!-- <view class="cells">
				<view class="cell">
					<view class="house_name m_flex_justify">
						<view class="title">单间·天河区·上社</view>
						<button class="share m_button plain m_flex_middle" open-type="share">
							<image src="/static/image/index/share.png" mode="aspectFit"></image>
							<text>分享</text>
						</button>
					</view>
					<view class="m_flex_middle m_flex_justify">
						<view class="price">
							<text class="num">1000</text>
							<text>元/月</text>
						</view>
						<view class="time m_flex_middle">
							<image src="/static/image/index/time.png" mode="aspectFit"></image>
							<text>3天前发布</text>
						</view>
					</view>
				</view>
			</view> -->
			<view class="cells">
				<!-- <view class="cells_title title">房源信息</view> -->
				<view class="cell intro m_flex_wrap">
					<view class="house_name m_flex_justify">
						<view class="title">单间·天河区·上社</view>
						<button class="share m_button plain m_flex_middle" open-type="share">
							<image src="/static/image/index/share.png" mode="aspectFit"></image>
							<text>分享</text>
						</button>
					</view>
					<view class="intro_cell m_textover">
						<text class="intro_hd">租金：</text>
						<text class="intro_bd">
							<text class="price">
								<text class="num">1000 </text>
								<text>元/月</text>
							</text>
						</text>
					</view>
					<view class="intro_cell m_textover">
						<text class="intro_hd">楼层：</text>
						<text class="intro_bd">【6楼】</text>
					</view>
					<view class="intro_cell m_textover">
						<text class="intro_hd">地址：</text>
						<text class="intro_bd">【上社】【荷光路】【大利家】【路边第3栋】【上社】【荷光路】【大利家】【路边第3栋】</text>
					</view>
					<view class="intro_cell m_textover">
						<text class="intro_hd">亮点：</text>
						<text class="intro_bd">【洗衣机】【空调】【有阳台】【光线好】【大】</text>
					</view>
					<view class="intro_cell m_textover">
						<text class="intro_hd">具体地址：</text>
						<text class="intro_bd">广州上社乐泰路大街9号</text>
					</view>
					<view class="intro_cell m_textover">
						<text class="intro_hd">备注：</text>
						<text class="intro_bd">光线很好，房间很大</text>
					</view>
				</view>
			</view>
			<view class="cells">
				<view class="cell m_flex_middle">
					<view class="avatar">
						<image src="/static/image/index/time.png" mode="aspectFit"></image>
					</view>
					<view class="user m_flex_item">
						<view class="name">房东微信昵称</view>
						<view class="m_flex_middle">
							<!-- <image src="/static/image/index/auth.png" mode="aspectFit"></image> -->
							<text>阅读量：500</text>
						</view>
					</view>
					<!-- <view class="has">TA还有XX套空房</view> -->
					<view class="user">
						<view>2019.02.15</view>
						<view>18:02 发布</view>
					</view>
				</view>
			</view>
			<view class="cells">
				<view class="cells_title title">房源图片</view>
				<view class="cell">
					<view class="house_img">
						<image src="/static/image/index/house_banner.png" mode="aspectFill"></image>
					</view>
					<view class="house_img">
						<image src="/static/image/index/house_banner.png" mode="aspectFill"></image>
					</view>
					<view class="house_img">
						<image src="/static/image/index/house_banner.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="cells">
				<view class="cells_title title">房源位置<text class="intro">（房源在定位附件）</text></view>
				<view class="cell map">
					<image src="/static/image/index/map.png" mode="aspectFill"></image>
				</view>
			</view>
			<!-- <view class="cells">
				<view class="cell other m_flex_middle">
					<view class="title m_flex_item">客观描述</view>
					<view>阅读量：500</view>
					<view class="praise m_flex_middle">
						点赞：
						<image src="/static/image/index/praise.png" mode="aspectFit"></image>
					</view>
				</view>
			</view> -->
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
		<v-modal ref="modal">
			<view slot="content">
				<view class="modal">
					<view class="link m_flex_justify">
						<view>手机号：13123456789</view>
						<button class="m_button main" plain @tap="call">拨打</button>
					</view>
					<view class="link m_flex_justify">
						<view>微信号：13123456789</view>
						<button class="m_button main" plain @tap="copy">复制</button>
					</view>
				</view>
			</view>
		</v-modal>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(obj) {
			return {
				title: "房源详情",
				path: "/pages/index/house"
			};
		},
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

			&_title {
				padding-left: 30upx;
				padding-right: 30upx;
				line-height: 90upx;
				font-size: 33upx;

				&::before {
					content: " ";
					display: inline-block;
					width: 5upx;
					height: 22upx;
					margin-right: 7upx;
					background-color: $main-color;
				}

				.intro {
					font-size: 25upx;
				}
			}
		}
		.cell {
			padding: 0 30upx;
		}
		.house_name {
			width: 100%;
			padding-top: 30upx;
			padding-bottom: 12upx;
		}
		.share {
			image {
				width: 25upx;
				height: 28upx;
				padding-right: 10upx;
			}
		}
		.price {
			padding-bottom: 24upx;
			color: $primary-color;
			.num {
				// font-size: 33upx;
				font-weight: bold;
			}
		}
		.time {
			padding-bottom: 24upx;
			image {
				width: 22upx;
				height: 22upx;
				padding-right: 10upx;
			}
		}
		.intro {
			line-height: 37upx;
			padding-bottom: 18upx;

			&_cell {
				padding: 5upx 0;
				min-width: 50%;
			}

			&_hd {
				color: $text-color-inverse;
			}
		}
		.avatar {
			width: 140upx;
			height: 140upx;
			margin-top: 28upx;
			margin-right: 24upx;
			margin-bottom: 28upx;
			border-radius: 50%;
			overflow: hidden;
		}
		.user {
			color: $text-color-inverse;
			image {
				width: 32upx;
				height: 18upx;
				padding-right: 16upx;
			}
		}
		.name {
			padding-bottom: 10upx;
			font-size: 30upx;
			color: $text-color;
		}
		.has {
			color: $primary-color;
		}
		.house_img {
			height: 374upx;
			padding-bottom: 18upx;
			&:last-of-type {
				padding-bottom: 30upx;
			}
		}
		.map {
			width: 750upx;
			height: 321upx;
			padding: 0;
			padding-bottom: 18upx;
		}
		.other {
			height: 100upx;
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

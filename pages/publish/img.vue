<template>
	<view class="content">
		<view class="hd">
			<view class="banner">
				<image src="/static/image/index/house_banner.png" mode="aspectFill"></image>
			</view>
			<view class="intro">首图</view>
		</view>
		<view class="bd m_flex_wrap">
			<view class="item">
				<view class="img">
					<image src="/static/image/index/house_banner.png" mode="aspectFill"></image>
				</view>
				<view class="close">
					<image src="/static/image/index/del.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item m_flex_center m_flex_middle">
				<view class="photo">
					<image src="/static/image/publish/photo_1.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="empty"></view>
		<view class="fd" @tap="confirm">完成</view>
	</view>
</template>

<script>
	export default {
		methods: {
			confirm() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.hd {
		position: relative;
		padding-bottom: 30upx;
		background-color: #fff;
		.banner {
			width: 100%;
			height: 479upx;
		}
		.intro {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 75upx;
			margin-bottom: 30upx;
			background-color: rgba(0, 0, 0, 0.3);
			line-height: 75upx;
			text-align: center;
			font-size: 30upx;
			color: #fff;
		}
	}
	.bd {
		margin-top: 18upx;
		padding: 30upx 10upx 20upx;
		background-color: #fff;

		&.m_flex_wrap {
			margin-right: -10upx;

			.item {
				position: relative;
				width: 237upx;
				height: 177upx;
				margin-right: 10upx;
				margin-bottom: 10upx;
				background-color: #dfdfdf;
			}

			.img {
				width: 100%;
				height: 100%;
			}

			.close {
				position: absolute;
				top: 0;
				right: 0;
				width: 46upx;
				height: 46upx;
				padding: 10upx;
			}
			.photo {
				width: 86upx;
				height: 65upx;
			}
		}
	}
	.fd {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100upx;
		line-height: 100upx;
		background-color: $primary-color;
		text-align: center;
		font-size: 33upx;
		color: #fff;
	}
</style>

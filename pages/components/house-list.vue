<template>
	<view>
		<view class="list">
			<view v-for="(li, i) in list" :key="i" class="cell" @tap="goPage(`/pages/index/house`)">
				<view class="hd">
					<view class="m_flex_justify">
						<view class="title m_textover">单间</view>
						<view class="price">
							<text class="num">1000</text>
							<text class="unit">元/月</text>
						</view>
						<button class="m_button main plain" @tap.stop="linkLandlord">联系房东</button>
					</view>
					<view class="intro">
						<view class="intro_cell m_textover">楼层：【6楼】</view>
						<view class="intro_cell m_textover">地址：【上社】【荷光路】【大利家】【路边第3栋】</view>
						<view class="intro_cell m_textover">亮点：【洗衣机】【空调】【有阳台】【光线好】【大】</view>
					</view>
				</view>
				<view class="bd m_flex_justify">
					<view class="img_box">
						<image src="/static/image/index/banner.png" mode="aspectFill"></image>
					</view>
					<view class="img_box">
						<image src="/static/image/index/banner.png" mode="aspectFill"></image>
					</view>
					<view class="img_box last">
						<image src="/static/image/index/banner.png" mode="aspectFill"></image>
					</view>
				</view>
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
	import { mapActions } from "vuex";
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		methods: {
			...mapActions(["goPage"]),
			linkLandlord() {
				this.$refs.modal.show({
					title: "联系方式",
					confirmText: "确定",
					success() {}
				});
			},
			collect() {},
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
	.list {
		.cell {
			padding: 10upx 30upx;
			margin-bottom: 18upx;
			background-color: #fff;
		}

		.hd {
			padding-top: 12upx;
		}

		.title {
			max-width: 40%;
			font-size: 33upx;
		}

		.price {
			align-self: flex-end;
			color: $primary-color;
		}

		.num {
			font-size: 25upx;
		}

		.unit {
			font-size: 15upx;
		}

		.m_button {
			width: 200upx;
			height: 56upx;
			padding: 0 7upx;
			line-height: 54upx;
		}

		.intro {
			padding: 17upx 0 0;
			font-size: 24upx;
			line-height: 42upx;
			color: $text-color-inverse;
		}

		.bd {
			padding-top: 16upx;
			padding-bottom: 24upx;
		}

		.img_box {
			width: 222upx;
			height: 174upx;
			background-color: $uni-bg-color-grey;
		}

		.last {
			position: relative;

			&::after {
				content: "更多";
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				width: 100%;
				height: 100%;
				justify-content: center;
				align-items: center;
				background-color: rgba(76, 230, 232, 0.4);
				font-size: 25upx;
				color: #fff;
			}
		}
	}
</style>

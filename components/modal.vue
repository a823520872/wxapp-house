<template>
	<view v-if="isShow">
		<v-mask @click="hide"></v-mask>
		<view class="ui-dialog">
			<view v-if="titleModal" class="ui-dialog__hd">
				<view class="ui-dialog__title">{{titleModal}}</view>
			</view>
			<view class="ui-dialog__bd">
				<view>
					<slot name="content">
						{{contentModal}}
					</slot>
				</view>
			</view>
			<view class="ui-dialog__ft">
				<view v-if="cancelTextModal" class="ui-dialog__btn ui-dialog__btn_default" @tap="hide(true)">
					<text>{{cancelTextModal}}</text>
				</view>
				<view class="ui-dialog__btn ui-dialog__btn_primary" @tap="confirm">
					<slot name="footer">{{confirmTextModal}}</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'modal',
		props: {
			title: {
				type: String,
				default () {
					return ''
				}
			},
			content: {
				type: String,
				default () {
					return ''
				}
			},
			cancelText: {
				type: String,
				default () {
					return ''
				}
			},
			confirmText: {
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				isShow: false,
				titleModal: '',
				contentModal: '',
				cancelTextModal: '',
				confirmTextModal: '',
			}
		},
		methods: {
			show(cfg) {
				this.isShow = true

				this.titleModal = cfg.title || this.title

				this.contentModal = cfg.content || this.content

				this.cancelTextModal = cfg.cancelText || this.cancelText

				this.confirmTextModal = cfg.confirmText || this.confirmText

				this.successFun = cfg.success || null
				this.failFun = cfg.fail || null
			},
			hide(boolean) {
				this.isShow = false;
				// boolean为true时，代表点击的取消按钮
				this.failFun && this.failFun(boolean)
			},
			confirm() {
				this.isShow = false;
				this.successFun && this.successFun()
			}
		}
	}
</script>

<style lang="scss">
	.ui-dialog {
		position: fixed;
		z-index: 5000;
		width: 80%;
		max-width: 600upx;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: $uni-bg-color;
		text-align: center;
		border-radius: 6upx;
		overflow: hidden;
		font-size: 32upx;

		&__hd {
			padding: 1.3em 1.6em 0.5em;
		}

		&__title {
			line-height: 1.6;
			font-weight: 400;
			font-size: 36upx;
		}

		&__bd {
			padding: 0 1.6em 0.8em;
			min-height: 80upx;
			max-height: 700upx;
			overflow: auto;
			font-size: 30upx;
			line-height: 1.3;
			word-wrap: break-word;
			word-break: break-all;
			color: $uni-text-color-placeholder;
		}

		&__bd:first-child {
			padding: 2.7em 40upx 1.7em;
			color: #353535;
		}

		&__ft {
			position: relative;
			line-height: 96upx;
			font-size: 36upx;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
		}

		&__ft:after {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 1upx;
			border-top: 1upx solid $uni-border-color;
			color: $uni-border-color;
		}

		&__btn {
			display: block;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
			color: #09BB07;
			text-decoration: none;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			position: relative;

			button {
				line-height: 96upx;
				font-size: 36upx;
			}
		}

		&__btn:active {
			background-color: $uni-bg-color-hover;
		}

		&__btn:after {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			width: 1upx;
			bottom: 0;
			border-left: 1upx solid $uni-border-color;
			color: $uni-border-color;
		}

		&__btn:first-child:after {
			display: none;
		}

		&__btn_default {
			color: #353535;
		}

		&__btn_primary {
			color: $uni-color-primary;
			background-color: #fff;
		}
	}
</style>

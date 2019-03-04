<script>
export default {
    onLaunch: function() {
        // #ifdef MP-WEIXIN
        if (wx.canIUse && wx.canIUse('getUpdateManager')) {
            let updateManager = wx.getUpdateManager();
            updateManager.onUpdateReady(function() {
                updateManager.applyUpdate();
            });
        }
        // #endif
    },
    onShow: function() {
        console.log('App Show');
        // this.init();
        uni.request({
        	url: 'http://127.0.0.1:3000/enterprise_integrated_services_m/policy/pageDate?pageSize=2&currentPage=1&params=%20',
            method: 'get',
            success(res) {
            	console.log(res);
            }
        })
    },
    onHide: function() {
        console.log('App Hide');
    }
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
    background-color: #eee;
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
button,
p,
blockquote,
th,
td {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
image {
    width: 100%;
    height: 100%;
    vertical-align: top;
}
.content {
    font-size: 25upx;
    color: $text-color;
}
.content_bg_ff {
    position: absolute;
    top: 0;
	right: 0;
    bottom: 0;
    left: 0;
	background-color: #fff;
}
.m_flex {
    display: flex;
    &_left {
        display: flex;
        justify-content: flex-start;
    }
    &_center {
        display: flex;
        justify-content: center;
    }
    &_right {
        display: flex;
        justify-content: flex-end;
    }
    &_justify {
        display: flex;
        justify-content: space-between;
    }
    &_top {
        display: flex;
        align-items: flex-start;
    }
    &_middle {
        display: flex;
        align-items: center;
    }
    &_bottom {
        display: flex;
        align-items: flex-end;
    }
    &_column {
        display: flex;
        flex-direction: column;
    }
    &_wrap {
        display: flex;
        flex-wrap: wrap;
    }
    &_item {
        flex: 1;
    }
}
.m_button {
    display: inline-block;
    padding: 10upx 14upx;
    font-size: 28upx;
    line-height: 1;
    border-radius: none;
    box-sizing: border-box;
    color: $text-color;

    &.primary {
        background-color: $primary-color;
        border: 1upx solid $primary-color;
        color: #fff;
    }

    &.main {
        background-color: $main-color;
        border: 1upx solid $main-color;
        color: #fff;
    }

    &.plain {
        background-color: transparent;
        &.primary {
            color: $primary-color;
        }
        &.main {
            color: $main-color;
        }
    }

    &::after {
        border: none;
    }
}

.m_textover {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.m_text_center {
    text-align: center;
}

.bottom_icon {
    display: inline-block;
    width: 14upx;
    height: 14upx;
    border-left: 2upx solid $text-color;
    border-bottom: 2upx solid $text-color;
    transform: rotate(-45deg);
    vertical-align: 6upx;
}

.right_icon {
    width: 20upx;
    height: 20upx;
    border-right: 4upx solid $text-color;
    border-bottom: 4upx solid $text-color;
    transform: rotate(-45deg);
}
.empty {
    height: 100upx;
}
.modal {
    .link {
        padding: 10upx 0;
    }
}
</style>

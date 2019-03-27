<template>
    <view>
        <view class="m_listloading" v-if="loading">·· 正在加载中 ··</view>
        <template v-else>
            <view class="m_listloading" v-if="hasMore">·· 加载下一页 ··</view>
            <view class="m_listloading" v-else>·· END ··</view>
        </template>
    </view>
</template>

<script>
export default {
    props: {
        list: [Object, Array]
    },
    data() {
        return {
            page: 1,
            hasMore: true,
            loading: true,
            obj: null,
            error: false
        };
    },
    methods: {
        empty() {
            this.hasMore = false;
            this.$emit("update:list", []);
        },
        init(obj) {
            this.empty();
            obj.fn = obj.fn || ((data = []) => data);
            this.obj = obj;
            return this.getData(obj.page ? obj.page : -1);
        },
        reload(page) {
            return this.getData(page);
        },
        next() {
            if (this.page >= this.pages) {
                return;
            }
            return this.getData(this.page + 1);
        },
        getData(page) {
            const page_size = this.obj.page_size || 10;
            const obj = {
                ...this.obj.params,
                page: page === -1 ? 1 : page,
                page_size: page === -1 ? page_size * this.page : page_size
            };
            if (page !== -1) {
                this.page = page;
            }
            if (page !== -1 || this.list === null) {
                this.loading = true;
            }
            this.error = false;

            const request = this.$request[this.obj.url];

            return request(obj)
                .then(res => {
                    const { data } = res;
                    if (data && data.data) {
                        let list = this.obj.fn(data.data);
                        if (page <= 1) {
                            list = [...list];
                        } else {
                            list = [...this.list, ...list];
                        }
                        this.$emit("update:list", list);
                        this.loading = false;
                        if (!data.page) {
                            this.hasMore = false;
                        } else {
                            this.hasMore = data.page < data.pages;
                        }
                    }
                    uni.stopPullDownRefresh();
                    return res;
                })
                .catch(e => {
                    this.log(e);
                    this.loading = false;
                    this.error = e.msg;
                    uni.stopPullDownRefresh();
                });
        }
    }
};
</script>

<style lang="scss">
.m_listloading {
    text-align: center;
    line-height: 80upx;
    color: #ccc;
    font-size: 25upx;
}
</style>

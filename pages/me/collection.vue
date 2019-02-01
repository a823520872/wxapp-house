<template>
    <view>
        <house-list :list.sync="list"></house-list>
    </view>
</template>

<script>
import HouseList from '../components/house-list'
export default {
    components: {
        HouseList
    },
	data() {
		return {
            list: [1, 2],
			page: 1,
            hasMore: false
		}
	},
	onPullDownRefresh() {
		this.reload()
	},
	onReachBottom() {
		this.next()
	},
    onLoad(res) {

    },
    onReady() {
        this.getData()
    },
    methods: {
        getData(n) {
            const data = []
            this.list = n === 1 ? [...data] : [...this.list, ...data]
            this.page = n
        },
        reload() {
            this.getData(1)
        },
        next() {
            this.getData(this.page + 1)
        }
    }
}
</script>

<style>

</style>

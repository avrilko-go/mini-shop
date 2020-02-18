// components/hot-list/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        banner: Object,
    },
    observers: {
        'banner': function (banner) {
            if (!banner) {
                return
            }
            if (banner.length === 0) {
                return
            }
            if (banner.items.length === 0) {
                return
            }
            const left = banner.items.find(res => res.name === 'left')
            const rightTop = banner.items.find(res => res.name === 'right-top')
            const rightBottom = banner.items.find(res => res.name === 'right-bottom')
            this.setData({
                left,
                rightBottom,
                rightTop
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        left: null,
        rightTop: null,
        rightBottom: null,
    },

    /**
     * 组件的方法列表
     */
    methods: {}
})

// pages/home/home.js

import {Theme} from "../../models/theme";
import {Category} from "../../models/category";
import {Banner} from "../../models/banner";
import {Activity} from "../../models/activit";
import {SpuPaging} from "../../models/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        grid: [],
        activityD: null,
        themeE: null,
        themeF: null,
        themeH: null,
        themeESpu: null,
        bannerG: [],
        supPaging: null,
        loadingType: 'loading',
    },

    async onLoad(options) {
        this.initAllData()
        this.initBottomSpuList()
    },

    async initBottomSpuList() {
        const paging = SpuPaging.getLatest()
        this.data.supPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData() {
        const themes = new Theme()
        await themes.getThemes()
        const themeA = themes.getHomeLocationA()
        const themeE = themes.getHomeLocationE()
        const themeF = themes.getHomeLocationF()
        const themeH = themes.getHomeLocationH()
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }


        const grid = await Category.getHomeLocationC()
        const bannerB = await Banner.getHomeLocationB()
        const bannerG = await Banner.getHomeLocationG()
        const activityD = await Activity.getHomeLocationD()
        this.setData({
            themeA,
            grid,
            bannerB,
            activityD,
            themeE,
            themeF,
            bannerG,
            themeH,
            themeESpu,
        })
    },

    onPullDownRefresh: function () {

    },

    async onReachBottom() {
        const data = await this.data.supPaging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    onShareAppMessage: function () {

    }
})

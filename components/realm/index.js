// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },
    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            }
            if (Spu.isNoSpec(spu)) {
                this.setData({
                    noSpec: true
                })
                this.bindSkuData(spu.sku_list[0])
                return
            }

            const fencesGroup = new FenceGroup(spu)
            fencesGroup.initFences()
            this.data.judger = new Judger(fencesGroup)
            const defaultSku = fencesGroup.getDefaultSku()
            if (defaultSku) {
                this.bindSkuData(defaultSku)
            } else {
                this.bindSpuData()
            }
            this.bindInitData(fencesGroup)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        fences: [],
        judger: Object,
        previewImg: String,
        price: String,
        discountPrice: String,
        title: String,
        stock: Number,
        noSpec: Boolean,
        skuIntact: Boolean,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
                skuIntact: this.data.judger.isSkuIntact()
            })
        },
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
            })
        },
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock
            })
        },
        onCellTap(event) {
            const {cell, x, y} = event.detail
            const judger = this.data.judger
            judger.judge(cell, x, y)
            this.setData({
                fences: judger.fenceGroup.fences
            })
        }
    }
})

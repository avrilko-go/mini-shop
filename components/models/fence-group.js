import {Fence} from "./fence";
import {Matrix} from "./matrix";

class FenceGroup {
    spu
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) {
            return
        }

        return this.skuList.find(s => s.id === defaultSkuId)
    }

    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
    }

    setCellStatusById(cellId, status) {
        this.eachCell(cell => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    //
    // initFences1() {
    //     const matrix = this._createMatrix(this.skuList)
    //     const fences = []
    //     let currentJ = -1
    //     matrix.forEach((element, i, j) => {
    //         if (currentJ !== j) { // 开启新列
    //             currentJ = j
    //             fences[currentJ] = this._createFence(element)
    //         }
    //         fences[currentJ].pushValueTitle(element.value)
    //     })
    //
    // }

    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const AT = matrix.transpose()
        AT.forEach(res => {
            let fence = new Fence(res)
            fence.init()
            fences.push(fence)
        })
        this.fences = fences
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                let cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }

    // _createFence(element) {
    //     return new Fence()
    // }

    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })

        return new Matrix(m)
    }
}

export {
    FenceGroup
}

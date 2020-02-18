import {Cell} from "./cell";

class Fence {
    cells = []
    specs = []
    title
    id

    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    // pushValueTitle(title) {
    //     this.cells.push(title)
    // }

    init() {
        this._initCells()
    }

    _initCells() {
        this.specs.forEach(res => {
            let existed = this.cells.some(c => {
                return c.id === res.value_id
            })
            if (existed) {
                return
            }
            let cell = new Cell(res)
            this.cells.push(cell)
        })
    }
}

export {
    Fence
}

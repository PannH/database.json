"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TableDocument {
    id;
    value;
    constructor(data) {
        this.id = data._id;
        delete data._id;
        this.value = data;
    }
}
exports.default = TableDocument;

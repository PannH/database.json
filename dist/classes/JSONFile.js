"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class JSONFile {
    path;
    constructor(absolutePath) {
        if (!absolutePath.endsWith('.json'))
            throw new Error('The specified file path does not lead to a JSON file.');
        if (!(0, fs_1.existsSync)(absolutePath))
            throw new Error('The specified path is invalid.');
        this.path = absolutePath;
    }
    get data() {
        return JSON.parse((0, fs_1.readFileSync)(this.path, { encoding: 'utf8' }));
    }
    updateData(newData) {
        (0, fs_1.writeFileSync)(this.path, JSON.stringify(newData), { encoding: 'utf8' });
    }
}
exports.default = JSONFile;

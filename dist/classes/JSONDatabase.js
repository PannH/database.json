"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseTable_1 = __importDefault(require("./DatabaseTable"));
const JSONFile_1 = __importDefault(require("./JSONFile"));
class JSONDatabase {
    _file;
    constructor(options) {
        if (!options?.filePath)
            throw new Error('You must specifiy the path to the JSON file.');
        this._file = new JSONFile_1.default(options.filePath);
    }
    /**
     * → An array of each table's name
     */
    get tables() {
        return Object.keys(this._file.data);
    }
    ;
    /**
     * → Load a table from the database
     * @param name The name of the table you want to load
     */
    table(name) {
        if (!this.tables.includes(name))
            throw new Error(`The table '${name}' does not exist.`);
        return new DatabaseTable_1.default(name, this._file);
    }
    /**
     * → Create a new table into the database
     * @param name The name of the table you want to create
     */
    createTable(name) {
        if (this.tables.includes(name))
            throw new Error(`The table '${name}' already exists`);
        const newData = this._file.data;
        newData[name] = [];
        this._file.updateData(newData);
        return this.table(name);
    }
    /**
     * → Delete an existing table from the database
     * @param name The name of the table you want to delete
     */
    deleteTable(name) {
        if (!this.tables.includes(name))
            throw new Error(`The table '${name}' does not exist.`);
        const newData = this._file.data;
        delete newData[name];
        this._file.updateData(newData);
    }
}
exports.default = JSONDatabase;

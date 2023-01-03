"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TableDocument_1 = __importDefault(require("./TableDocument"));
const crypto_1 = require("crypto");
class DatabaseTable {
    name;
    _file;
    constructor(name, file) {
        this.name = name;
        this._file = file;
    }
    /**
     * → Get the amount of documents
     */
    get size() {
        return this.all.length;
    }
    /**
     * → Get an array of every documents
     */
    get all() {
        const documentsData = this._file.data[this.name];
        return documentsData.map((documentData) => new TableDocument_1.default(documentData));
    }
    /**
     * → Get a document by its id
     * @param documentId The document's id
     */
    getById(documentId) {
        const documentData = this._file.data[this.name].find((document) => document._id === documentId);
        return documentData ? new TableDocument_1.default(documentData) : undefined;
    }
    /**
     * → Get the first document that matches the predicate
     * @param predicate The predicate function
     */
    findOne(predicate) {
        return this.all.find(predicate);
    }
    /**
     * → Get every documents that match the predicate
     * @param predicate The predicate function
     */
    findMany(predicate) {
        return this.all.filter(predicate);
    }
    /**
     * → Create a document
     * @param data The document's data
     */
    createOne(data) {
        if (Object.keys(data).includes('_id'))
            throw new Error('The key \'_id\' is reserved.');
        const uuid = (0, crypto_1.randomUUID)();
        const fileData = this._file.data;
        fileData[this.name].push({
            _id: uuid,
            ...data
        });
        this._file.updateData(fileData);
        return this.getById(uuid);
    }
    /**
     * → Create many documents
     * @param data An array of each document's data
     */
    createMany(...data) {
        const documentIds = [];
        const fileData = this._file.data;
        for (const dataPart of data) {
            if (Object.keys(dataPart).includes('_id'))
                throw new Error('The key \'_id\' is reserved.');
            const uuid = (0, crypto_1.randomUUID)();
            documentIds.push(uuid);
            fileData[this.name].push({
                _id: uuid,
                ...dataPart
            });
        }
        this._file.updateData(fileData);
        return documentIds.map((documentId) => this.getById(documentId));
    }
    /**
     * → Delete a document
     * @param documentId The document's id
     */
    deleteOne(documentId) {
        const documentToDelete = this.getById(documentId);
        if (!documentToDelete)
            return undefined;
        let fileData = this._file.data;
        const documentIndex = fileData[this.name].indexOf(fileData[this.name].find((documentData) => documentData._id === documentToDelete.id));
        fileData[this.name].splice(documentIndex, 1);
        this._file.updateData(fileData);
        return documentToDelete;
    }
    /**
     * → Delete many documents
     * @param documentIds An array of each document's id
     */
    deleteMany(...documentIds) {
        const documentsToDelete = documentIds
            .map((documentId) => this.getById(documentId))
            .filter((document) => document !== undefined);
        const fileData = this._file.data;
        for (const documentToDelete of documentsToDelete) {
            const documentIndex = fileData[this.name].indexOf(fileData[this.name].find((documentData) => documentData._id === documentToDelete.id));
            fileData[this.name].splice(documentIndex, 1);
        }
        this._file.updateData(fileData);
        return documentsToDelete;
    }
    /**
     * → Update a document
     * @param documentId The document's id
     * @param data The data you want to update
     */
    update(documentId, data) {
        const documentToUpdate = this.getById(documentId);
        if (!documentToUpdate)
            return undefined;
        const fileData = this._file.data;
        for (const key in data) {
            if (key === '_id')
                throw new Error('The key \'_id\' is reserved.');
            fileData[this.name].find((documentData) => documentData._id === documentToUpdate.id)[key] = data[key];
            documentToUpdate.value[key] = data[key];
        }
        this._file.updateData(fileData);
        return documentToUpdate;
    }
    /**
     * → Increment a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to increment
     * @param value The value you want to increment the property by (default: 1)
     */
    increment(documentId, propertyKey, value = 1) {
        const documentToUpdate = this.getById(documentId);
        if (!documentToUpdate)
            return undefined;
        if (!documentToUpdate.value[propertyKey] && documentToUpdate.value[propertyKey] !== null)
            throw new Error('The specified key does not exist on that document.');
        if (typeof documentToUpdate.value[propertyKey] !== 'number')
            throw new Error('The specified property key must lead to a number value.');
        const fileData = this._file.data;
        fileData[this.name].find((documentData) => documentData._id === documentToUpdate.id)[propertyKey] += value;
        documentToUpdate.value[propertyKey] += value;
        this._file.updateData(fileData);
        return documentToUpdate;
    }
    /**
     * → Decrement a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to decrement
     * @param value The value you want to decrement the property by (default: 1)
     */
    decrement(documentId, propertyKey, value = 1) {
        const documentToUpdate = this.getById(documentId);
        if (!documentToUpdate)
            return undefined;
        if (!documentToUpdate.value[propertyKey] && documentToUpdate.value[propertyKey] !== null)
            throw new Error('The specified key does not exist on that document.');
        if (typeof documentToUpdate.value[propertyKey] !== 'number')
            throw new Error('The specified property key must lead to a number value.');
        const fileData = this._file.data;
        fileData[this.name].find((documentData) => documentData._id === documentToUpdate.id)[propertyKey] -= value;
        documentToUpdate.value[propertyKey] -= value;
        this._file.updateData(fileData);
        return documentToUpdate;
    }
    /**
     * → Multiply a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to multiply
     * @param value The value you want to multiply the property by
     */
    multiply(documentId, propertyKey, value) {
        const documentToUpdate = this.getById(documentId);
        if (!documentToUpdate)
            return undefined;
        if (!documentToUpdate.value[propertyKey] && documentToUpdate.value[propertyKey] !== null)
            throw new Error('The specified key does not exist on that document.');
        if (typeof documentToUpdate.value[propertyKey] !== 'number')
            throw new Error('The specified property key must lead to a number value.');
        const fileData = this._file.data;
        fileData[this.name].find((documentData) => documentData._id === documentToUpdate.id)[propertyKey] *= value;
        documentToUpdate.value[propertyKey] *= value;
        this._file.updateData(fileData);
        return documentToUpdate;
    }
    /**
     * → Divide a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to divide
     * @param value The value you want to divide the property by
     */
    divide(documentId, propertyKey, value) {
        const documentToUpdate = this.getById(documentId);
        if (!documentToUpdate)
            return undefined;
        if (!documentToUpdate.value[propertyKey] && documentToUpdate.value[propertyKey] !== null)
            throw new Error('The specified key does not exist on that document.');
        if (typeof documentToUpdate.value[propertyKey] !== 'number')
            throw new Error('The specified property key must lead to a number value.');
        const fileData = this._file.data;
        fileData[this.name].find((documentData) => documentData._id === documentToUpdate.id)[propertyKey] /= value;
        documentToUpdate.value[propertyKey] /= value;
        this._file.updateData(fileData);
        return documentToUpdate;
    }
    /**
     * → Delete a document's property
     * @param documentId The document's id
     * @param key The key of the property you want to delete
     */
    deleteProperty(documentId, key) {
        const documentToUpdate = this.getById(documentId);
        if (!documentToUpdate)
            return undefined;
        if (!documentToUpdate.value[key] && documentToUpdate.value[key] !== null)
            throw new Error(`The property '${key}' does not exist on that document.`);
        const fileData = this._file.data;
        delete fileData[this.name].find((documentData) => documentData._id === documentToUpdate.id)[key];
        delete documentToUpdate.value[key];
        this._file.updateData(fileData);
        return documentToUpdate;
    }
    /**
     * → Push an item into a document's property (which is an array)
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to push the value to
     * @param value The value you want to push into the property
     */
    push(documentId, propertyKey, ...items) {
        const documentToUpdate = this.getById(documentId);
        if (!documentToUpdate)
            return undefined;
        if (!documentToUpdate.value[propertyKey] && documentToUpdate.value[propertyKey] !== null)
            throw new Error(`The property '${propertyKey}' does not exist on that document.`);
        if (!Array.isArray(documentToUpdate.value[propertyKey]))
            throw new Error(`The specified property key must lead to an array value.`);
        const fileData = this._file.data;
        fileData[this.name].find((documentData) => documentData._id === documentToUpdate.id)[propertyKey].push(items);
        documentToUpdate.value[propertyKey].push(items);
        this._file.updateData(fileData);
        return documentToUpdate;
    }
}
exports.default = DatabaseTable;

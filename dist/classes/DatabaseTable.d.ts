import JSONFile from './JSONFile';
import TableDocument from './TableDocument';
type PredicateFunction = (document: TableDocument, index: number, table: object[]) => boolean;
export default class DatabaseTable {
    name: string;
    private _file;
    constructor(name: string, file: JSONFile);
    /**
     * → Get the amount of documents
     */
    get size(): number;
    /**
     * → Get an array of every documents
     */
    getAll(): TableDocument[];
    /**
     * → Get a document by its id
     * @param documentId The document's id
     */
    getById(documentId: string): TableDocument;
    /**
     * → Get the first document that matches the predicate
     * @param predicate The predicate function
     */
    findOne(predicate: PredicateFunction): TableDocument;
    /**
     * → Get every documents that match the predicate
     * @param predicate The predicate function
     */
    findMany(predicate: PredicateFunction): TableDocument[];
    /**
     * → Create a document
     * @param data The document's data
     */
    createOne(data: object): TableDocument;
    /**
     * → Create many documents
     * @param data An array of each document's data
     */
    createMany(...data: object[]): TableDocument[];
    /**
     * → Delete a document
     * @param documentId The document's id
     */
    deleteOne(documentId: string): TableDocument;
    /**
     * → Delete many documents
     * @param documentIds An array of each document's id
     */
    deleteMany(...documentIds: string[]): TableDocument[];
    /**
     * → Update a document
     * @param documentId The document's id
     * @param data The data you want to update
     */
    update(documentId: string, data: object): TableDocument;
    /**
     * → Increment a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to increment
     * @param value The value you want to increment the property by (default: 1)
     */
    increment(documentId: string, propertyKey: string, value?: number): TableDocument;
    /**
     * → Decrement a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to decrement
     * @param value The value you want to decrement the property by (default: 1)
     */
    decrement(documentId: string, propertyKey: string, value?: number): TableDocument;
    /**
     * → Multiply a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to multiply
     * @param value The value you want to multiply the property by
     */
    multiply(documentId: string, propertyKey: string, value: number): TableDocument;
    /**
     * → Divide a document's property
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to divide
     * @param value The value you want to divide the property by
     */
    divide(documentId: string, propertyKey: string, value: number): TableDocument;
    /**
     * → Delete a document's property
     * @param documentId The document's id
     * @param key The key of the property you want to delete
     */
    deleteProperty(documentId: string, key: string): TableDocument;
    /**
     * → Push an item into a document's property (which is an array)
     * @param documentId The document's id
     * @param propertyKey The key of the property you want to push the value to
     * @param value The value you want to push into the property
     */
    push(documentId: string, propertyKey: string, value: any): TableDocument;
}
export {};

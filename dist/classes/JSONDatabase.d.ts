import DatabaseTable from './DatabaseTable';
export default class JSONDatabase {
    private _file;
    constructor(options: {
        filePath: string;
    });
    /**
     * → An array of each table's name
     */
    get tables(): string[];
    /**
     * → Load a table from the database
     * @param name The name of the table you want to load
     */
    table(name: string): DatabaseTable;
    /**
     * → Create a new table into the database
     * @param name The name of the table you want to create
     */
    createTable(name: string): DatabaseTable;
    /**
     * → Delete an existing table from the database
     * @param name The name of the table you want to delete
     */
    deleteTable(name: string): void;
}

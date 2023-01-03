export default class JSONFile {
    path: string;
    constructor(absolutePath: string);
    get data(): object;
    updateData(newData: object): void;
}

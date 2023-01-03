![npm version](https://img.shields.io/npm/v/swift-database?color=c80000&label=npm%20version) ![Downloads](https://img.shields.io/npm/dt/swift-database?label=Downloads)

# <center>🗃 swift-database</center>

> `swift-database` is a module that allows you to interact easily with your local JSON file.

## 🔰 Getting started

1. Install the module

```
 npm install swift-database
```

2. Initialize the database class

```javascript
const { default: JSONDatabase } = require('swift-database');

const database = new Database({
   filePath: 'path/to/file.json'
});
```

3. Create your first table and load it

```javascript
database.createTable('users');

const users = database.table('users');
```

4. Interact with that table

```javascript
users.createOne({
   fullName: 'John Doe',
   hobbies: ['programming', 'sport']
});

const userDocument = users.findOne(
   (userDocument) => userDocument.value.fullName === 'John Doe'
);

users.deleteOne(userDocument.id);
```

## 📖 Documentation

<details>
<summary>JSONDatabase</summary>

> Represents the database.

<details>
<summary>Constructor</summary>

| Parameter |          Type          | Required | Default |      Description      |
| :-------: | :--------------------: | :------: | :-----: | :-------------------: |
| `options` | `{ filePath: string }` |    ✓     | _None_  | The database options. |

**Example :**

```javascript
const database = new JSONDatabase({
   filePath: 'path/to/file.json'
});
```

</details>

<details>
<summary>JSONDatabase.tables</summary>

> Returns an array of each table's name.

**Type:** `string[]`

</details>

<details>
<summary>JSONDatabase.table(name)</summary>

> Loads a table from the database.

| Parameter |   Type   | Required | Default |               Description               |
| :-------: | :------: | :------: | :-----: | :-------------------------------------: |
|  `name`   | `string` |    ✓     | _None_  | The name of the table you want to load. |

**Returns:** `DatabaseTable`

**Example :**

```javascript
const users = database.table('users');
```

</details>

<details>
<summary>JSONDatabase.createTable(name)</summary>

> Creates a new table into the database.

| Parameter |   Type   | Required | Default |                Description                |
| :-------: | :------: | :------: | :-----: | :---------------------------------------: |
|  `name`   | `string` |    ✓     | _None_  | The name of the table you want to create. |

**Returns:** `DatabaseTable`

**Example :**

```javascript
const users = database.createTable('users');
```

</details>

<details>
<summary>JSONDatabase.deleteTable(name)</summary>

> Delete an existing table from the database.

| Parameter |   Type   | Required | Default |                Description                |
| :-------: | :------: | :------: | :-----: | :---------------------------------------: |
|  `name`   | `string` |    ✓     | _None_  | The name of the table you want to delete. |

**Returns:** `void`

**Example :**

```javascript
database.deleteTable('users');
```

</details>

</details>

---

<details>
<summary>DatabaseTable</summary>

> Represents a database table.

<details>
<summary>DatabaseTable.size</summary>

> Returns the amount of documents inside the table.

**Type:** `number`

</details>

<details>
<summary>DatabaseTable.all</summary>

> Returns an array of every table documents.

**Type:** `TableDocument[]`

</details>

<details>
<summary>DatabaseTable.getById(documentId)</summary>

> Returns the table document that matches the specified id.

|  Parameter   |   Type   | Required | Default |               Description               |
| :----------: | :------: | :------: | :-----: | :-------------------------------------: |
| `documentId` | `string` |    ✓     | _None_  | The id of the document you want to get. |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

const userDocument = users.getById(DOCUMENT_ID);
```

</details>

<details>
<summary>DatabaseTable.findOne(predicate)</summary>

> Returns the first table document that matches the predicate.

|  Parameter  |        Type         | Required | Default |                         Description                         |
| :---------: | :-----------------: | :------: | :-----: | :---------------------------------------------------------: |
| `predicate` | `PredicateFunction` |    ✓     | _None_  | The predicate function you want to filter the documents by. |

💡 `PredicateFunction` = `(document: TableDocument, index: number, table: object[]) => boolean`

**Returns:** `TableDocument`

**Example :**

```javascript
const userDocument = users.findOne(
   (userDocument) => userDocument.value.fullName === 'John Doe'
);
```

</details>

<details>
<summary>DatabaseTable.findMany(predicate)</summary>

> Returns every documents that match the predicate.

|  Parameter  |        Type         | Required | Default |                         Description                         |
| :---------: | :-----------------: | :------: | :-----: | :---------------------------------------------------------: |
| `predicate` | `PredicateFunction` |    ✓     | _None_  | The predicate function you want to filter the documents by. |

💡 `PredicateFunction` = `(document: TableDocument, index: number, table: object[]) => boolean`

**Returns:** `TableDocument[]`

**Example :**

```javascript
const userDocuments = users.findMany((userDocument) =>
   userDocument.value.hobbies.includes('programming')
);
```

</details>

<details>
<summary>DatabaseTable.createOne(data)</summary>

> Creates a new table document and returns it.

| Parameter |   Type   | Required | Default |     Description      |
| :-------: | :------: | :------: | :-----: | :------------------: |
|  `data`   | `object` |    ✓     | _None_  | The document's data. |

**Returns:** `TableDocument`

**Example :**

```javascript
const createdUserDocument = users.createOne({
   fullName: 'John Doe',
   hobbies: ['programming', 'sport']
});
```

</details>

<details>
<summary>DatabaseTable.createMany(...data)</summary>

> Creates many table documents and returns them.

| Parameter |    Type    | Required | Default |            Description            |
| :-------: | :--------: | :------: | :-----: | :-------------------------------: |
|  `data`   | `object[]` |    ✓     | _None_  | An array of each document's data. |

**Returns:** `TableDocument[]`

**Example :**

```javascript
const createdUserDocuments = users.createMany(
   {
      fullName: 'John Doe',
      hobbies: ['programming', 'sport']
   },
   {
      fullName: 'Alice Doe',
      hobbies: ['studying', 'videogames']
   }
);
```

</details>

<details>
<summary>DatabaseTable.deleteOne(documentId)</summary>

> Deletes a table document.

|  Parameter   |   Type   | Required | Default |                Description                 |
| :----------: | :------: | :------: | :-----: | :----------------------------------------: |
| `documentId` | `string` |    ✓     | _None_  | The id of the document you want to delete. |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

const deletedUserDocument = users.deleteOne(DOCUMENT_ID);
```

</details>

<details>
<summary>DatabaseTable.deleteMany(...documentIds)</summary>

> Deletes many table documents.

|   Parameter   |    Type    | Required | Default |                    Description                     |
| :-----------: | :--------: | :------: | :-----: | :------------------------------------------------: |
| `documentIds` | `string[]` |    ✓     | _None_  | An array of each document's id you want to delete. |

**Returns:** `TableDocument[]`

**Example :**

```javascript
const DOCUMENT_IDS = [
   '0557f4db-5688-4d99-8f85-a83605cf8c1e',
   '2fe5a45e-1ffe-47ba-ab14-ac94ee26ec68'
];

const deletedUserDocuments = users.deleteMany(DOCUMENT_IDS);
```

</details>

<details>
<summary>DatabaseTable.update(documentId, data)</summary>

> Updates a table document.

|  Parameter   |   Type   | Required | Default |                Description                 |
| :----------: | :------: | :------: | :-----: | :----------------------------------------: |
| `documentId` | `string` |    ✓     | _None_  | The id of the document you want to update. |
|    `data`    | `object` |    ✓     | _None_  |        The data you want to update.        |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

// Before: TableDocument { id: ..., value: { fullName: 'Alice Doe', ... } }
const updatedUserDocument = users.update(DOCUMENT_ID, {
   fullName: 'Alice Dart'
});
// After: TableDocument { id: ..., value: { fullName: 'Alice Dart', ... } }
```

</details>

<details>
<summary>DatabaseTable.increment(documentId, propertyKey, value)</summary>

> Increments a document's property.

|   Parameter   |   Type   | Required | Default |                     Description                     |
| :-----------: | :------: | :------: | :-----: | :-------------------------------------------------: |
| `documentId`  | `string` |    ✓     | _None_  | The id of the document you want to make changes on. |
| `propertyKey` | `string` |    ✓     | _None_  |   The key of the property you want to increment.    |
|    `value`    | `string` |    X     |   `1`   |  The value you want to increment the property by.   |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

// Before: TableDocument { id: ..., value: { age: 21, ... } }
const updatedUserDocument = users.increment(DOCUMENT_ID, 'age');
// After: TableDocument { id: ..., value: { age: 22, ... } }
```

</details>

<details>
<summary>DatabaseTable.decrement(documentId, propertyKey, value)</summary>

> Decrements a document's property.

|   Parameter   |   Type   | Required | Default |                     Description                     |
| :-----------: | :------: | :------: | :-----: | :-------------------------------------------------: |
| `documentId`  | `string` |    ✓     | _None_  | The id of the document you want to make changes on. |
| `propertyKey` | `string` |    ✓     | _None_  |   The key of the property you want to decrement.    |
|    `value`    | `string` |    X     |   `1`   |  The value you want to decrement the property by.   |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

// Before: TableDocument: { id: ..., value: { lives: 3, ... } }
const updatedUserDocument = users.decrement(DOCUMENT_ID, 'lives');
// After: TableDocument: { id: ..., value: { lives: 2, ... } }
```

</details>

<details>
<summary>DatabaseTable.multiply(documentId, propertyKey, value)</summary>

> Multiplies a document's property.

|   Parameter   |   Type   | Required | Default |                     Description                     |
| :-----------: | :------: | :------: | :-----: | :-------------------------------------------------: |
| `documentId`  | `string` |    ✓     | _None_  | The id of the document you want to make changes on. |
| `propertyKey` | `string` |    ✓     | _None_  |    The key of the property you want to multiply.    |
|    `value`    | `string` |    ✓     | _None_  |   The value you want to multiply the property by.   |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

// Before: TableDocument: { id: ..., value: { chances: 10, ... } }
const updatedUserDocument = users.multiply(DOCUMENT_ID, 'chances', 1.5);
// After: TableDocument: { id: ..., value: { chances: 15, ... } }
```

</details>

<details>
<summary>DatabaseTable.divide(documentId, propertyKey, value)</summary>

> Divides a document's property.

|   Parameter   |   Type   | Required | Default |                     Description                     |
| :-----------: | :------: | :------: | :-----: | :-------------------------------------------------: |
| `documentId`  | `string` |    ✓     | _None_  | The id of the document you want to make changes on. |
| `propertyKey` | `string` |    ✓     | _None_  |     The key of the property you want to divide.     |
|    `value`    | `string` |    ✓     | _None_  |    The value you want to divide the property by.    |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

// Before: TableDocument: { id: ..., value: { chances: 10, ... } }
const updatedUserDocument = users.divide(DOCUMENT_ID, 'chances', 2);
// Before: TableDocument: { id: ..., value: { chances: 5, ... } }
```

</details>

<details>
<summary>DatabaseTable.deleteProperty(documentId, key)</summary>

> Deletes a document's property.

|  Parameter   |   Type   | Required | Default |                     Description                     |
| :----------: | :------: | :------: | :-----: | :-------------------------------------------------: |
| `documentId` | `string` |    ✓     | _None_  | The id of the document you want to make changes on. |
|    `key`     | `string` |    ✓     | _None_  |     The key of the property you want to delete.     |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

// Before: TableDocument: { id: ..., value: { fullName: 'John Doe', age: 21 } }
const updatedUserDocument = users.deleteProperty(DOCUMENT_ID, 'fullName');
// Before: TableDocument: { id: ..., value: { age: 21 } }
```

</details>

<details>
<summary>DatabaseTable.push(documentId, propertyKey, ...items)</summary>

> Pushes items into an array document's property;

|   Parameter   |   Type   | Required | Default |                         Description                         |
| :-----------: | :------: | :------: | :-----: | :---------------------------------------------------------: |
| `documentId`  | `string` |    ✓     | _None_  |     The id of the document you want to make changes on.     |
| `propertyKey` | `string` |    ✓     | _None_  | The key to the array property you want to push the item to. |
|    `items`    | `any[]`  |    ✓     | _None_  |         The items you want to push into the array.          |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

// Before: TableDocument: { id: ..., value: { hobbies: ['programming'], ... } }
const updatedUserDocument = users.push(DOCUMENT_ID, 'hobbies', 'tennis');
// Before: TableDocument: { id: ..., value: { hobbies: ['programming', 'tennis'], ... } }
```

</details>
</details>

---

<details>
<summary>TableDocument</summary>

> Represents a table document.

<details>
<summary>TableDocument.id</summary>

> Returns the document's id.

**Type:** `string`

</details>

<details>
<summary>TableDocument.value</summary>

> Returns the document's data.

**Type:** `object`

</details>
</details>

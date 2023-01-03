![npm version](https://img.shields.io/npm/v/db.json?color=c80000&label=npm%20version) ![Downloads](https://img.shields.io/npm/dt/db.json?label=Downloads)

# <center>🗃 db.json</center>

> `db.json` is a module that allows you to interact easily with your local JSON file.

## 🔰 Getting started

1. Install the module

```
 npm install db.json
```

2. Initialize the database class

```javascript
const { default: JSONDatabase } = require('db.json');

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

### JSONDatabase

> Represents the database.

#### Constructor

| Parameter |          Type          | Required | Default |      Description      |
| :-------: | :--------------------: | :------: | :-----: | :-------------------: |
| `options` | `{ filePath: string }` |    ✓     | _None_  | The database options. |

**Example :**

```javascript
const database = new JSONDatabase({
   filePath: 'path/to/file.json'
});
```

---

### JSONDatabase.tables

> Returns an array of each table's name.

**Type:** `string[]`

---

### JSONDatabase.table(name)

> Loads a table from the database.

| Parameter |   Type   | Required | Default |               Description               |
| :-------: | :------: | :------: | :-----: | :-------------------------------------: |
|  `name`   | `string` |    ✓     | _None_  | The name of the table you want to load. |

**Returns:** `DatabaseTable`

**Example :**

```javascript
const users = database.table('users');
```

---

### JSONDatabase.createTable(name)

> Creates a new table into the database.

| Parameter |   Type   | Required | Default |                Description                |
| :-------: | :------: | :------: | :-----: | :---------------------------------------: |
|  `name`   | `string` |    ✓     | _None_  | The name of the table you want to create. |

**Returns:** `DatabaseTable`

**Example :**

```javascript
const users = database.createTable('users');
```

---

### JSONDatabase.deleteTable(name)

> Delete an existing table from the database.

| Parameter |   Type   | Required | Default |                Description                |
| :-------: | :------: | :------: | :-----: | :---------------------------------------: |
|  `name`   | `string` |    ✓     | _None_  | The name of the table you want to delete. |

**Returns:** `void`

**Example :**

```javascript
database.deleteTable('users');
```

---

### DatabaseTable

> Represents a database table.

---

### DatabaseTable.size

> Returns the amount of documents inside the table.

**Type:** `number`

---

### DatabaseTable.all

> Returns an array of every table documents.

**Type:** `TableDocument[]`

---

### DatabaseTable.getById(documentId)

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

---

### DatabaseTable.findOne(predicate)

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

### DatabaseTable.findMany(predicate)

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

---

### DatabaseTable.createOne(data)

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

---

### DatabaseTable.createMany(...data)

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

---

### DatabaseTable.deleteOne(documentId)

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

---

### DatabaseTable.deleteMany(...documentIds)

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

---

### DatabaseTable.update(documentId, data)

> Updates a table document.

|  Parameter   |   Type   | Required | Default |                Description                 |
| :----------: | :------: | :------: | :-----: | :----------------------------------------: |
| `documentId` | `string` |    ✓     | _None_  | The id of the document you want to update. |
|    `data`    | `object` |    ✓     | _None_  |        The data you want to update.        |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

const updatedUserDocument = users.update(DOCUMENT_ID, {
   fullName: 'Alice Dart'
});
```

---

### DatabaseTable.increment(documentId, propertyKey, value)

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

const updatedUserDocument = users.increment(DOCUMENT_ID, 'age');
```

---

### DatabaseTable.decrement(documentId, propertyKey, value)

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

const updatedUserDocument = users.decrement(DOCUMENT_ID, 'lives');
```

---

### DatabaseTable.multiply(documentId, propertyKey, value)

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

const updatedUserDocument = users.multiply(DOCUMENT_ID, 'chances', 1.5);
```

---

### DatabaseTable.divide(documentId, propertyKey, value)

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

const updatedUserDocument = users.divide(DOCUMENT_ID, 'chances', 2);
```

---

### DatabaseTable.deleteProperty(documentId, key)

> Deletes a document's property.

|  Parameter   |   Type   | Required | Default |                     Description                     |
| :----------: | :------: | :------: | :-----: | :-------------------------------------------------: |
| `documentId` | `string` |    ✓     | _None_  | The id of the document you want to make changes on. |
|    `key`     | `string` |    ✓     | _None_  |     The key of the property you want to delete.     |

**Returns:** `TableDocument`

**Example :**

```javascript
const DOCUMENT_ID = '0557f4db-5688-4d99-8f85-a83605cf8c1e';

const updatedUserDocument = users.deleteProperty(DOCUMENT_ID, 'fullName');
```

---

### DatabaseTable.push(documentId, propertyKey, ...items)

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

const updatedUserDocument = users.push(DOCUMENT_ID, 'hobbies', 'tennis');
```

---

### TableDocument

> Represents a table document.

---

### TableDocument.id

> Returns the document's id.

**Type:** `string`

---

### TableDocument.value

> Returns the document's data.

**Type:** `object`

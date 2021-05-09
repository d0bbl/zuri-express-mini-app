
# Project Title

Express app with basic CRUD operations to manage your data

### Hosted link

https://zuri-data.herokuapp.com/

## API Reference

#### Get all data

```http
  GET https://zuri-data.herokuapp.com/
```



#### Create data ( Raw/JSON )

```http
  POST https://zuri-data.herokuapp.com/
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.  |
| `email`      | `string` | **Required**. |
| `country`      | `string` | **Required**. |



#### Get created data

```http
  GET https://zuri-data.herokuapp.com/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `mongoId` | **Required**. Id of data to fetch data|


#### Update a created data ( Raw/JSON )

```http
  PUT https://zuri-data.herokuapp.com/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `mongoId` | **Required**. Id of data to be updated |

Request Body should contain an array of objects to be updated like so; \
 `[
     {"propName": "name", value: "newname"},
     {"propName": "email", value: "newemail@gmail.com"},
     {"propName": "country", value: "newcountry"}
 ]`

you can choose to update only one or all properties, e.g.,  
`[
     {"propName": "email", value: "newemail@gmail.com"}
 ]`

#### Delete a created data

```http
  DELETE https://zuri-data.herokuapp.com/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `mongoId` | **Required**. Id of data to be deleted |







## License

[MIT](https://choosealicense.com/licenses/mit/)


## Run Locally

Clone the project

```bash
  git clone https://github.com/dobbleXg/zuri-express-mini-app
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server in dev mode

```bash
  npm run dev
```

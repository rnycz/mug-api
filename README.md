# MUG API

Recruitment task

## How to start the project

Clone the project to the selected location

```bash
    git clone https://github.com/rnycz/mug-api.git
```

Go to the project directory

```bash
    cd mug-api
```

Install necessary dependencies

```bash
    npm install
```

Start the server

```bash
    nodemon
```

In your browser go to

```bash
    http://localhost:8000
```

## API Reference

#### Get all products

```http
  GET /product/get
```

#### Get product

```http
  GET /product/get/:productId
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `productId` | `string` | **Required**. Id of item to fetch |

#### Create product

```http
  POST /product/create
```

| Request body | Type     | Description                                |
| :----------- | :------- | :----------------------------------------- |
| `name`       | `string` | **Required, max length 100**. Product name |
| `price`      | `Number` | **Required**. Product price                |

#### Update product

```http
  PUT /product/update/:productId
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `productId` | `string` | **Required**. Id of item to update |

**Request body same as in 'create product'**

#### Delete product

```http
  DELETE /product/delete/:productId
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `productId` | `string` | **Required**. Id of item to delete |

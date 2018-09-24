# Koa and Apollo for Backend

Minimal example to understand

### Setup

```sh
$ yarn install
```

### Start 

```sh
yarn start
```

### Query Examples

```
# Get current date
query {
  _currentDate
}
```

```
# Get all users
query {
  allUsers {
    _id
    name
    createdAt
    updatedAt
  }
}
```

### Mutation Examples

```
# Create a User
mutation {
  createUser(fields: { name: "Gary" }) {
    _id
    name
  }
}
```


### Subscription Examples

```
# Read User events
subscription {
  watchUsers {
    _id
    name
    createdAt
    updatedAt
  }
}
```
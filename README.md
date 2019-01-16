# Intra42-fetch

This is a little package which wrap node-fetch to request the api 42's api.

## How to use it ?

```
const Intra42 = require('intra42-fetch')

// Instantiate the Intra42 class and provide your id and secret.

const intra42 = new Intra42(id, secret)

// Intra42.fetch is just a pre-applyed fetch with your token, use it like the fetch API

intra42.fetch('/v2/users')
  .then(json => console.log(json)) // Response.json is used so you'll get json automatically
  .catch(err => console.log(err)) // if the parsing failed the handle the error
```

# Intra42-fetch

This is a little package which wrap node-fetch for request the api of the 42 school.

## How to use it ?

```
const Intra42 = require('intra42-fetch')

// Instantiate the Intra42 class and provide your id and secret.

const intra42 = new Intra42({
  id: 'your beautiful id',
  secret: 'and your secret'
})

// Intra42.fetch is just a pre-applyed fetch with your token, use it like the fetch API

intra42.fetch('/v2/users')
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err))
```

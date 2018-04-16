const nfetch = require('node-fetch')
const fetch = settings => endpoint => params =>
  nfetch(settings.baseURL ? `${settings.baseURL}${endpoint}` : endpoint, {...settings, ...params})

const oauth = require('oauth2-wrapper')

class Intra42 {
  constructor ({id, secret} = {}) {
    const intra42Oauth = oauth.create({
      client: {
        id,
        secret
      },
      auth: {
        tokenHost: 'https://api.intra.42.fr'
      }
    })
    this.getToken = new Promise((resolve, reject) => {
      intra42Oauth.clientCredentials.getToken()
        .then(token => {
          resolve(token)
        })
        .catch(err => reject(new Error('Error getting token')))
    })
    this.getFetch = new Promise((resolve, reject) => {
      this.getToken.then(token => {
        resolve(fetch({
          baseURL: 'https://api.intra.42.fr',
          headers: {
            Authorization: `Bearer ${token.access_token}`
          }
        }))
      }).catch(err => reject(err))
    })
  }
  showToken () {
    this.getToken
      .then(token => console.log(token))
      .catch(err => console.log(err))
  }
  fetch (endpoint, params = {}) {
    return this.getFetch
      .then(ifetch => ifetch(endpoint)(params))
      .catch(err => console.log(err))
  }
}

module.exports = Intra42
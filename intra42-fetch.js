const nfetch = require('node-fetch')
const oauth = require('oauth2-wrapper')

class Intra42Client {
  constructor (id, secret) {
    if (!id || !secret) throw new Error('Intra42Client need two parameters, `id` and `secret`')
    this.oauthClient = oauth.create({
      client: { id, secret },
      auth: { tokenHost: 'https://api.intra.42.fr' }
    })
  }

  getToken () {
    return this.oauthClient.clientCredentials.getToken()
  }

  fetch (url, {headers, ...options} = {}) {
    const newHeaders = token => ({...headers, Authorization: `Bearer ${token.access_token}`})
    return this.getToken()
      .then(token => {
        const opts = { headers: newHeaders(token), ...options }
        return nfetch(`https://api.intra.42.fr${url}`, opts)
      })
  },
  fetchJSON (...a) {
    return this.fetch(...a)
  }
}

module.exports = Intra42Client

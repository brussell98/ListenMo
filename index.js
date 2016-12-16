const axios = require('axios');

axios.defaults.baseURL = 'https://listen.moe/api/';
axios.defaults.headers.common['User-Agent'] = 'ListenMo (v' + require('../package.json').version + ', https://github.com/brussell98/ListenMo)';

class ListenMo {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.token = null;
        this.socket = null;
    }

    _request(method, url, data = {}, requireAuth = false) {
        return new Promise((resolve, reject) => {
            if (requireAuth === true)
                data['authorization'] = this.token;
            axios({ method, url, data }).then(response => {
                if (response.data.success === false)
                    return reject(response.data.message);
                resolve(response.data);
            }).catch(error => {
                reject(error.response ? error.response.data : error.message);
            });
        });
    }

    authenticate(username, password) {
        return this._request('post', 'authenticate', { username, password }).then(data => {
            this.token = data.token;
            return token;
        });
    }

    getUser() {
        return this._request('get', 'user', {}, true);
    }

    getFavorites() {
        return this._request('get', 'user/favorties', {}, true);
    }

    favoriteSong(song) {
        return this._request('post', 'songs/favorite', { song }, true);
    }

    requestSong(song) {
        return this._request('post', 'songs/request', { song }, true);
    }

    openSocket(shouldAuth = false) {
        if (this.socket)
            return this.socket;

        try {
            let Socket = require('./Socket.js');
        } catch (e) {
            throw new Error(e);
        }
        this.socket = new Socket();
        this.socket.connect(shouldAuth ? this.token : null).then(resolve).catch(reject);
        return this.socket;
    }
}

module.exports = ListenMo;

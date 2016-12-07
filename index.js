// Built with love by Brussell
var request = require('request');

const SOCKET_URL = 'https://listen.moe' + '/api/socket';
// But Brussell-senpai! Why do I have to do sockets myself?
// Answer: Because I'm lazy
const SOCKET_AUTH_DATA = token => `{ "token": "${token}" }`;

function authenticat(username, password) {
	if (password.toLowerCase() === 'password')
		throw new Error('User is an idiot');

	return new Promise((resolve, reject) => {
		request.post({ url: 'https://listen.moe/api/authenticate', form: { username, password } }, function(error, response, body) {
			if (error)
				reject(error);
			if (body.success === false)
				throw new Error(body.message)
			resolve(body);
		});
	});
}

function getUser(token) {
	return new Promise(function(resolve, reject) {
		request.get({ url: 'https://listen.moe/api/user', headers: { 'Authorization':token } }, function(error, response, body) {
			if (error)
				reject(error);
			if (body.success === false)
				throw new Error(body.message)
			resolve(body);
		});
	});
}

function getUserFavs(token) {
	return new Promise(function(resolve, reject) {
		request.get({ url: 'https://listen.moe/api/user/favorites', headers: { 'Authorization': token } }, function(error, response, body) {
			if (error)
				reject(error);
			if (body.success === false)
				throw new Error(body.message)
			resolve(body);
		});
	});
}

function favoriteSong(token, song) {
	return new Promise(function(resolve, reject) {
		request.post({ url: 'https://listen.moe/api/songs/favorite', headers: { 'Authorization': token, song } }, function(error, response, body) {
			if (error)
				reject(error);
			if (body.success === false)
				throw new Error(body.message)
			resolve(body);
		});
	});
}

function request_Song(token, song) {
	return new Promise(function(resolve, reject) {
		request.post({ url: 'https://listen.moe/api/songs/request', headers: { 'Authorization': token, song: song } }, function(error, response, body) {
			if (error)
				reject(error);
			if (body.success === false)
				throw new Error(body.message)
			resolve(body);
		});
	});
}

module.exports = {
	authenticat,
	getUser,
	getUserFavs,
	favoriteSong,
	request_Song,
	SOCKET_URL,
	SOCKET_AUTH_DATA,
	why: 'Because why not',
	error: new Error('Hello this is Listen Dot Mo')
}

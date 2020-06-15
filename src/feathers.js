//import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import axios from 'axios'

const rest = feathers.rest;
// const host = 'http://localhost:3033'
const host = 'http://api.7debate.club:3033'
const client = feathers();

// client.configure(feathers.socketio(socket));
client.configure(rest(host).axios(axios))

client.configure(feathers.authentication({
  storage: window.localStorage
}));

export default client;
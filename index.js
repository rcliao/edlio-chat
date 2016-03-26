'use strict';

const express = require('express');
const sio = require('socket.io');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

/** Simple model definition **/
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    username: String,
    message: String,
    timestamp: Date
});
const Message = mongoose.model('Message', MessageSchema);

/** Mongoose connection **/
// set up connection to mongoDB
mongoose.connect(
    'mongodb://mongo/edlioChat',
    {
        server: {
            socketOptions: {
                connectTimeoeutMS: 10000,
                keepAlive: 1
            }
        }
    }
);

mongoose.connection.once('open', function() {
    console.log(`Connected to MongoDB`);
});
mongoose.connection.on('error', function() {
    console.log(`Error happened in connection to MongoDB`);
});

/** express server **/
const app = express();
app.use(express.static('public'));
const server = app.listen('3000');

/** Socket.io **/
const io = sio(server);

io.on('connection', socket => {
    Message.find()
        .limit(50)
        .sort({timestamp: -1})
        .then(msgs => {
            socket.emit('messages', msgs);
        })
        .catch(err => socket.emit('message', err));

    socket.on('message', msg => {
        const newMsg = new Message({
            username: msg.username,
            message: msg.message
        });

        newMsg.save();

        io.emit('message', newMsg);
    });
});

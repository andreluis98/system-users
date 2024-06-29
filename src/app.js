// app.js
const express = require('express');
const UserRepository = require('./userRepository');
const { MongoClient } = require('mongodb');
const mongo = require('mongodb');

const app = express();
app.use(express.json());

let client;

const isValidObjectId = (id) => {
    return mongo.ObjectId.isValid(id) && new mongo.ObjectId(id).toString() === id;
};

const createRepository = () => {
    const dsn = 'mongodb://root:root@localhost/?retryWrites=true&writeConcern=majority';
    client = new MongoClient(dsn);
    const collection = client.db('users_db').collection('users');
    return new UserRepository(collection);
};

// listar os usuarios (R - read)
app.get('/users', async (req, res) => {
    const repository = await createRepository();
    await client.connect();
    const users = await repository.findAll();
    res.json(users);
    client.close();
});

//Detalhar um usuario (R - Read)
app.get('/users/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(404).json({ error: 404, message: 'UserNotFound' });
        return;
    }

    const repository = await createRepository();
    await client.connect();
    const user = await repository.find(req.params.id);
    if (!user) {
        res.status(404).json({
            error: 404,
            message: 'UserNotFound'
        });
    } else {
        const { _id, name, email } = user;
        res.json({ _id, name, email });
    }
    client.close();
});

//Cadastrar um novo usuario (C- Create)
app.post('/users', async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(406).send({
            error: 406,
            message: 'ContentTypeNotSupported'
        });
        return;
    }

    const user = req.body;
    const repository = await createRepository();
    await client.connect();
    await repository.create(user);
    res.status(201).json(user);
    client.close();
});

//Editar um usuario (U - Update)
app.put('/users/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(404).json({ error: 404, message: 'UserNotFound' });
        return;
    }
    const repository = await createRepository();
    await client.connect();
    const user = await repository.update(req.params.id, req.body);
    if (user.modifiedCount === 0) {
        res.status(404).json({
            error: 404,
            message: 'UserNotFound'
        });
    } else {
        res.json(user);
    }
    client.close();
});

//Remover um usuario (D - Delete)
app.delete('/users/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(404).json({ error: 404, message: 'UserNotFound' });
        return;
    }
    const repository = await createRepository();
    await client.connect();
    const result = await repository.delete(req.params.id);
    if (result.deletedCount === 0) {
        res.status(404).json({
            error: 404,
            message: 'UserNotFound'
        });
    } else {
        res.status(204).send();
    }
    client.close();
});

module.exports = app;

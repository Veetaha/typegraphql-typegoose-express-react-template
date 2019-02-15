import Express from 'express';

export const router = Express.Router()
    .get('/hello-world', (_req, res) => {
        res.json({ hello: 'world' });
    });

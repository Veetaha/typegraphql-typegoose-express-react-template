import Express from 'express';

export const apiRouter = Express.Router()
    .get('/hello-world', (_req, res) => {
        res.json({ hello: 'world' });
    });

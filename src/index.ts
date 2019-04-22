import * as helmet from 'helmet';
import * as express from 'express';
import {join} from 'path';

import fileRoutes from './file-routes';
import loginRoute, {loginMiddleware} from './login-route';

const Server = express();
// MIDDLEWARE
Server.use(helmet());
Server.use(express.static(join(__dirname, '../')))
// route-middleware
Server.use('/api/files/', loginMiddleware, fileRoutes);
Server.use('/login', loginRoute)
// final-middleware
Server.use('*', (req, res) => res.sendFile(join(__dirname, '../index.html')))

// Start Server and classic error handler
// process.env.PORT complains about being a string if it's undefined so parseInt it is..
const port:number = parseInt(process.env.PORT) ||  3000;
const liveServer = Server.listen(port, () => console.log('Server up on port:', port));

process.on('uncaughtException', (err) => {
  console.log('exiting on error:', err);
  liveServer.close(() => process.exit(1));
});
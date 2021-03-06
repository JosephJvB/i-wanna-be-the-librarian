import * as helmet from 'helmet';
import * as express from 'express';
import {join} from 'path';

import fileRoutes, {envProtection} from './file-routes';

const Server = express();
// MIDDLEWARE
Server.use(helmet());
Server.use(express.static(join(__dirname, '../dist-client')))
// route-middleware
Server.use('/api/files/', envProtection, fileRoutes);
// final-middleware
Server.use('*', (req, res) => res.sendFile(join(__dirname, '../dist-client/index.html')))

// dunno some boilerplate error middleware.
Server.use((err, req, res, next) => {
  // err.message is raw string
  console.error(`
    --- ERROR LOGGER ---\n
    ${err}\n
    --- END ERROR ---
  `);
  // respond 500 if no error response already sent.
  if(!res.headersSent) {
    res.status(500).send(err);
  }
});

// Start Server and classic error handler
// process.env.PORT complains about being a string if it's undefined so parseInt it is..
const port = process.env.PORT ||  3000;
const liveServer = Server.listen(port, () => console.log('Server up on port:', port));

process.on('uncaughtException', (err) => {
  console.log('exiting on error:', err);
  liveServer.close(() => process.exit(1));
});
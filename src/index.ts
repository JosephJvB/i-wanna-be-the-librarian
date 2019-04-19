// Require these since importing them means adding an @types/ to dev-deps
const helmet = require('helmet');
const express = require('express');
const Server = express();

import FileService from './File-Service';
const files = new FileService();


Server.use(helmet());
Server.use(express.json());

// Register routes
Server.get('/api/v1/all-files-meta', async (req, res): Promise<void> => {
  try {
    // doesnt validate that result-data is an array of FileMetaData models
    const data = await files.readMetaJson();
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Error reading file meta data'});
  }
});

Server.post('/api/v1/save-file', async (req, res): Promise<void> => {
  
});

// Start Server and classic error handler
// process.env.PORT complains about being a string if it's undefined so parseInt it is..
const port:number = parseInt(process.env.PORT) ||  3000;
const liveServer = Server.listen(port, ():void => console.log('Server up on port:', port));

process.on('uncaughtException', (err):void => {
  console.log('exiting on error:', err);
  liveServer.close(():void => process.exit(1));
});
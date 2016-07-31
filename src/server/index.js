import Express from 'express';

import config from 'app/config';

import placesHandler from 'server/handlers/places';
import placeHandler from 'server/handlers/place';
import newPostHandler from 'server/handlers/post';
import mainMiddleware from 'server/middleware/main';


const app = new Express();

// Serve static files
app.use('/dist', Express.static('dist'));

app.get('/api/places', placesHandler);
app.get('/api/places/:id', placeHandler);
app.post('/api/places/:id/post', newPostHandler);

// Serve using the React App
app.use(mainMiddleware);

app.listen(config.port + (__DEVELOPMENT__ ? 1 : 0));

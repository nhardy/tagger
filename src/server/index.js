import Express from 'express';

import config from 'app/config';
import placesHandler from 'server/handlers/places';
import placeHandler from 'server/handlers/place';
import mainMiddleware from 'server/middleware/main';


const app = new Express();

// Serve static files
app.use('/dist', Express.static('dist'));

app.use('/api/places', placesHandler);
app.use('/api/places/:id', placeHandler);

// Serve using the React App
app.use(mainMiddleware);

app.listen(config.port + (__DEVELOPMENT__ ? 1 : 0));

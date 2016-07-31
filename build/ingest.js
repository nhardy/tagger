import gulp from 'gulp';
import r from 'rethinkdb';
import reql from '../src/server/db/rethinkdb';


const data = [
  {
    id: 1,
    name: 'Macquarie Place Park',
    lat: 151.21010174676724,
    lon: -33.86322212866611,
    posts: [
    ],
  },
  {
    id: 2,
    name: 'Gallipoli Memorial Club',
    lat: 151.21059675565937,
    lon: -33.86280262337573,
    posts: [
    ],
  },
  {
    id: 3,
    name: 'Custom House',
    lat: 151.21087616290959,
    lon: -33.86225692317788,
    posts: [
    ],
  },
  {
    id: 4,
    name: 'Museum of Sydney',
    lat: 151.21141379552557,
    lon: -33.863786966960845,
    posts: [
    ],
  },
  {
    id: 5,
    name: 'Jessie Street Gardens',
    lat: 151.2102487829278,
    lon: -33.86223983783242,
    posts: [
    ],
  },
  {
    id: 6,
    name: 'Circular Quay',
    lat: 151.21090008777162,
    lon: -33.86110806367168,
    posts: [
    ],
  },
  {
    id: 7,
    name: 'Sydney Opera House',
    lat: 151.2153563241543,
    lon: -33.85652025399361,
    posts: [
    ],
  },
];

gulp.task('ingest', async (done) => {
  try {
    await reql(r.dbDrop('tagger'));
    console.log('Dropped table');
    await reql(r.dbCreate('tagger'));
    console.log('Created database');
    await reql(r.db('tagger').tableCreate('places'));
    console.log('Created table');
    await Promise.all(data.map(poi => reql(r.db('tagger').table('places').insert(poi))));
    console.log('Successfully added all records');
    done();
  } catch (e) {
    console.log(e);
  }
});


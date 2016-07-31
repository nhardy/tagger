import r from 'rethinkdb';
import reql from 'server/db/rethinkdb';


export default function placesHandler(req, res) {
  const latitude = parseFloat(req.query.lat);
  const longitude = parseFloat(req.query.lon);

  reql(r.db('tagger').table('places').filter(r.distance(r.point(r.row('lat'), r.row('lon')), r.point(longitude, latitude), { unit: 'm' }).lt(10000))).then(cursor => cursor.toArray()).then((places) => {
    res.send({
      items: places,
    });
  }).catch((err) => console.log(err));
}

import r from 'rethinkdb';
import reql from 'server/db/rethinkdb';


export default function placesHandler(req, res) {
  const latitude = req.query.lat;
  const longitude = req.query.lon;

  reql(r.db('tagger').table('places').filter(r.distance(r.point(r.row('lat'), r.row('lon')), r.point(latitude, longitude), { unit: 'm' }).lt(10000))).then((places) => {
    res.send({
      items: places,
    });
  });
}

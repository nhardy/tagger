import { first } from 'lodash';
import r from 'rethinkdb';
import reql from 'server/db/rethinkdb';


export default function placeHandler(req, res) {
  const { id } = req.params;

  reql(r.db('tagger').table('places').filter({ id })).then((places) => {
    res.send({
      item: first(places),
    });
  });
}

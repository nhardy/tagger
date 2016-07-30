import r from 'rethinkdb';
import reql from 'server/db/rethinkdb';
import uuid from 'uuid';

export default function newPostHandler(req, res) {
  const {text} = req.body;
  const {id} = req.params;
  const {imgurl} = req.query;
  reql(r.db('tagger').table('places').filter({id}).update(r.row('posts').append({
    id: uuid.v4(),
    text,
    imgurl
  }));
}

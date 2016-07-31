import r from 'rethinkdb';
import reql from 'server/db/rethinkdb';
import uuid from 'uuid';

export default function newPostHandler(req, res) {
  const { imgUrl, text } = req.body;
  const { id } = req.params;
  reql(r.db('tagger').table('places').filter({ id }).update(r.row('posts').append({
    id: uuid.v4(),
    text,
    imgUrl,
  }))).then(() => {
    res.send({ success: true });
  });
}

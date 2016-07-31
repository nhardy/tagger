import r from 'rethinkdb';
import reql from 'server/db/rethinkdb';


export default function postHandler(req, res) {
  const { id } = req.params;
  const postId = req.query;

  reql(r.db('tagger').table('places').filter({ id }).pluck('posts').filter({ id: postId })).then((post) => {
    res.send({
      item: post,
    });
  });
}

import { first } from 'lodash';
import r from 'rethinkdb';
import reql from 'server/db/rethinkdb';


export default function postHandler(req, res) {
  const { id } = req.params;
  const postId = req.query;
 // Nathan --> No idea if this works, but i tried :P

 reql(r.db('tagger').table('places').filter({ id }).filter((place) => {
  return place("posts").contains(postId)
}).then((post) => {
  res.send({
    item: post,
  });
});
}

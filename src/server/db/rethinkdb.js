import r from 'rethinkdb';


let connected = false;
const listeners = [];
let c = null;
r.connect({ host: 'localhost' }, (err, conn) => {
  c = conn;
  connected = !err;
  let listener;
  while ((listener = listeners.pop())) { // eslint-disable-line no-cond-assign
    listener[err ? 1 : 0](err || conn);
  }
});

export default function reql(query) {
  return new Promise((resolve, reject) => { // eslint-disable-line consistent-return
    if (connected) return resolve(c);
    listeners.push([resolve, reject]);
  }).then((connection) => {
    return new Promise((resolve, reject) => {
      query.run(connection, (err, result) => { // eslint-disable-line consistent-return
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
}

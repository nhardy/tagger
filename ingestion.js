var rethink = require('rethinkdb');
const {host} = 'localhost';
const {port} = 28015;
const tableName = 'places';

// Why can't I use { { host }, { port } } ?
rethink.connect( { host: host, port: port}, function(err, conn) {
	    if (err) throw err;
	    rethink.db('tagger').tableCreate(tableName).run(connection, function(err, result) {
		    if (err) throw err;
		    console.log(JSON.stringify(result, null, 2));
		    r.table(tableName).insert([
				{
					"id": 1,
					"name": "Macquarie Place Park",
					"lat":151.21010174676724,
					"lon": -33.86322212866611, 
					"posts" : [
					]
				},
				{
					"id": 2,
					"name": "Gallipoli Memorial Club",
					"lat":151.21059675565937,
					"lon": -33.86280262337573, 
					"posts" : [
					]
				},
				{
					"id": 3,
					"name": "Custom House",
					"lat":151.21087616290959,
					"lon": -33.86225692317788, 
					"posts" : [
					]
				},
				{
					"id": 4,
					"name": "Museum of Sydney",
					"lat":151.21141379552557,
					"lon": -33.863786966960845, 
					"posts" : [
					]
				},
				{
					"id": 5,
					"name": "Jessie Street Gardens",
					"lat":151.2102487829278,
					"lon": -33.86223983783242, 
					"posts" : [
					]
				},
				{
					"id": 6,
					"name": "Circular Quay",
					"lat":151.21090008777162,
					"lon": -33.86110806367168, 
					"posts" : [
					]
				},
				{
					"id": 7,
					"name": "Sydney Opera House",
					"lat":151.2153563241543,
					"lon": -33.85652025399361, 
					"posts" : [
					]
				}
			]).run(connection, function(err, result) {
    				if (err) throw err;
				    console.log(JSON.stringify(result, null, 2));
				})
		})
})


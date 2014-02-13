module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace('/api', function() {

		server.get('/items', function(req, res) {
			var items = {
				"items": [
					{"id": 1, "name": "item A"},
					{"id": 2, "name": "item B"},
					{"id": 3, "name": "item C"},
					{"id": 4, "name": "item D"},
					{"id": 5, "name": "item D"}
				],
				"meta": {
						"total": 5
			    }
			};
			res.send(items);
		});

	});

};

var Client = require('../models/client');

exports.postClients = function(req, res) {
  var client = new Client();

  console.log("body: ", req.body);

  client.name = req.body.name;
  client.userId = req.user._id;
  // client.id = req.body.id;
  // client.secret = req.body.secret;
  client.id = Client.generateId();
  client.secret = Client.generateSecret();

  console.log(client);

  client.save(function(err) {
    if (err) {
      res.send(err);
    }

    // html response (admin view)
    if (req.accepts('text/html')) {
      res.redirect('clients/' + client._id);
      return;
    }

    // default JSON response
    res.json({ message: 'Client added.', data: client });
  });
};

exports.getClients = function(req, res) {
  Client.find({ userId: req.user._id }, function(err, clients) {
    if (err) {
      res.send(err);
    }
    
    // html response (admin view)
    if (req.accepts('text/html')) {
      res.render('clients/index', { clients: clients });
      return;
    }

    // default JSON response
    res.json(clients);    
  });
};

exports.getClient = function(req, res) {
  Client.findOne({
    userId: req.user._id,
    _id: req.params.id
  }, function(err, client) {
    if (err) {
      res.send(err);
    }

    // html response (admin view)
    if (req.accepts('text/html')) {
      res.render('clients/show', { client: client });
      return;  
    }

    // default JSON response
    res.json(client);
  });
};

exports.deleteClient = function(req, res) {
  Client.find({
    userId: req.user._id,
    _id: req.params.id
  }, function(err, client) {
    if (err) {
      res.send(err);
    }

    console.log('client deleted');
  });
};

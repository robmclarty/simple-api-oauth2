var Resource = require('../models/resource');

exports.postResources = function(req, res) {
  var resource = new Resource();

  resource.userId = req.user._id;
  resource.name = req.body.name;
  resource.type = req.body.type;
  resource.body = req.body.body;

  resource.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({
      message: 'Resource added.', 
      data: resource
    });
  });
};

exports.getResources = function(req, res) {
  Resource.find({ userId: req.user._id }, function(err, resources) {
    if (err) {
      res.send(err);
    }

    res.json(resources);
  });
};

exports.getResource = function(req, res) {
  Resource.find({ userId: req.user._id, _id: req.params.resource_id }, function(err, resource) {
    if (err) {
      res.send(err);
    }

    res.json(resource);
  });
};

exports.putResource = function(req, res) {
  Resource.update({ 
    userId: req.user._id, 
    _id: req.params.resource_id 
  }, {
    name: req.body.name || resource.name,
    type: req.body.type || resource.type,
    body: req.body.body || resource.body
  }, function(err, num, raw) {
    if (err) {
      res.send(err);
    }

    res.json({ message: num + ' updated' });
  });
};

exports.deleteResource = function(req, res) {
  Resource.remove({ userId: req.user._id, _id: req.params.resource_id }, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Resource deleted.' });
  });
};

const activity = require("../models").activity;

function listByUser(req, res) {
  activity
    .findAll({
      where: {
        user_id: res.locals.user.id
      },
      order: [["updated_at", "DESC"]]
    })
    .then(data => {
      if (data) {
        res.status(200).send({
          success: true,
          activities: data
        });
      } else {
        res.status(200).send({
          success: false,
          activities: null
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: `Error al buscar: ${error}`
      });
    });
}

function create(req, res) {
  var request = {
    user_id: res.locals.user.id,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    date: req.body.date
  };

  activity
    .create(request)
    .then(item => res.status(201).send(item))
    .catch(error => res.status(500).send(error));
}

function getById(req, res) {
  activity
    .findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Activity Not Found"
        });
      }
      res.status(200).send(data);
    })
    .catch(error => res.status(500).send(error));
}

function update(req, res) {
  var request = {
    user_id: res.locals.user.id,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    date: req.body.date
  };

  activity
    .findById(req.params.id)
    .then(act => {
      if (!act) {
        return res.status(404).send({
          message: "Activity Not Found"
        });
      }
      act.update(request).then(data => {
        if (data) {
          res.status(200).send({ success: true, activity: data });
        } else {
          res
            .status(422)
            .send({ success: false, message: "Error al actualizar." });
        }
      });
    })
    .catch(error => res.status(500).send(error));
}

function destroy(req, res) {
  activity
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (data) {
        res.status(204).send({
          success: true
        });
      } else {
        res.status(400).send({
          success: false
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: `Error al eliminar: ${error}`
      });
    });
}

module.exports = {
  listByUser,
  getById,
  create,
  update,
  destroy
};

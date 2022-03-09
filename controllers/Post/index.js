/**
 *   controllers Post
 **/

const Post = require("./../../models/Post");

const addPost = (req, res) => {
  const { body } = req;

  const post = new Post(body);

  post.save((err, PostStored) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Ocurrio un error del servidor",
      });
    } else {
      if (!PostStored) {
        res.status(404).send({
          status: "ERROR",
          message: "No se creo el Post",
        });
      } else {
        res.status(201).send({
          status: "OK",
          message: "Se ha creado el Post",
        });
      }
    }
  });
};

const getPost = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Post.paginate({}, options, (err, PostStored) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Ocurrio un error delñ servidor",
      });
    } else {
      if (!PostStored) {
        res.status(404).send({
          status: "ERROR",
          message: "No se creo el Post",
        });
      } else {
        res.status(201).send({
          status: "OK",
          post: PostStored,
        });
      }
    }
  });
};

const updatePost = (req, res) => {
  const postData = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Ocurrio un error delñ servidor",
      });
    } else {
      if (!postUpdate) {
        res.status(404).send({
          status: "ERROR",
          message: "No se actualizo el Post",
        });
      } else {
        res.status(201).send({
          status: "OK",
          message: "Se ha actualizado el Post",
        });
      }
    }
  });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  Post.findByIdAndRemove(id, (err, postDelete) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Ocurrio un error del servidor",
      });
    } else {
      if (!postDelete) {
        res.status(404).send({
          status: "ERROR",
          message: "No se elimino el post",
        });
      } else {
        res.status(201).send({
          status: "OK",
          message: "Se ha eliminado el post.",
        });
      }
    }
  });
};

const obtenerPost = (req, res) => {
  const { url } = req.params;

  Post.findOne({ url }, (err, postStored) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Error en el servidor",
      });
    } else {
      if (!postStored) {
        res.status(404).send({
          status: "ERROR",
          message: "no se encontro el post",
        });
      } else {
        res.status(201).send({
          status: "OK",
          message: `Se ha encontrado el Post "${postStored.title}"`,
          post: postStored,
        });
      }
    }
  });
};

module.exports = {
  addPost,
  getPost,
  updatePost,
  deletePost,
  obtenerPost,
};

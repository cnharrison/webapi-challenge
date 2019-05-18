const express = require("express");
const db = require("./data/helpers/actionModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      }
      res.status(201).json(action);
    })
    .catch(err =>
      res.status(500).send({ error: "The action could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  const { id, project_id, description, notes, completed } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      errorMessage: "Please provide name description, and notes for the action"
    });
  }
  db.insert({
    id,
    project_id,
    description,
    notes,
    completed
  })
    .then(addedAction => {
      res.status(201).json(addedAction);
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the action to the database"
      })
    );
});

router.put("/:id", async (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id && !description && !notes) {
    res.status(400).json({
      errorMessage: "Please provide either name, description, or notes for the updated action"
    });
  }
  try {
    const response = await db.update(req.params.id, req.body);
    if (response) {
      res.status(200).json(response);
    }
  } catch {
    res
      .status(404)
      .json({ error: "The post information could not be modified." });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const actionToDelete = await db.get(req.params.id);
      const count = await db.remove(req.params.id);
      if (count > 0) {
        res.status(200).json(actionToDelete);
      } else {
        res
          .status(404)
          .json({ message: "The action with the specified ID does not exist." });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    }
  });

module.exports = router;

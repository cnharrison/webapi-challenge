const express = require("express")
const db = require("./data/helpers/projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
    db.get()
      .then(projects => {
        res.json(projects);
      })
      .catch(err => res.status(500).send(err));
  });
  
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(project => {
        if (!project) {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
        res.status(201).json(project);
      })
      .catch(err =>
        res.status(500).send({ error: "The project could not be retrieved." })
      );
  });

  router.get("/actions/:id", (req, res) => {
    const { id } = req.params;
    db.getProjectActions(id)
      .then(actions => {
        if (!actions) {
          res.status(404).json({
            message: "There aren't any actions for this project."
          });
        }
        res.status(201).json(actions);
      })
      .catch(err =>
        res.status(500).send({ error: "The project actions could not be retrieved." })
      );
  });
  
  router.post("/", (req, res) => {
    const { name, description, completed} = req.body;
    if (!name || !description) {
      res.status(400).json({
        errorMessage: "Please provide name and description for the project"
      });
    }
    db.insert({
     name,
     description,
     completed
    })
      .then(addedProject => {
        res.status(201).json(addedProject);
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the project to the database"
        })
      );
  });
  
  router.put("/:id", async (req, res) => {
    const { id, name, description, completed } = req.body;
    if (!name && !description && !completed) {
      res.status(400).json({
        errorMessage: "Please provide a name or description, or completion status to update the project"
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
        .json({ error: "The project could not be modified." });
    }
  });
  
  router.delete("/:id", async (req, res) => {
      try {
        const projectToDelete = await db.get(req.params.id);
        const count = await db.remove(req.params.id);
        if (count > 0) {
          res.status(200).json(projectToDelete);
        } else {
          res
            .status(404)
            .json({ message: "The project with the specified ID does not exist." });
        }
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "The project information could not be retrieved." });
      }
    });
  

module.exports = router; 
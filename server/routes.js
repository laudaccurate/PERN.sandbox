const pool = require("./db");

module.exports = (app) => {
  app.post("/todos", async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );

      res.json(newTodo);
    } catch (error) {
      console.error(error.message);
    }
  });

  app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (error) {
      console.log(error.message);
    }
  });

  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id,
      ]);

      res.json(todo.rows[0]);
    } catch (error) {
      console.log(error.message);
    }
  });

  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;

      const updatedTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );

      res.json("Todo successfully updated");
    } catch (error) {
      console.log(error.message);
    }
  });

  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1",
        [id]
      );

      res.json("Todo was successfully deleted");
    } catch (error) {
      console.log(error.message);
    }
  });
};

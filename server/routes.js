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
};

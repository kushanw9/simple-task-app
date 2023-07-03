import express from 'express';
import mysql, {Pool} from 'promise-mysql';

const app = express();  // It creates a new Express application that represents backend web server.
const router = express.Router();  // Router - work as dispatcher servlet in spring
let pool: Pool;

initPool();
async function initPool() {
  pool= await mysql.createPool({
        host: 'localhost',
        port: 3306,
        database: 'dep10_simple_task_app',
        user: 'root',
        password: 'mysql',
        connectionLimit:5
    });
}

type Task={
    id:number,
    description:string,
    status:'COMPLETED'|'NOT_COMPLETED'
}

/*Get all tasks*/
router.get("/", async (req, res) => {
    const tasks = await pool.query('SELECT * FROM task');
    res.json(tasks);

});
router.post("/", async (req, res) => {
    const task = req.body as Task;
    if (!task.description?.trim()) {
        res.status(400);
        return
    }
    const rst=await pool.query("INSERT INTO task (description,status) VALUES (?,DEFAULT)",[task.description]);
    task.id = rst.insertId;
    task.status = 'NOT_COMPLETED';
    res.status(201).json(task);

});
router.delete("/:taskId", async (req, res) => {
    if (!req.params) {
        res.status(400);
        return;
    }
    const result = await pool.query("DELETE FROM task WHERE id=?", [req.params.taskId]);
    res.status(result.affectedRows? 204 : 404);

});

router.patch("/:taskId", async (req, res) => {
    const task = req.body as Task;
    const taskId = +req.params.taskId;
    if (!task.status) {
        res.status(400);
        return
    }
    const result = await pool.query('UPDATE task SET status=? WHERE id=?', [task.status, taskId]);

    res.status(result.affectedRows ? 204 : 404);
});


app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Sever started 8080"));

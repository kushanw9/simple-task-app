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


router.post("/", (req, res) => {


});
router.delete("/", (req, res) => {


});


app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Sever started 8080"));

import express, {json} from 'express';
import cors from 'cors'
import {router} from "./api/taskController";

const app = express();


app.use(json());
app.use(cors());




app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Sever started 8080"));

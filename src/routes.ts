import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResources from "./middleware/validateResources";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {

    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.sendStatus(200)
    })

    app.post('/api/users', validateResources(createUserSchema), createUserHandler)
}


export default routes
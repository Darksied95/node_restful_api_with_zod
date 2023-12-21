import { Express, Request, Response } from "express";
import validateResources from "./middleware/validateResources";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
function routes(app: Express) {

    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.sendStatus(200)
    })

    app.post('/api/users', validateResources(createUserSchema), createUserHandler)
    app.post('/api/sessions', validateResources(createSessionSchema), createUserSessionHandler)
    app.get("/api/sessions", getUserSessionHandler)

}


export default routes
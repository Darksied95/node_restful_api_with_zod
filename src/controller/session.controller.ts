import { Request, Response } from "express"
import { validatePassword } from "../services/user.service"
import { createSession, findSessions } from "../services/session.service"
import { signJwt } from "../utils/jwt.utils"
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body)

    if (!user) return res.status(401).send("Invalid email or password")

    const session = await createSession(user._id, req.get("user_agent") || "")

    const accessToken = signJwt(
        { ...user, session: session._id }, { expiresIn: config.get("accessTokenTtl") }
    )

    const refreshToken = signJwt(
        { ...user, session: session._id }, { expiresIn: config.get("refreshTokenTtl") }
    )

    return res.json({ accessToken, refreshToken })
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id
    const sessions = await findSessions({ user: userId, valid: true })

    return res.send(sessions)
}
import { Response, Request, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../services/session.service';


export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
    const refreshToken = get(req, "headers.x-refresh")

    if (!accessToken) return next()


    const { decoded, expired } = verifyJwt(accessToken)


    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken as string)
        console.log(3);
        console.log(newAccessToken);

        if (!newAccessToken) {
            return next()
        }

        res.setHeader("x-access-token", newAccessToken)

        const result = verifyJwt(newAccessToken)

        res.locals.user = result.decoded
        console.log(4);

        return next()
    }

    return next()
} 

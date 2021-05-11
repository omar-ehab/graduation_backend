import JWT from 'jsonwebtoken';
import createError from 'http-errors';
import client from './init_redis.js';


export const signAccessToken = (userId, payload = {}) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.SECRET_KEY
      const options = {
        expiresIn: '1d',
        issuer: 'smart_campus',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError());
          return
        }
        resolve(token)
      })
    })
  }
  
export const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
      }
      req.payload = payload
      next()
    })
  }
  export const signRefreshToken = (userId, payload = {}) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.REFRESH_KEY
      const options = {
        expiresIn: '14d',
        issuer: 'auth_service',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
        }

        client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            console.log(err.message)
            reject(createError.InternalServerError())
            return
          }
          resolve(token)
        })
      })
    })
  }

  export const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized())
          }
          const userId = payload.aud;
          client.GET(userId, (err, result) => {
            if (err) {
              console.log(err.message);
              reject(createError.InternalServerError());
              return
            }
            if (refreshToken === result) { 
              return resolve(userId)
            }
            reject(createError.Unauthorized());
          });
        }
      )
    });
  }

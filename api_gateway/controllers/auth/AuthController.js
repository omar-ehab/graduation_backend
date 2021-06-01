import createError from 'http-errors';
import User from '../../models/User.js';
import { authSchema } from '../../helpers/validation_schema.js';
import client from '../../helpers/init_redis.js';
import StudentService from '../../ServicesModels/StudentService.js';
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
  } from '../../helpers/jwt_helper.js';

class AuthController {
  constructor(serviceRegistry){
    this.serviceRegistry = serviceRegistry;
    this.studentService = new StudentService(serviceRegistry);
  }

  login = async (req, res, next) => {
    try {
        const type = req.params.type;
        const result = await authSchema.validateAsync(req.body);
        const user = new User(type, result.email, this.serviceRegistry);
        const userData = await user.init_user();
        if(userData) {
          const validated = await user.isValidPassword(result.password);
          if(validated) {

            if(userData.type === 'student') {
              await this.studentService.fetchData("updateFcmCode", {email: result.email}, {fcm_code: req.body.fcm_code});
            }
            
            const accessToken = await signAccessToken(userData.user.id.toString(), userData)
            const refreshToken = await signRefreshToken(userData.user.id.toString(), userData)

            delete userData.user.password
            delete userData.user.createdAt
            delete userData.user.updatedAt

            res.json({access_token: accessToken, refresh_token: refreshToken, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE, user: userData.user})
          }
        }
         else {
          throw createError.Unauthorized('These credentials do not match our records.');
        }
    } catch (error) {
      if (error.isJoi === true) {
        res.status(422).json({
          success: false,
          error
        });
      }
      next(error)
    }
  }

  logout = async (req, res) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        client.DEL(userId, (err, val) => {
          if (err) {
            console.log(err.message)
            throw createError.InternalServerError();
          }
          console.log(val);
          res.sendStatus(204);
        })
    } catch (error) {
      next(error)
    }  
  }

  refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
  
        const access_token = await signAccessToken(userId);
        const refresh_token = await signRefreshToken(userId);
        res.json({access_token, refresh_token, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE})
      } catch (error) {
        next(error)
      }
    }


}

export default AuthController;
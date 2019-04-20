import express, { RequestHandler, Request, Response } from 'express';
import User from './controllers/user';
import { Login } from './controllers';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../config';

/**
 * This is the manager for the routers of the main server.
 *
 * Basically, the server is there to render the pages and the api is there to
 * get data from the database.
 *
 * The API is not separated onto an other server because the scale of the
 * project is small. The time required to securize the API would not worth the benefits.
 */
export function apiRouter(): express.Router {
  const router = express.Router();

  router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  // Creating the routes

  /*
    router.route('/recipes/:id').get(getSpecificRecipe(recipesCollection, imagesFolderLocation))
                                .post(imageManager.middleware, updateRecipe(recipesCollection))
                                .delete(removeRecipe(recipesCollection));*/

  // Got to return the router for it to be used later on.
  const login = new Login();

  router
    .route('/signup')
    .put(User.getInstance().put)
    .get(User.getInstance().get);
  router.route('/login').post(login.post);

  return router;
}

export const checkToken = (req: Request, res: Response, next: any) => {
  let token = req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    verify(token, jwtConfig.secret, (err: Error, decoded: any) => {
      if (err) {
        return res.status(401).send('Token is not valid');
      } else {
        req.headers.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

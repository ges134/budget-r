"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// This is the manager for the routers of the main server.
//
// Basically, the server is there to render the pages and the api is there to
// get data from the database.
//
// The API is not separated onto an other server because the scale of the
// project is small. The time required to securize the API would not worth the benefits.
function apiRouter() {
    const router = express_1.default.Router();
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
    return router;
}
exports.apiRouter = apiRouter;
//# sourceMappingURL=api-router.js.map
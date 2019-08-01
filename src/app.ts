import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

import db from './models';
import schema from './graphql/schema';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';
import { DataLoaderFactory } from './graphql/dataloaders/DataLoaderFactory';
import { RequestedFields } from './graphql/ast/RequestedFields';


class App {

    public express: express.Application;

    constructor(){
        this.express = express();
        this.middleware();
    }

    private middleware(): void {
        this.express.use('/graphql', graphqlHTTP({
            schema:schema,
            graphiql: process.env.NODE_ENV === 'development'
        }))
    }

}

export default new App().express;

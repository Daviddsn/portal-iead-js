import { Router } from "express";
const routes = Router();
import {
    pageHome,
    pageDonate
} from './src/pages.js'


routes.get('/', pageHome);
routes.get('/contribuir', pageDonate);


export { routes };
import { Router } from "express";
const routes = Router();
import {
    pageHome,
    pageDonate,
    pageAbout,
    pageEventDetails,
    pageEvent
} from './pages.js'


routes.get('/', pageHome);
routes.get('/contribuir', pageDonate);
routes.get('/nossa-historia', pageAbout)
routes.get('/ver-evento', pageEventDetails)
routes.get('/eventos', pageEvent)

pageEvent



export { routes };
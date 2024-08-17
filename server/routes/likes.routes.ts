import { Router} from 'express';
import { getLikes, postLikes } from '../controllers/likes.controller';

export const likesRoutes = Router();

likesRoutes.get('/:gifId', getLikes );
likesRoutes.post('/:gifId', postLikes );

import express from 'express';
import { getRoles, saveRoles } from '../controllers/roles/rolesController.js';

const router = express.Router();

router.get('/roles/:id?', getRoles);
router.post('/roles', saveRoles);

export default router;
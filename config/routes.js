import express from 'express';
import user from '../app/apis/user.js';
import series from '../app/apis/series.js';

const router = express.Router();

router.use('/users', user);
router.use('/series', series);

router.use((err, req, res, next) => {
	next(err);
});

export default router;
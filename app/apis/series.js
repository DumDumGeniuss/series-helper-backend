import express from 'express';
import Series from '../models/series.js';
import User from '../models/user.js';
import * as fb from './fb.js';

const router = express.Router();

router.get('/:id', (req, res) => {
	Series.findById(req.params.id, (err, series) => {
		if(err) {
			res.status(500).send('Error occured on querying series');
		} else {
			res.json(series);
		}
	});
});


router.post('/:id', (req, res) => {
	const authToken = req.headers['auth-token'];
	Series.findById(req.params.id, (err, series) => {
		if(err) {
			res.status(500).send('Error occured on saving series');
		}
		if (!series) {
			res.status(404).send('No Series Found');
		}
		
		let data = req.body;

		fb.getFbUser(authToken)
			.then((fbData) => {
				if(fbData.id !== series._id) {
					res.status(401).send('You are not authorized');
				} else {
					for(var key in data) {
						series[key] = data[key];
					}
					series.save((err, series) => {
						if(err) {
							res.status(500).send('Error occured on saving series');
						} else {
							res.json(series);
						}
					});
				}
			})
	});
});

export default router;
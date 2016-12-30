import express from 'express';
import Series from '../models/series.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/:id', (req, res) => {
	Series.findById(req.params.id, (err, series) => {
		if(err) {
			res.status(500).send('Error occured on saving series');
		} else {
			res.json(series);
		}
	});
});

// router.post('/', (req, res) => {
// 	let newSeries = new Series();
// 	let data = req.body;

// 	for(var key in data) {
// 		newSeries[key] = data[key];
// 	}

// 	newSeries.save((err, newSeries) => {
// 		if(err) {
// 			res.send(err);
// 		} else {
// 			res.json(newSeries);
// 		}
// 	});
// });


router.post('/:id', (req, res) => {
	const authToken = req.headers['auth-token'];
	Series.findById(req.params.id, (err, series) => {
		if (err) {
			res.status(404).send('No Series Found');
		}
		
		let data = req.body;

		User.findById(data._id, (err, user) => {
			if(authToken !== user.authToken) {
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

		});
	});
});

export default router;
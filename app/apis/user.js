import express from 'express';
import User from '../models/user.js';
import Series from '../models/series.js';

const router = express.Router();

router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if(err) {
			res.send(err);
		} else {
			res.json({
				user: user
			});
		}
	});
});

router.post('/', (req, res) => {
	let data = req.body;
	User.findById(data._id, (err, user) => {
		if(user) {
			res.send(data);
		} else {
			let newUser = new User();
			let newSeries = new Series();

			for(var key in data) {
				newUser[key] = data[key];
			}

			newUser.save((err, newUser) => {
				if(err) {
					res.send(err);
				} else {
					newSeries._id = newUser._id;
					newSeries.save((err, newSeries) => {
						if(err) {
							res.send(err);
						} else {
							res.json(newUser);
						}
					});
				}
			});
		}
	});
});

export default router;
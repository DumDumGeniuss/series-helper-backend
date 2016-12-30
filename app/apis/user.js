import express from 'express';
import User from '../models/user.js';
import Series from '../models/series.js';

const router = express.Router();

router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if(err) {
			res.status(404).send('No user Found');
		} else {
			user.authToken = '';
			res.json(user);
		}
	});
});

router.post('/auth', (req, res) => {
	let data = req.body;
	User.findById(data._id, (err, user) => {
		if(user) {
			for(var key in data) {
				user[key] = data[key];
			}
			user.save((err, newUser) => {
				if(err) {
					res.status(500).send('Error occured on saving user');
				} else {
					newUser.authToken = '';
					res.json(newUser);
				}
			});
		} else {
			let newUser = new User();
			let newSeries = new Series();

			for(var key in data) {
				newUser[key] = data[key];
			}

			newUser.save((err, newUser) => {
				if(err) {
					res.status(500).send('Error occured on saving user');
				} else {
					newSeries._id = newUser._id;
					newSeries.save((err, newSeries) => {
						if(err) {
							res.status(500).send('Error occured on saving new series');
						} else {
							newUser.authToken = '';
							res.json(newUser);
						}
					});
				}
			});
		}
	});
});

export default router;
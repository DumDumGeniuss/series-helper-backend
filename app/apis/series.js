import express from 'express';
import Series from '../models/series.js';

const router = express.Router();

router.get('/:id', (req, res) => {
	Series.findById(req.params.id, (err, series) => {
		if(err) {
			res.send(err);
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
	Series.findById(req.params.id, (err, series) => {
		if (err) {
			res.send(err);
		}
		
		let data = req.body;

		for(var key in data) {
			series[key] = data[key];
		}
		series.save((err, series) => {
			if(err) {
				res.send(err);
			} else {
				res.json(series);
			}
		});
	});
});

export default router;
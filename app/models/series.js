import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let SeriesSchema = new Schema({
	_id: { type: String, default: '' },
	public: { type: Boolean, default: false },
	items: { type: String, default: JSON.stringify([]) },
});

let Series = mongoose.model('Series', SeriesSchema);

export default Series;
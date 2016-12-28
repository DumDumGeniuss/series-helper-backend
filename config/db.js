import mongoose from 'mongoose';

export default (dbUrl) => {
	mongoose.Promise = global.Promise;
	mongoose.connect(dbUrl);

	const db = mongoose.connection;

	//mongo event handler
	db.on('connected', function () {
		console.log('Mongoose default connection open to ' + dbUrl);
	});

	// If the connection throws an error
	db.on('error',function (err) {
		console.log('Mongoose default connection error: ' + err);
	});

	// When the connection is disconnected
	db.on('disconnected', function () {
		console.log('Mongoose default connection disconnected'); 
	});

	// If the Node process ends, close the Mongoose connection 
	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
			console.log('Mongoose default connection disconnected through app termination'); 
			process.exit(0); 
		});
	});

	db.on('open', function() {
		console.log('Mongodb connection success !');
	});
};

import fetch from 'node-fetch';

export const getFbUser = (accessToken) => {
	return fetch('https://graph.facebook.com/me?access_token=' + accessToken)
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			if (res.error) {
				res.status(res.error.code).send(res.error.message);
			}
			return res;
		});
};
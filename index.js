const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

//ecample: https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers`;
const DEFAULT_SOL = 1;
const DEFAULT_CAMERA = 'mast';
const API_KEY = 'DEMO_KEY';

// app.get('/', (req, res) => res.send('Hello World!'));
// app.get('/', (req, res) => res.json({ content: 'Hssslo World!' }));

app.get('/api/search/sol/:sol/camera/:camera', (req, res) => {
	// const result = axios.get(`${url}/curiosity/photos?sol=1$api_key=DEMO_KEY`);

	const sol = req.params.sol;
	const camera = req.params.camera;

	axios
		.get(
			// 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY'
			`${URL}/curiosity/photos?sol=${sol ? sol : DEFAULT_SOL}&camera=${
				camera ? camera : DEFAULT_CAMERA
			}&api_key=${API_KEY}`
		)
		.then(response => {
			const data = Array.from(response.data.photos).map(obj => {
				return {
					id: obj.id,
					img_src: obj.img_src,
					camera: obj.camera.name
				};
			});
			console.log(req.params);

			res.json({ data });
		})
		.catch(error => {
			console.log('error');
			console.log(error);
		})
		.finally(function() {
			console.log('finally always');
		});
});

app.get('*', (req, res) => {
	res.send('TODO: Client');
});

app.listen(process.env.PORT || port, () =>
	console.log(`Mars rover photo API is listening on port ${port}!`)
);

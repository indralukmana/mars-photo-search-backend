const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3333;
require('dotenv').config();

//example: https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers`;
const DEFAULT_SOL = 1;
const DEFAULT_CAMERA = 'mast';
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/search/rover/:rover/sol/:sol/camera/:camera', (req, res) => {
	const rover = req.params.rover;
	const sol = req.params.sol;
	const camera = req.params.camera;

	console.log(req.params);

	axios
		.get(
			`${URL}/${rover}/photos?sol=${sol ? sol : DEFAULT_SOL}&camera=${
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
	res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
});

app.listen(process.env.PORT || port, () =>
	console.log(`Mars rover photo API is listening on port ${port}!`)
);

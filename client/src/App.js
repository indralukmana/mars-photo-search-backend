import React, { Component } from 'react';
import './App.css';

// const API = 'http://localhost:3333/api/search/sol/1/camera/mast';
const base_url = 'https://mars-photo-search.herokuapp.com';

class App extends Component {
	state = {
		data: [],
		error: null,
		loading: false,
		sol: 2,
		camera: 'navcam',
		rover: 'spirit',
		searched: false
	};

	// TODO: Handle error
	// componentDidMount() {
	// 	fetch(API)
	// 		.then(response => response.json())
	// 		.then(result => {
	// 			this.setState({ data: result.data });
	// 		})
	// 		.catch(error => this.setState({ error }));
	// }

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// TODO: Handle Error
	handleSearch = () => {
		const { sol, camera, rover } = this.state;

		const API = `${base_url}/api/search/rover/${rover}/sol/${sol}/camera/${camera}`;

		this.setState({ loading: true, searched: false });

		fetch(API)
			.then(response => response.json())
			.then(result => {
				this.setState({
					data: result.data,
					loading: false,
					searched: true
				});
			})
			.catch(error => this.setState({ error }));
	};

	render() {
		const { data, sol, camera, loading, rover, searched } = this.state;

		return (
			<div className="App">
				<header className="App-header">
					<h1>Mars Rovers Photo Search App</h1>
				</header>
				<main>
					<div className="search">
						<label>
							Rover:
							<select
								value={rover}
								name="rover"
								onChange={this.handleChange}>
								<option value="curiosity">curiosity</option>
								<option value="opportunity">opportunity</option>
								<option value="spirit">spirit</option>
							</select>
						</label>
						<label>
							Sol:
							<input
								type="number"
								name="sol"
								value={sol}
								onChange={this.handleChange}
							/>
						</label>
						<label>
							Camera:
							<select
								value={camera}
								name="camera"
								onChange={this.handleChange}>
								<option value="fhaz">
									Front Hazard Avoidance Camera
								</option>
								<option value="rhaz">
									Rear Hazard Avoidance Camera
								</option>
								<option value="navcam">
									Navigation Camera
								</option>
							</select>
						</label>
						<button onClick={this.handleSearch}>Search</button>
					</div>
					{loading && (
						<h2>Fetching data from NASA, please wait...</h2>
					)}
					<div className="gallery">
						{searched === true && data.length === 0 && (
							<div>
								<h2>There are no photos for these options</h2>
								<ul>
									<li>Rover: {rover}</li>
									<li>Sol: {sol}</li>
									<li>Camera: {camera}</li>
								</ul>
							</div>
						)}
						{data.length > 0 &&
							data.map(item => (
								<div className="photo">
									<img
										key={item.id}
										src={item.img_src}
										alt="mars"
									/>
								</div>
							))}
					</div>
				</main>
			</div>
		);
	}
}

export default App;

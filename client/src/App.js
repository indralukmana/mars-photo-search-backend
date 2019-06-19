import React, { Component } from 'react';
import './App.css';

const API = 'http://localhost:3333/api/search/sol/1/camera/mast';

class App extends Component {
	state = {
		data: [],
		error: null,
		loading: false,
		sol: 0,
		camera: 'fhaz'
	};

	// TODO: Handle error
	componentDidMount() {
		fetch(API)
			.then(response => response.json())
			.then(result => {
				this.setState({ data: result.data });
			})
			.catch(error => this.setState({ error }));
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { data, sol, camera } = this.state;

		return (
			<div className="App">
				<header className="App-header">
					<h1>Mars Rovers Photo Search App</h1>
					<p>Under furious development</p>
					<p>{API}</p>
				</header>
				<main>
					<div>
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
					</div>
					<div className="gallery">
						{data.map(item => (
							<div class="photo">
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

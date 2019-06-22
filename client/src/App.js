import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Components/Header';
import Search from './Components/Search';
import Gallery from './Components/Gallery';

const base_url = 'http://localhost:3333';
// const base_url = 'https://mars-photo-search.herokuapp.com';

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

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// TODO: Handle Error
	handleSearch = (rover, sol, camera) => {
		// const { sol, camera, rover } = this.state;

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
			<React.Fragment>
				<CssBaseline />
				<Header />
				<main>
					<Search
						rover={rover}
						sol={sol}
						camera={camera}
						loading={loading}
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					<Gallery
						searched={searched}
						data={data}
						rover={rover}
						sol={sol}
						camera={camera}
					/>
				</main>
			</React.Fragment>
		);
	}
}

export default App;

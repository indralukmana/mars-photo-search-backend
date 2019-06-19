import React, { Component } from 'react';
import './App.css';

const API = 'http://localhost:3333/api/search/sol/1/camera/mast';

class App extends Component {
	state = {
		data: [],
		error: null,
		loading: false
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

	render() {
		const { data } = this.state;

		return (
			<div className="App">
				<header className="App-header">
					<h1>Mars Rovers Photo Search App</h1>
					<p>Under furious development</p>
					<p>{API}</p>
					{data.map(item => (
						<img key={item.id} src={item.img_src} alt="mars" />
					))}
				</header>
			</div>
		);
	}
}

export default App;

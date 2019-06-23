import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	headerContent: {
		padding: theme.spacing(8, 0, 6)
	},
	formControl: {
		// margin: theme.spacing(1),
		// paddingRight: theme.spacing(1.5)
		// minWidth: 120
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	}
}));

export default function Search(props) {
	const classes = useStyles();

	const { rover, sol, camera, handleSearch, loading } = props;

	const [values, setValues] = React.useState({
		rover: rover,
		sol: sol,
		camera
	});

	const [solValid, setSolValid] = React.useState(true);

	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleSelectChange = event => {
		setValues(oldValues => ({
			...oldValues,
			[event.target.name]: event.target.value
		}));
	};

	const handleInputChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handlePhotoSearch = () => {
		// console.log(values.sol);
		if (values.sol.toString().match(/^[1-9][0-9]?$|^1000$/g)) {
			// console.log('valid');
			setSolValid(true);
			handleSearch(values.rover, values.sol, values.camera);
		} else {
			setSolValid(false);
			// console.log('not valid');
		}
	};

	return (
		<Container maxWidth="md">
			<Grid container justify="center" spacing={3}>
				<Grid item xs={6} md={3}>
					<FormControl
						fullWidth
						className={classes.formControl}
						variant="outlined">
						<InputLabel ref={inputLabel} htmlFor="rover-select">
							Rover
						</InputLabel>
						<Select
							value={values.rover}
							onChange={handleSelectChange}
							input={
								<OutlinedInput
									name="rover"
									labelWidth={labelWidth}
									id="rover-select"
								/>
							}>
							<MenuItem value="curiosity">curiosity</MenuItem>
							<MenuItem value="opportunity">opportunity</MenuItem>
							<MenuItem value="spirit">spirit</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField
						fullWidth
						label="Sol"
						variant="outlined"
						type="number"
						name="sol"
						id="sol-input"
						inputProps={{
							min: 1,
							max: 1000
						}}
						value={values.sol}
						onChange={handleInputChange('sol')}
						helperText={
							solValid
								? 'Sol value is number between 1 - 1000'
								: 'Not valid, sol value is number between 1 - 1000'
						}
						error={!solValid}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl
						variant="outlined"
						className={classes.formControl}
						fullWidth>
						<InputLabel ref={inputLabel} htmlFor="camera-select">
							Camera
						</InputLabel>
						<Select
							value={values.camera}
							onChange={handleSelectChange}
							input={
								<OutlinedInput
									name="camera"
									id="camera-select"
									labelWidth={labelWidth}
								/>
							}>
							>
							<MenuItem value="fhaz">
								Front Hazard Avoidance Camera
							</MenuItem>
							<MenuItem value="rhaz">
								Rear Hazard Avoidance Camera
							</MenuItem>
							<MenuItem value="navcam">
								Navigation Camera
							</MenuItem>
							<MenuItem value="mast">Mast Camera</MenuItem>
							<MenuItem value="chemcam">
								Chemistry and Camera Complex
							</MenuItem>
							<MenuItem value="mahli">
								Mars Hand Lens Imager
							</MenuItem>
							<MenuItem value="mardi">
								Mars Descent Imager
							</MenuItem>
							<MenuItem value="pancam">Panoramic Camera</MenuItem>
							<MenuItem value="minites">
								Miniature Thermal Emission Spectrometer
								(Mini-TES)
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={4}>
					<Button
						fullWidth
						size="large"
						variant="contained"
						color="primary"
						onClick={handlePhotoSearch}>
						Search photos
					</Button>
				</Grid>

				{loading && (
					<Container align="center">
						{/* <Typography variant="body1" align="center">
							Fetching data from NASA, please wait...
						</Typography> */}
						<CircularProgress />
					</Container>
				)}
			</Grid>
		</Container>
	);
}

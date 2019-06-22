import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	headerContent: {
		padding: theme.spacing(8, 0, 6)
	},
	heading: {
		fontWeight: 'bolder',
		fontSize: '2em'
	}
}));

export default function Header() {
	const classes = useStyles();

	return (
		<div className={classes.headerContent}>
			<Container maxWidth="sm">
				<header className="App-header">
					{/* <Paper className={useStyles.container}> */}
					<Typography
						variant="h5"
						component="h1"
						align="center"
						color="text-primary"
						className={classes.heading}>
						Mars Photo Search App
					</Typography>
					{/* </Paper> */}
				</header>
			</Container>
		</div>
	);
}

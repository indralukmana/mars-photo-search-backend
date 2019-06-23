import React from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '100%' // 16:9
	},
	cardContent: {
		flexGrow: 1
	}
}));

export default function Gallery(props) {
	const { searched, data, rover, sol, camera } = props;

	const classes = useStyles();

	return (
		<Container className={classes.cardGrid} maxWidth="md">
			<Grid container spacing={4}>
				{searched === true && data.length === 0 && (
					<Grid item xs>
						<h2>There are no photos for these options</h2>
					</Grid>
				)}
				{data.length > 0 &&
					data.map(photo => (
						<Grid item key={photo.id} xs={12} sm={6} md={4}>
							<Card className={classes.card}>
								<CardMedia
									className={classes.cardMedia}
									image={photo.img_src}
									alt="mars"
								/>
							</Card>
						</Grid>
					))}
			</Grid>
		</Container>
	);
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { GridList, GridTile } from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import LocationPOIControl from 'app/components/LocationPOIControl';
import { getPlaces } from 'app/actions/placesActions';

import styles from './styles.styl';


@connect((state) => ({
  places: state.places.items,
}), { getPlaces })
export default class PlacesView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    places: PropTypes.array,
    getPlaces: PropTypes.func,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude,
        longitude,
      });

      console.log('this.props', this.props);
      console.log('actions', getPlaces);

      this.props.getPlaces({
        latitude,
        longitude,
      });
    });
  }

  render() {
    const { places } = this.props;

    return (
      <div>
        <AppBar title="Taggr" />
        <List>
          <ListItem>
            <LocationPOIControl />
          </ListItem>
        </List>

        <Divider />

        <div className={styles.tileRoot}>
          <h1>
            <FontIcon className="material-icons" className={styles.icon}>place</FontIcon>
            <span>{'Places near ya\''}</span>
          </h1>

          <GridList cellHeight={200} className={styles.gridList}>
            {places.map((place) => (
              <Link to={`/places/${place.id}`}>
                <GridTile
                  key={place.id}
                  title={place.name}
                  subtitle={<span><b>{place.stats.posts}</b></span>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>} />
              </Link>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

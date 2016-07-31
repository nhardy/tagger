import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { GridList, GridTile } from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import LocationPOIControl from 'app/components/LocationPOIControl';

import styles from './styles.styl';


export default class PlacesView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    places: PropTypes.array,
  };

  static defaultProps = {
    places: [
      {
        id: 0,
        name: 'The Opera House',
        stats: {
          posts: 5,
        },
      },
      {
        id: 1,
        name: 'Circular Quay',
        stats: {
          posts: 2,
        },
      },
      {
        id: 2,
        name: '464 Bus',
        stats: {
          posts: 13,
        },
      },
    ],
  };
  onComponentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>
      this.setState({
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
      }));
  }
  
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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import cx from 'classnames';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { getPlace, setPlace } from 'app/actions/placesActions';

import styles from './styles.styl';

@asyncConnect([{
  promise: (params, { dispatch, getState }) => {
    console.log(params);
    const state = getState().places;
    return Promise.resolve(state);
  },
}])
@connect((state) => ({
  posts: state.places.items.filter((place) => place.id === state.places.id)[0].posts,
}), { getPlace, setPlace })
export default class PlaceView extends Component {
  static propTypes = {
    posts: PropTypes.array,
  };

  state = {
    postTextOpen: false,
    postImageOpen: false,
    newPostText: '',
  };

  postText = () => {
    this.setState({ postTextOpen: true });
  };

  postPhoto = () => {
    const { imgInput } = this.refs;
    imgInput.click();

    imgInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const url = reader.result;
        this.setState({ newImageUrl: url });
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }

      this.setState({ postImageOpen: true });
    };
  };

  dismissTextModal = () => {
    this.setState({ postTextOpen: false, newPostText: '' });
  };

  dismissImageModal = () => {
    this.setState({ postImageOpen: false, newPostText: '' });
  }

  render() {
    const { posts } = this.props;
    const { postTextOpen, postImageOpen } = this.state;

    const iconElementLeft = (
      <Link to="/places">
        <IconButton>
          <FontIcon
            className={cx('material-icons', styles.icon)}>
              arrow_back
          </FontIcon>
        </IconButton>
      </Link>
    );

    return (
      <div>
        <AppBar title="Place" iconElementLeft={iconElementLeft} />

        <input ref="imgInput" type="file" style={{ display: 'none' }} />

        <Dialog
          modal
          open={postTextOpen}
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onClick={this.dismissTextModal} />,
            <FlatButton
              label="Post text"
              primary
              disabled={this.state.newPostText.length < 3}
              onClick={this.postNewText} />,
          ]}>
          <TextField
            hintText="Write your memes here."
            style={{ minHeight: '50%' }}
            multiLine
            rows={12}
            onChange={(ev) => this.setState({ newPostText: ev.target.value })}
            value={this.state.newPostText} />
        </Dialog>

        <Dialog
          modal
          open={postImageOpen}
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onClick={this.dismissImageModal} />,
            <FlatButton
              label="Post photo"
              primary
              disabled={false}
              onClick={this.postNewImage} />,
          ]}>
          <img className={styles.img} src={this.state.newImageUrl} />
          <TextField
            hintText="Write your memes here."
            style={{ minHeight: '50%' }}
            multiLine
            rows={5}
            onChange={(ev) => this.setState({ newPostText: ev.target.value })}
            value={this.state.newPostText} />
        </Dialog>

        <div className={styles.feed}>
          {posts.map(({ text, imgUrl }, i) => (
            <div key={i} className={styles.item}>
              <span className={cx({ [styles.caption]: !!imgUrl, [styles.text]: !imgUrl })}>{text}</span>
              {imgUrl && <img className={styles.img} src={imgUrl} />}
            </div>
          ))}
          <div className={styles.center}>
            <span style={{ fontSize: '20px', fontWeight: '700', paddingTop: '1em', display: 'block' }}> :-) </span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toolbarCtn}>
            <IconButton
              className={styles.iconButton}
              onClick={this.postText}>
              <FontIcon
                label="edit"
                className={cx('material-icons', styles.icon)}>
                font_download
              </FontIcon>
            </IconButton>
            <IconButton
              className={styles.iconButton}
              onClick={this.postPhoto}>
              <FontIcon
                className={cx('material-icons', styles.icon)}>
                add_a_photo
              </FontIcon>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

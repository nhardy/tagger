import React, { Component } from 'react';
import { Link } from 'react-router';
import { Sticky } from 'react-sticky';
import cx from 'classnames';
import Scrollable from 'app/components/Scrollable';

import FontAwesome from 'app/components/FontAwesome';
import Nav from './Nav';
import * as appPropTypes from 'app/components/propTypes';

import styles from './styles.styl';


export default class SiteHeader extends Component {
  static contextTypes = {
    location: appPropTypes.location,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleDismiss);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleDismiss);
  }

  handleDismiss = (e) => {
    if (!this.refs.toggle.checked) return;
    if (this.refs.sidebar.contains(e.target)) return;
    if (this.refs.label.contains(e.target)) return;
    if (this.refs.toggle.contains(e.target)) return;
    this.refs.toggle.checked = false;
  };

  render() {
    return (
      <header className={styles.root}>
        <div className={styles.column}>
          <span className={styles.header}>Header</span>
          <span className={styles.tagline}>Tagline</span>
        </div>
        <Sticky className={styles.sticky} stickyClassName={styles.isSticky}>
          <div className={cx(styles.column, styles.navBar)}>
            <label htmlFor="sidebarToggle" ref="label">
              <FontAwesome className="fa-bars" />
            </label>
            <Link to="/" className={styles.siteName}>nhardy.id.au</Link>
            <Nav className={styles.nav} />
          </div>
        </Sticky>
        <input
          id="sidebarToggle"
          type="checkbox"
          className={styles.checkbox}
          ref="toggle" />
        <aside className={styles.aside} ref="sidebar">
          <Scrollable className={styles.scrollable} wrapperClassName={styles.scrollableInner}>
            <label className={styles.toggle} htmlFor="sidebarToggle">
              <FontAwesome className="fa-close" />
            </label>
            <Nav mode="vertical" />
            <div>
              <h2>Header</h2>
              <p>Paragraph</p>
            </div>
          </Scrollable>
        </aside>
      </header>
    );
  }
}

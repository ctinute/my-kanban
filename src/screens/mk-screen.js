import {PageViewElement} from './page-view-element';
import {connect} from 'pwa-helpers/connect-mixin';
import {store} from '../store';
import {
  dispatchChain,
  hideActionToolbar,
  hideToolbar,
  setActionToolbar,
  setDefaultToolbar,
  setDrawerItems,
  showActionToolbar,
  showToolbar,
} from '../actions/app';

export class MkScreen extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      active: Boolean,
    };
  }

  _dispatch(action) {
    store.dispatch(action);
  }
  _dispatchChain(actions) {
    this._dispatch(dispatchChain(actions));
  }

  _setDefaultToolbar(toolbarContent) {
    this._dispatch(setDefaultToolbar(toolbarContent));
  }
  _setActionToolbar(toolbarContent) {
    this._dispatch(setActionToolbar(toolbarContent));
  }
  _showToolbar() {
    this._dispatch(showToolbar());
  }
  _hideToolbar() {
    this._dispatch(hideToolbar());
  }
  _requireActionToolbar() {
    this._dispatch(showActionToolbar());
  }
  _requireDefaultToolbar() {
    this._dispatch(hideActionToolbar());
  }

  _requireDrawerShorcuts(items) {
    this._dispatch(setDrawerItems(items));
  }

  _didRender(props, oldProps, changedProps) {
    super._didRender(props, oldProps, changedProps);
    this._setDefaultToolbar(null);
    this._setActionToolbar(null);
    this._requireDefaultToolbar();
    this._hideToolbar();

    this._requireDrawerShorcuts([]);
  }
}

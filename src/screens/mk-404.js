import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';

export default class Mk404 extends connect(store)(PageViewElement) {
  static get properties() {
    return {};
  }

  _stateChanged(state) {
  }

  _render(props) {
    return html`
            404
        `;
  }
}

customElements.define('mk-404', Mk404);

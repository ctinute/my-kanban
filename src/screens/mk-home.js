import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';

export default class MkHome extends connect(store)(PageViewElement) {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  _stateChanged(state) {
  }

  _render(props) {
    const style = html`
            <style>
                :host {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;                
                }
            </style>`;
    return html`
            ${style}
            Home
        `;
  }
}

customElements.define('mk-home', MkHome);

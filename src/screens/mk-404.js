import {html} from '@polymer/lit-element';
import {MkScreen} from './mk-screen';

export default class Mk404 extends MkScreen {
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

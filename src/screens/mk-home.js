import {html} from '@polymer/lit-element';
import {MkScreen} from './mk-screen';

export default class MkHome extends MkScreen {
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

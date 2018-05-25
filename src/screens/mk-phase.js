import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';

export default class MkPhase extends connect(store)(PageViewElement) {
    static get properties() {
        return {};
    }

    _stateChanged(state) {
    }

    _render(props) {
        return html`
            phase
        `;
    }
}

customElements.define('mk-phase', MkPhase);

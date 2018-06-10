import {PageViewElement} from '../page-view-element.js';
import {html} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

import {connect} from 'pwa-helpers/connect-mixin.js';

import {store} from '../../store.js';
import {Actions} from '../../actions/index';

export default class MkDialogCreatePhase extends connect(store)(PageViewElement) {
  constructor() {
    super();
    this.phase = {
      name: null,
    };
  }

  static get properties() {
    return {
      phase: Object,
      projectId: String,
    };
  }

  _stateChanged(state) {
    this.projectId = state.route.data.projectId;
  }

  _render({phase, projectId}) {
    return html`
      <div class="modal-header">
        <h2>New Phase: ${projectId}</h2>
      </div>
      <div class="modal-content">
        <paper-input 
          required 
          label="Phase name" 
          value="${phase.name}" 
          on-change="${(e) => phase.name = e.target.value})"
          error-message="This field is required !!!">
        </paper-input>
      </div>
      <div class="modal-actions">
        <paper-button dialog-dismiss on-click="${() => store.dispatch(Actions.phase.cancelCreatePhase())}">Cancel</paper-button>
        <paper-button dialog-confirm on-click="${() => store.dispatch(Actions.phase.createPhase(phase, projectId))}">Create</paper-button>
      </div>`;
  }
}

customElements.define('mk-dialog-create-phase', MkDialogCreatePhase);

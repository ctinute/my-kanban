import {PageViewElement} from '../screens/page-view-element.js';
import {html} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

import {connect} from 'pwa-helpers/connect-mixin.js';

import {store} from '../store.js';
import {Actions} from '../actions';

export default class MkUser extends connect(store)(PageViewElement) {
  constructor() {
    super();
    this._project = {
      name: null,
    };
  }

  static get properties() {
    return {
      _user: Object,
      _project: Object,
    };
  }

  _stateChanged(state) {
    this._user = state.auth.user;
  }

  open() {
  }

  _render({_project}) {
    return html`
            <div class="modal-header">
                <h2>New project; ${_project.name}</h2>
            </div>
            <div class="modal-content">
                <paper-input 
                    required 
                    label="Project name" 
                    value="${_project.name}" 
                    on-change="${(e) => _project.name = e.target.value})"
                    error-message="This field is required !!!">
                </paper-input>
            </div>
            <div class="modal-actions">
                <paper-button dialog-dismiss on-click="${() => store.dispatch(Actions.project.cancelCreateProject())}">Cancel</paper-button>
                <paper-button dialog-confirm on-click="${() => store.dispatch(Actions.project.createProject(_project))}">Create</paper-button>
            </div>`;
  }
}

customElements.define('mk-dialog-create-project', MkUser);

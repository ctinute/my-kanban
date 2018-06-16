import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

export default class MkDialogCreateProject extends LitElement {
  static get properties() {
    return {
      _user: Object,
      _project: Object,
    };
  }

  constructor() {
    super();
    this._project = {
      name: null,
    };
  }

  _submit(project) {
    this.dispatchEvent(new CustomEvent('submit', {detail: {project}}));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  _renderStyles() {
    return html`<style>:host{display: block;}</style>`;
  }

  _render({_project}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <div class="modal-header">
        <h2>New project</h2>
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
        <paper-button dialog-dismiss on-click="${() => this._cancel()}">Cancel</paper-button>
        <paper-button dialog-confirm on-click="${() => this._submit(_project)}">Create</paper-button>
      </div>`;
  }
}

customElements.define('mk-dialog-create-project', MkDialogCreateProject);

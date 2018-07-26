/* eslint-disable brace-style */
import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-toggle-button';

// noinspection JSUnusedGlobalSymbols
export default class MkStageEditor extends LitElement {
  constructor() {
    super();
    if (!this.stage) {
      this.stage = {
        id: null,
        name: null,
        canCreateTask: true,
        limit: 0,
        tasks: [],
      };
    }
  }

  static get properties() {
    return {
      stage: Object,
    };
  }

  // noinspection JSUnusedGlobalSymbols
  _notifyChange(stage) {
    this.dispatchEvent(new CustomEvent('edit-stage', {detail: {stage}}));
  }

  _render({stage}) {
    let toggleCanCreateTask = () => {
      // noinspection JSUndefinedPropertyAssignment
      stage.canCreateTask = !stage.canCreateTask;
      this._notifyChange(stage);
    };
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <paper-input
        label="Name"
        always-float-label
        value="${stage.name}"
        on-change="${(e) => {
      stage.name = e.target.value;
      this._notifyChange(stage);
    }})"
        required
        error-message="This field is required !!!">
      </paper-input>
      <paper-input
        label="Limit task"
        type="number"
        always-float-label
        value="${stage.limit}"
        on-change="${(e) => {
      stage.limit = e.target.value;
      this._notifyChange(stage);
    }})"
        required
        error-message="This field is required !!!">
      </paper-input>
      <div class="inline">
        <label for="create-task-toogle">Can create task ?</label>
        <paper-toggle-button id="create-task-toogle" checked="${stage.canCreateTask}" on-click="${toggleCanCreateTask}"></paper-toggle-button>
      </div>`;
  }
}

customElements.define('mk-stage-editor', MkStageEditor);

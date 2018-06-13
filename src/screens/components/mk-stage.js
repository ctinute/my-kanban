import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';

class MkStage extends LitElement {
  static get properties() {
    return {
      stage: Object,
      canCreateTask: Boolean,
      onCreateTaskButtonClick: Function,
    };
  }

  _renderStyles() {
    return html`
      <style>
        :host {
            display: block;
            min-width: 300px;
        }
        .header {
          width: 100%;
          font-size: 1.2em;
          font-weight: bold;
          text-align: center;
          height: 2.5em;
          line-height: 2.5em;
          margin-bottom: 8px;
          cursor: move;
        }
      </style>
    `;
  }

  _render({stage, canCreateTask, onCreateTaskButtonClick}) {
    let styles = this._renderStyles();
    let actions = canCreateTask ? html`<paper-button ripple on-click="${onCreateTaskButtonClick}">New task...</paper-button>` : null;
    return html`
      ${styles}
      <div class="header">
        ${stage.name}
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="actions">
        ${actions}
      </div>
    `;
  }
}

customElements.define('mk-stage', MkStage);

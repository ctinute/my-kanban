import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';

class MkStageColumn extends LitElement {
  static get properties() {
    return {
      stage: Object,
    };
  }

  _renderStyles() {
    return html`
      <style>
        :host {
          display: block;
          min-width: 300px;
          padding: 8px;
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

  _fireOnCreateTaskButtonClick() {
    this.dispatchEvent(new CustomEvent('create-task-button-click'));
  }

  _fireSelectEvent() {
    this.dispatchEvent(new CustomEvent('select'));
  }

  _shouldRender(props) {
    return props.stage !== undefined;
  }

  _render({stage}) {
    let styles = this._renderStyles();
    let actions = stage.canCreateTask ? html`<paper-button ripple on-click="${() => this._fireOnCreateTaskButtonClick()}">New task...</paper-button>` : null;
    return html`
      ${styles}
      <div class="header" on-click="${() => this._fireSelectEvent()}">
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

customElements.define('mk-stage-column', MkStageColumn);

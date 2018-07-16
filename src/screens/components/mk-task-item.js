import {html, LitElement} from '@polymer/lit-element';

class MkTaskItem extends LitElement {
  constructor() {
    super();
    this.mode = 'OVERVIEW';
  }

  static get properties() {
    return {
      task: Object,
      mode: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  _fireSelect() {
    this.selected = true;
    this.dispatchEvent(new CustomEvent('select-task', {detail: {task: this.task}}));
  }

  _fireUpdate(task) {
    // TODO: implement edit/update
    this.dispatchEvent(new CustomEvent('update-task', {detail: {task}}));
  }

  _fireDelete(task) {
    // TODO: implement delete
    this.dispatchEvent(new CustomEvent('delete-task', {detail: {task}}));
  }

  _shouldRender(props) {
    return props.task !== undefined;
  }

  _renderStyles() {
    return html`
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          border-radius: 8px;
          padding: 0 8px;
          background-color: white;
          overflow: hidden;
        }
        .container {
          width: 100%;
        }
        #title {
          height: 48px;
          line-height: 48px;
        }
        #description {
          overflow: hidden;
          max-height: 999px;
          transition: max-height;
          transition-duration: 0.3s;
          transition-delay: 0.3s;
        }
        .OVERVIEW #description {
          max-height: 0;
        }
      </style>
    `;
  }

  _render({task, selected, mode}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <div class$="${'container ' + mode}" elevation="0">
        <div id="title">
          ${task.name}
        </div>
        <div id="description">
          ${task.description}
        </div>
      </div>
    `;
  }
}

customElements.define('mk-task-item', MkTaskItem);

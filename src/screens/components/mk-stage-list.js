import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';

class MkStageList extends LitElement {
  static get properties() {
    return {
      stages: Array,
    };
  }

  _didRender() {
    let stageListContainer = this.shadowRoot.querySelector('#list');
    Sortable.create(stageListContainer, {
      animation: 150,
      draggable: '.stage',
      handle: '.header',
    });
    let taskListContainer = stageListContainer.getElementsByClassName('content');
    for (let cardList of taskListContainer) {
      Sortable.create(cardList, {
        group: 'card',
        animation: 150,
      });
    }
  }

  _render({stages}) {
    return html`
      ${this._renderStyles()}
      <div id="list">
        ${stages.map((stage, index) => this._renderStage(stage, index === 0))}
      </div>  
    `;
  }

  _renderStyles() {
    return html`
      <style>
        app-header-layout {
            height: 100%;
            width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
        }
        app-header-layout > .content {
          padding: 16px 0;
          height: 100%;
        }
        .content {
            min-height: 16px;
        }
        .stages,
        .new-stage {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
        }
        
        .stage {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          height: 100%;
          width: 256px;
          margin: 0 16px;
          padding: 8px;
        }
        .tasks {
          width: 100%;
        }
        .task {
          height: 48px;
          width: 100%;
          margin: 8px 0;
          padding: 4px 8px;
          display: block;
        }
      </style>
    `;
  }

  _renderStage(stage, canCreateTask) {
    let taskList = stage.tasks ?
      html`${stage.tasks.map((task) => this._renderTask(task))}` :
      html `No task`;
    let actions = canCreateTask ? html`<paper-button ripple on-click="${() => this._openCreateTaskDialog()}">New task...</paper-button>` : null;
    return html`
      <paper-card class="stage" id="${stage.id}">
        <div class="header">
          ${stage.name}
        </div>
        <div class="content">
          ${taskList}
        </div>
        <div class="actions">
          ${actions}
        </div>
      </paper-card>
    `;
  }

  _renderTask(task) {
    return html`
      <paper-card class="task" id="">
        ${task.title}
      </paper-card>
    `;
  }
}

customElements.define('mk-stage-list', MkStageList);

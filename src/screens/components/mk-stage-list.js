import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';
import './mk-stage-column';
import './mk-task-item';

class MkStageList extends LitElement {
  constructor() {
    super();
    this.shouldMoveTaskEventFire = true;

    // TODO: this is just a temporary fix for state change => re-order stage again
    this.shadowStages = [];
    this.selectedIndex = -1;
  }

  static get properties() {
    return {
      stages: Array,
      shadowStages: Array,
      shouldMoveTaskEventFire: Boolean,
      selectedIndex: Number,
    };
  }

  _fireStageSelectionChanged() {
    this.dispatchEvent(new CustomEvent('stage-selection-changed', {
      detail: {
        selected: this.selectedIndex !== -1,
        stageId: this.selectedIndex !== -1 ? this.shadowStages[this.selectedIndex].id : null,
      },
    }));
  }

  _moveStage(oldIndex, newIndex) {
    this.dispatchEvent(new CustomEvent('move-stage', {detail: {oldIndex, newIndex}}));
  }

  _moveTask(from, to, oldIndex, newIndex) {
    from = from.id;
    to = to.id;
    // only emit 1 event
    this.shouldMoveTaskEventFire = !this.shouldMoveTaskEventFire;
    if (this.shouldMoveTaskEventFire) {
      this.dispatchEvent(new CustomEvent('move-task', {detail: {from, to, oldIndex, newIndex}}));
    }
  }

  _firstRendered() {
    this.shadowStages = this.stages;
    let stageListContainer = this.shadowRoot.querySelector('#list');
    Sortable.create(stageListContainer, {
      animation: 100,
      draggable: '.stage',
      handle: '.header',
      chosenClass: 'item-old',
      dragClass: 'item-dragging',
      ghostClass: 'item-new',
      onSort: (evt) => {
        this._moveStage(evt.oldIndex, evt.newIndex);
      },
    });
    let taskListContainer = stageListContainer.getElementsByClassName('content');
    for (let cardList of taskListContainer) {
      Sortable.create(cardList, {
        group: 'card',
        draggable: '.task',
        animation: 100,
        chosenClass: 'item-old',
        dragClass: 'item-dragging',
        ghostClass: 'item-new',
        onSort: (evt) => {
          this._moveTask(evt.from, evt.to, evt.oldIndex, evt.newIndex);
        },
      });
    }
  }

  _render({shadowStages, selectedIndex}) {
    return html`
      ${this._renderStyles()}
      <div id="list">
        ${shadowStages.map((stage, index) => this._renderStage(stage, index, index === selectedIndex))}
      </div>  
    `;
  }

  _renderStyles() {
    return html`
      <style>
        :host {
            display: block;
        }
        #list {
            white-space: nowrap;
            width: auto;
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
          width: 256px;
          margin: 0 16px;
          padding: 8px;
        }
        .stage.active {
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
        }
        .task {
          height: 48px;
          line-height: 48px;
          width: 100%;
          margin: 8px 0;
          padding: 4px 8px;
          display: block;
          cursor: pointer;
          border-radius: 4px;
        }
        .no-task {
          text-align: center;
          opacity: 0.8;
          padding: 16px 0;
        }
        .item-new {
          opacity: 0.2;
          border: 1px dashed black;
        }
        .item-dragging {
          opacity: 1;
        }
      </style>
    `;
  }

  _onStageClicked(index) {
    if (index !== this.selectedIndex) {
      this.selectStage(index);
    } else {
      this.deSelectStage();
    }
    this._fireStageSelectionChanged();
  }

  selectStage(index) {
    this.selectedIndex = index;
  }

  deSelectStage() {
    this.selectedIndex = -1;
  }

  _onCreateTaskClicked(stageId) {
    this.dispatchEvent(new CustomEvent('create-task', {
      detail: {
        stageId,
      },
    }));
  }

  _renderStage(stage, index, isActive) {
    let classes = `stage ${isActive ? 'active' : ''}`;
    let taskList = stage.tasks.length > 0 ?
      html`${stage.tasks.map((task) => this._renderTask(task))}` : null;
    // html `<div class="no-task">No task. Drop new task here !</div>`;
    return html`
      <mk-stage-column 
        class$="${classes}" 
        stage="${stage}" 
        canCreateTask="${stage.canCreateTask}" 
        on-create-task-button-click="${() => this._onCreateTaskClicked(stage.id)}"
        on-select="${() => this._onStageClicked(index)}">
        <div class="content" id="${stage.id}" data-index-number="${index}">
          ${taskList}
        </div>
      </mk-stage-column>
    `;
  }

  _renderTask(task) {
    return html`
      <paper-card class="task">
        <mk-task-item task="${task}">
      </paper-card>
    `;
  }
}

customElements.define('mk-stage-list', MkStageList);

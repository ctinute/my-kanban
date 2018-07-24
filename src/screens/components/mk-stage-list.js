import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';
import './mk-stage-column';
import './mk-task-item';
import './mk-stage-editor';

class MkStageList extends LitElement {
  constructor() {
    super();
    this.shouldMoveTaskEventFire = true;
    this.shouldRerender = true;

    this.selectedStageId = null;
    this.selectedStage = null;
    this.selectedTaskId = null;
    this.selectedTask = null;
    this.editMode = false;
  }

  static get properties() {
    return {
      phase: Object,
      stages: Array,
      selectedIndex: Number,
      shouldMoveTaskEventFire: Boolean,
      shouldRerender: Boolean,
      selectedTaskId: String,
      selectedTask: Object,
      selectedStageId: String,
      selectedStage: Object,
      editMode: Boolean,
    };
  }

  _shouldRender(props, changedProps, oldProps) {
    return this.shouldRerender;
  }

  _firstRendered() {
    this._initSortable();
  }

  _initSortable() {
    let stageListContainer = this.shadowRoot.querySelector('#list');
    Sortable.create(stageListContainer, {
      animation: 100,
      draggable: '.column',
      handle: '.header',
      chosenClass: 'item-old',
      dragClass: 'item-dragging',
      ghostClass: 'item-new',
      onSort: (evt) => {
        this._fireMoveStageEvent(evt.oldIndex, evt.newIndex);
      },
    });
    let taskListContainer = stageListContainer.getElementsByClassName('column-content');
    for (let cardList of taskListContainer) {
      Sortable.create(cardList, {
        group: 'card',
        draggable: '.task',
        animation: 100,
        chosenClass: 'item-old',
        dragClass: 'item-dragging',
        ghostClass: 'item-new',
        onSort: (evt) => {
          this._fireMoveTaskEvent(evt.from, evt.to, evt.oldIndex, evt.newIndex);
        },
      });
    }
  }

  // PUBLIC METHODS
  selectTask(taskId) {
    this.shouldRerender = true;
    this.selectedTaskId = taskId;
    if (taskId === null) {
      this.selectedStageId = null;
    }
  }

  selectStage(stageId) {
    this.shouldRerender = true;
    this.selectedStageId = stageId;
  }

  // STAGE EVENTS
  _fireCreateStageEvent() {
    this.dispatchEvent(new CustomEvent('create-stage'));
  }

  _fireSelectStageEvent(stageId) {
    this.shouldRerender = true;
    this.dispatchEvent(new CustomEvent('select-stage', {detail: {stageId}}));
  }

  _fireMoveStageEvent(oldIndex, newIndex) {
    // console.log('set skip next render');
    this.shouldRerender = false;
    this.dispatchEvent(new CustomEvent('move-stage', {detail: {oldIndex, newIndex}}));
  }

  // TASK EVENTS
  _fireCreateTaskEvent(stageId) {
    this.shouldRerender = true;
    this.dispatchEvent(new CustomEvent('create-task', {
      detail: {
        stageId,
      },
    }));
  }

  _fireSelectTaskEvent(taskId) {
    this.dispatchEvent(new CustomEvent('select-task', {detail: {taskId}}));
  }

  _fireMoveTaskEvent(from, to, oldIndex, newIndex) {
    // console.log('set skip next render');
    this.shouldRerender = false;
    from = from.id;
    to = to.id;
    // skip emitting 1 event if moving card to another stage
    if (from !== to) {
      this.shouldMoveTaskEventFire = !this.shouldMoveTaskEventFire;
    }
    if (this.shouldMoveTaskEventFire) {
      this.dispatchEvent(new CustomEvent('move-task', {detail: {from, to, oldIndex, newIndex}}));
    }
  }

  // EVENT HANDLERS
  _onClickTask(taskId, stageId) {
    if (taskId !== this.selectedTaskId) {
      this.selectTask(taskId);
      this.selectStage(stageId);
      this._fireSelectTaskEvent(taskId);
    } else {
      // this.selectTask(null);
      // this.selectStage(null);
      // this._fireSelectTaskEvent(null);
    }
  }

  _onClickStage(stageId) {
    if (stageId !== this.selectedStageId) {
      this.selectStage(stageId);
      this._fireSelectStageEvent(stageId);
    } else {
      // this.selectStage(null);
      // this._fireSelectStageEvent(null);
    }
  }

  // noinspection JSMethodCanBeStatic
  _createDisplayStages(phase) {
    // console.log('_createDisplayStages');
    if (!phase.stages) {
      phase.stages = [];
    }
    let stages = [];
    // re-order stage details
    for (let i = 0; i < phase.stages.length; i++) {
      let stage = JSON.parse(JSON.stringify(phase.stageDetails[phase.stages[i]]));
      // add cards to stage detail
      if (stage.tasks) {
        for (let j = 0; j < stage.tasks.length; j++) {
          stage.tasks[j] = phase.taskDetails[stage.tasks[j]];
        }
      } else {
        stage.tasks = [];
      }
      stages.push(stage);
    }
    return stages;
  }

  // noinspection JSMethodCanBeStatic
  _renderStyles() {
    return html`
      <style>
        :host {
          display: block;
        }
        #list {
          height: 100%;
          width: 100%;
          padding: 8px 0;
          position: relative;
          vertical-align: top;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
        }
        /*#list.full {*/
          /*height: 100%;*/
          /*width: 100%;*/
        /*}*/
        #new-stage-btn {
          display: inline-block;
          vertical-align: top;
          width: 256px;
          margin: 0 16px;
          padding: 8px;
          font-size: 1.2em;
          line-height: 2.5em;
          height: 2.5em;
          text-align: center;
        }
        .column {
          display: inline-block;
          max-height: 100%;
          width: 256px;
          vertical-align: top;
          box-sizing: border-box;
          opacity: 1;
          transition: width, opacity, margin;
          transition-duration: 0.3s;
        }
        .stage {
          width: 90%;
          max-width: 600px;
          margin: auto;
          border-radius: 4px;
          transition: box-shadow, background-color;
          transition-duration: 0.3s;
        }
        .column.active {
          width: 100%;
        }
        .column.active .stage {
          background-color: #fafafa;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
        }
        .column.inactive {
          width: 0;
          opacity: 0;
        }
        .column.inactive .stage {
          box-shadow: none;
        }
        .column-content {
          min-height: 16px;
        }
        .column-editor {
          padding: 16px;
          max-height: 999px;
          overflow: hidden;
          opacity: 1;
          transition: padding, opacity, max-height;
          transition-duration: 0.3s;
        }
        .column-editor.hidden {
          padding: 0;
          max-height: 0;
          opacity: 0;
        }
        .task {
          width: 100%;
          max-height: 999px;
          margin: 8px 0;
          cursor: pointer;
          transition: max-height, box-shadow, opacity;
          transition-duration: 0.3s;
          transition-delay: 0.3s;
          box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
        }
        .column.active.selecting-task .task.OVERVIEW {
          max-height: 0;
          opacity: 0;
          box-shadow: none;
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

  _renderStage(stage, selectedStageId, selectedTaskId, editMode) {
    let classes = 'column';
    if (selectedTaskId !== null) {
      classes += ' selecting-task';
    }
    if (selectedStageId !== null) {
      if (selectedStageId === stage.id) {
        classes += ' active';
      } else {
        classes += ' inactive';
      }
    }
    let taskList = stage.tasks || [];
    return html`
      <div class$="${classes}">
        <mk-stage-column 
          class="stage" 
          stage="${stage}"  
          on-create-task-button-click="${() => this._fireCreateTaskEvent(stage.id)}"
          on-select="${() => this._onClickStage(stage.id)}">
          <div class="column-content" id="${stage.id}">
            <div class$="${(selectedStageId === stage.id && selectedTaskId === null && editMode) ? 'column-editor' : 'column-editor hidden'}">
              <mk-stage-editor class="editor" stage="${stage}"></mk-stage-editor>
            </div>
            ${taskList.map((task) => html`
              <mk-task-item 
                class$="${'task ' + (selectedTaskId === task.id ? editMode ? 'EDIT' : 'DETAIL' : 'OVERVIEW')}" 
                task="${task}" 
                mode="${(selectedTaskId === task.id ? editMode ? 'EDIT' : 'DETAIL' : 'OVERVIEW')}"
                on-click="${() => this._onClickTask(task.id, stage.id)}"></mk-task-item>
            `)}
          </div>
        </mk-stage-column>
      </div>
    `;
  }

  _render({phase, selectedStageId, selectedTaskId, editMode}) {
    let styles = this._renderStyles();
    let stages = this._createDisplayStages(phase);
    return html`
      ${styles}
      <div id="list">
        ${stages.map((stage) => this._renderStage(stage, selectedStageId, selectedTaskId, editMode))}
        <paper-button id="new-stage-btn" hidden?="${selectedStageId || selectedTaskId}" flat on-click="${() => this._fireCreateStageEvent()}">New stage</paper-button>
      </div>
    `;
  }
}

customElements.define('mk-stage-list', MkStageList);

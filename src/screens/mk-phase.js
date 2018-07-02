import {html} from '@polymer/lit-element';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-button/paper-button';
import './components/mk-stage-list';
import './components/mk-dialog-create-stage';
import './components/mk-dialog-create-task';
import {createStageAction, deleteStageAction, moveStageAction} from '../actions/stage';
import {MkScreen} from './mk-screen';
import {showDialog} from '../actions/app';
import {createTaskAction, moveTaskAction} from '../actions/task';
import {navigate} from "../actions/route";


export default class MkPhase extends MkScreen {
  constructor() {
    super();
    this.selectedStage = null;
    this.firstRender = true;
  }

  static get properties() {
    return {
      project: Object,
      phase: Object,
      selectedStage: Object,
      firstRender: Boolean,
    };
  }

  _stateChanged(state) {
    this.project = state.userData.projects[state.route.data.projectId];
    this.phase = this.project ? this.project.phases[state.route.data.phaseId] : null;
  }

  _didRender(props, changedProps, oldProps) {
    // since props.project does not exist in first render, using custom firstRender boolean flag instead
    if (props.firstRender) {
      this._requireDefaultToolbar();
      this._setDefaultToolbar(html`
        <style>
          .page-title {
            width: auto;
            height: 32px;
            box-sizing: border-box;
            margin: 8px 0;
            padding: 4px 16px;
            line-height: 24px;
            border-radius: 16px;
            background-color: white;
            box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);;
          }
          a, a:visited {
            text-decoration: none;
            color: black;
            font-size: 16px;
          }
          a:hover {
            color: #2f4fb7;
          }
          .title-separator {
            margin: 0 4px;
            font-size: 0.8em;
          }
        </style>
        <div class="page-title">
          <a href="/u/${props.project.id}">${props.project.name}</a>
          <span class="title-separator"> / </span>
          <a href="/u/${props.project.id}/${props.phase.id}">${props.phase.name}</a>
        </div>
      `);
      this._showToolbar();
      this._requireDrawerShorcuts([
        {
          icon: 'icons:dashboard',
          title: 'Dashboard',
          action: () => this._dispatch(navigate('Dashboard', '/u')),
        },
        {
          icon: 'icons:view-day',
          title: 'Current phase',
          active: this.phase.id === this.project.currentPhase,
          action: () => this._dispatch(navigate('Dashboard', `/u/${this.project.id}/${this.project.currentPhase}`)),
        },
        {
          icon: 'icons:view-agenda',
          title: 'Phases',
          action: () => this._dispatch(navigate('Dashboard', `/u/${this.project.id}`)),
        },
      ]);
      this.firstRender = false;
    }
  }

  _createStage(stage) {
    stage.projectId = this.project.id;
    stage.phaseId = this.phase.id;
    this._dispatch(createStageAction(stage));
  }

  _moveStage(src, des) {
    const stageId = this.phase.stages[src];
    let stage = this.phase.stageDetails[stageId];
    this._dispatch(moveStageAction(stage, src, des));
  }

  _deleteStage() {
    this._dispatch(deleteStageAction(this.selectedStage));
  }

  _selectStage(stageId) {
    if (stageId) {
      this.selectedStage = this.phase.stageDetails[stageId];
      this._setActionToolbar(html`
        <div main-title>Select an action</div>
        <paper-icon-button icon="edit"></paper-icon-button>
        <paper-icon-button icon="delete" on-click="${() => this._deleteStage()}"></paper-icon-button>
        <paper-icon-button icon="close" on-click="${() => this._deselectStage()}"></paper-icon-button>
      `);
      this._requireActionToolbar();
    } else {
      this._setActionToolbar(null);
      this._requireDefaultToolbar();
    }
  }

  _deselectStage() {
    this.selectedStage = null;
    this.shadowRoot.querySelector('mk-stage-list').selectStage(null);
    this._requireDefaultToolbar();
  }

  _createTask(task, stageId) {
    task.projectId = this.project.id;
    task.phaseId = this.phase.id;
    task.stageId = stageId;
    this._dispatch(createTaskAction(task));
  }

  _moveTask(from, to, oldIndex, newIndex) {
    const taskId = this.phase.stageDetails[from].tasks[oldIndex];
    let task = this.phase.taskDetails[taskId];
    this._dispatch(moveTaskAction(task, to, oldIndex, newIndex));
  }

  _openCreateStageDialog() {
    let dialog = html`
      <mk-dialog-create-stage
        on-submit="${(e) => this._createStage(e.detail.stage)}"
        on-cancel="${() => console.log('cancelled')}"></mk-dialog-create-stage>`;
    this._dispatch(showDialog(dialog, null));
  }

  _openCreateTaskDialog(stageId) {
    let dialog = html`
      <mk-dialog-create-task
        on-submit="${(e) => this._createTask(e.detail.task, stageId)}"
        on-cancel="${() => console.log('cancelled')}"></mk-dialog-create-task>`;
    this._dispatch(showDialog(dialog, null));
  }

  // noinspection JSMethodCanBeStatic
  _renderStyles() {
    return html`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        mk-stage-list {
          height: 100%;
          width: 100%;
        }
      </style>
    `;
  }

  _render({phase}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <mk-stage-list
        phase="${phase}"
        on-create-stage="${(e) => this._openCreateStageDialog()}"
        on-create-task="${(e) => this._openCreateTaskDialog(e.detail.stageId)}"
        on-select-stage="${(e) => this._selectStage(e.detail.stageId)}"
        on-select-task="${(e) => this._selectTask(e.detail.taskId)}"   
        on-move-stage="${(e) => this._moveStage(e.detail.oldIndex, e.detail.newIndex)}"
        on-move-task="${(e) => this._moveTask(e.detail.from, e.detail.to, e.detail.oldIndex, e.detail.newIndex)}">
      </mk-stage-list>
    `;
  }
}

customElements.define('mk-phase', MkPhase);

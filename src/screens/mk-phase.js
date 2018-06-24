/* eslint-disable no-console */
import {html} from '@polymer/lit-element';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-button/paper-button';
import './components/mk-stage-list';
import './components/mk-dialog-create-stage';
import './components/mk-dialog-create-task';
import {Actions} from '../actions';
import {move} from '../actions/stage';
import {MkScreen} from './mk-screen';


export default class MkPhase extends MkScreen {
  static get properties() {
    return {
      project: Object,
      phase: Object,
    };
  }

  _stateChanged(state) {
    this.project = state.userData.projects[state.route.data.projectId];
    this.phase = this.project ? this.project.phases[state.route.data.phaseId] : null;
  }

  _didRender(props, oldProps, changedProps) {
    this._requireDefaultToolbar();
    this._setDefaultToolbar(html`
      <div main-title>
        <a href="/u/${props.project.id}">${props.project.name}</a>
        <span class="title-seperator"> / </span>
        <a href="/u/${props.project.id}/${props.phase.id}">${props.phase.name}</a>
      </div>
    `);
    this._showToolbar();
  }

  _createStage(stage) {
    this._dispatch(Actions.stage.add(stage, this.project.Id, this.phase.id));
  }

  _moveStage(src, des) {
    this._dispatch(move(src, des, this.project.id, this.phase.id));
  }

  _selectStage(e) {
    this._setActionToolbar(html`
      <div main-title>Select an action</div>
      <paper-icon-button icon="edit"></paper-icon-button>
      <paper-icon-button icon="delete"></paper-icon-button>
      <paper-icon-button icon="close" on-click="${() => this._deselectStage()}"></paper-icon-button>
    `);
    this._requireActionToolbar();
    // this.selectedStageId = e.detail.stageId;
  }

  _deselectStage() {
    this.shadowRoot.querySelector('#stageList').deSelectStage();
    this._requireDefaultToolbar();
  }

  _createTask(task, stageId) {
    task.projectId = this.project.id;
    task.phaseId = this.phase.id;
    task.stageId = stageId;
    console.log('_createTask');
    this._dispatch(Actions.task.add(task));
  }

  _openCreateStageDialog() {
    let dialog = html`
      <mk-dialog-create-stage
        on-submit="${(e) => this._createStage(e.detail.stage)}"
        on-cancel="${() => console.log('cancelled')}"></mk-dialog-create-stage>`;
    this._dispatch(Actions.app.showDialog(dialog, null));
  }

  _openCreateTaskDialog(stageId) {
    let dialog = html`
      <mk-dialog-create-task
        on-submit="${(e) => this._createTask(e.detail.task, stageId)}"
        on-cancel="${() => console.log('cancelled')}"></mk-dialog-create-task>`;
    this._dispatch(Actions.app.showDialog(dialog, null));
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
        .content {
          height: 100%;
        }
        .horizontal-list {
          width: auto;
          white-space: nowrap;
          overflow-y: hidden;
          overflow-x: scroll;
        }
        .horizontal-list > .list-item {
          display: inline-block;
          vertical-align: top;
        }
        
        mk-stage-list {
          height: 100%;
          width: auto;
        }
        
        #new-stage {
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
      </style>
    `;
  }

  _render({phase}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <div class="content horizontal-list">
        <mk-stage-list 
          id="stageList"
          class="list-item"
          phase="${phase}"
          on-select-stage="${(e) => this._selectStage(e)}"
          on-move-stage="${(e) => this._moveStage(e.detail.oldIndex, e.detail.newIndex)}"
          on-move-task="${(e) => console.log(e)}"
          on-create-task="${(e) => this._openCreateTaskDialog(e.detail.stageId)}">
        </mk-stage-list>
        <div class="list-item">
          <paper-button id="new-stage" flat on-click="${() => this._openCreateStageDialog()}">New stage</paper-button>
        </div>
      </div>
    `;
  }
}

customElements.define('mk-phase', MkPhase);

/* eslint-disable no-console */
import {html} from '@polymer/lit-element';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button';
import '@polymer/paper-card';
import './components/mk-stage-list';
import './components/mk-dialog-create-stage';
import {Actions} from '../actions';
import {move} from '../actions/stage';
import {MkScreen} from './mk-screen';


export default class MkPhase extends MkScreen {
  static get properties() {
    return {
      user: Object,
      projectId: String,
      phaseId: String,
      project: Object,
      phase: Object,
      selectedStageIndex: Number,
    };
  }

  _stateChanged(state) {
    this.user = state.auth.user;
    this.projectId = state.route.data.projectId;
    this.phaseId = state.route.data.phaseId;
    this.project = state.userData.projects[this.projectId];
    this.phase = this.project ? this.project.phases[this.phaseId] : null;
    this.selectedStageIndex = -1;
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
    this._dispatch(Actions.stage.add(stage, this.projectId, this.phaseId));
  }
  _openCreateStageDialog() {
    let dialog = html`
      <mk-dialog-create-stage
        on-submit="${(e) => this._createStage(e.detail.stage)}"
        on-cancel="${() => console.log('cancelled')}"></mk-dialog-create-stage>`;
    this._dispatch(Actions.app.showDialog(dialog, null));
  }

  _renderStyles() {
    return html`
      <style>
        :host {
            display: block;
            width: 100%;
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

  _moveStage(src, des) {
    this._dispatch(move(src, des, this.projectId, this.phaseId));
  }

  _onSelectStage(e) {
    this._setActionToolbar(html`
      <div main-title>Select an action</div>
      <paper-icon-button icon="edit"></paper-icon-button>
      <paper-icon-button icon="delete"></paper-icon-button>
      <paper-icon-button icon="close" on-click="${() => this._deselectStage()}"></paper-icon-button>
    `);
    this._requireActionToolbar();
    this.selectedStage = e.detail.stageId;
  }

  _deselectStage() {
    // TODO: not working
    this.selectedStageIndex = -1;
  }

  _render({project, phase, showToolbar, selectedStageIndex}) {
    let styles = this._renderStyles();
    let stages = this._createDisplayStages(phase);
    return html`
      ${styles}
      <div class="content horizontal-list">
        <mk-stage-list 
          id="stageList"
          class="list-item"
          stages="${stages}"
          selectedIndex="${selectedStageIndex}"
          on-stage-selection-changed="${(e) => this._onSelectStage(e)}"
          on-move-stage="${(e) => this._moveStage(e.detail.oldIndex, e.detail.newIndex)}"
          on-move-task="${(e) => console.log(e)}">
        </mk-stage-list>
        <div class="list-item">
          <paper-button id="new-stage" flat on-click="${() => this._openCreateStageDialog()}">New stage</paper-button>
        </div>
      </div>
    `;
  }

  _createDisplayStages(phase) {
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
}

customElements.define('mk-phase', MkPhase);

import {LitElement} from '@polymer/lit-element';

export class PageViewElement extends LitElement {
  static get properties() {
    return {
      active: Boolean,
    };
  }

  static get route() {
  }

  // Only render this page if it's actually visible.
  _shouldRender(props, changedProps, old) {
    return props.active;
  }
}

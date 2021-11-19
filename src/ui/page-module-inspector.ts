import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('page-module-inspector')
export class PageBuilderInspector extends LitElement {
  @property({type: String, attribute: 'partial'})
  partial = '';

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    // Update after DOM is generated to update the module ID.
    window.setTimeout(() => {
      this.requestUpdate();
      this.addIdToPageModule();
    });
  }

  addIdToPageModule() {
    const pageModule = this.closest('page-module');
    if (pageModule) {
      pageModule.id = this.elementId;
    }
  }
  
  get allInspectors() {
    return Array.from(document.querySelectorAll('page-module-inspector'));
  }

  get moduleIndex() {
    return this.allInspectors.indexOf(this) + 1;
  }

  get enabled() {
    return new URLSearchParams(window.location.search).get('help') !== '0';
  }

  get elementId() {
    return `m${this.moduleIndex}-${this.partial}`;
  }

  static get styles() {
    return [
      css`
        .help-box {
          background: #2C2C2C;
          border-bottom-right-radius: 5px;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
          font-size: 10px;
          font-weight: 500;
          padding: 5px 8px;
          position: absolute;
        }
        .help-box__label {
          cursor: default;
          display: inline-block;
        }
        .help-box__label a {
          color: inherit;
          text-decoration: none;
        }
        .help-box__label a:hover {
          text-decoration: underline;
        }
      `,
    ];
  }

  render() {
    return this.enabled
      ? html`
        <div class="help-box">
          <div class="help-box__label">
            <a href="#${this.elementId}">
              ${this.allInspectors.length > 1 ? `${this.moduleIndex}. ` : ''}
              ${this.partial}
            </a>
          </div>
        </div>
        `
      : '';
  }
}
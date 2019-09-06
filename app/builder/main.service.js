import { factory } from './main.controller';
import * as blocks from './blocks';

let defaultTinymceConfig = {
  plugins: 'autolink lists link hr paste textcolor directionality',
  toolbar:
    'undo redo | bold italic fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | link hr | ltr rtl',
  fontsize_formats:
    '8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 18pt 20pt 24pt 28pt 32pt 36pt 40pt 44pt 46pt 50pt',
  menubar: false,
  inline: true,
  theme_url:
    'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.8.3/themes/modern/theme.min.js'
};

let config = {
  mjmlPublicKey: null,
  mjmlApplicationId: null,
  xApiKey: null,
  mjmlCompileAdress: null,
  exportHtml: !process.env.prod,
  deleteAllBlocks: !process.env.prod,
  trackEvents: process.env.prod
};

let defaultFont = {
  family: 'Tahoma, Geneva, sans-serif',
  size: 16,
  weight: 'normal',
  color: '#4d4d4d'
};

class NgjsService {
  constructor($templateCache) {
    this.$tmpl = $templateCache;
    this.listeners = { save: [], init: [], browse: [], delete: [] };
    this.elements = new Map();
    this.fonts = new Set([
      'Palatino Linotype, Book Antiqua, Palatino, serif',
      'Times New Roman, Times, serif',
      'Arial, Helvetica, sans-serif',
      'Arial Black, Gadget, sans-serif',
      'Comic Sans MS, cursive, sans-serif',
      'Impact, Charcoal, sans-serif',
      'Lucida Sans Unicode, Lucida Grande, sans-serif',
      'Tahoma, Geneva, sans-serif',
      'Trebuchet MS, Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif',
      'Courier New, Courier, monospace',
      'Lucida Console, Monaco, monospace'
    ]);
    this.fontWeights = new Set(['bold', 'lighter', 'normal', 300, 600, 900]);
    for (const key in blocks) {
      const { defaults, element } = blocks[key];
      this.elements.set(key, { defaults, element });
      this.$tmpl.put(key, `<${key}-b options="element.defaults"></${key}-b>`);
    }
  }

  get defaultFont() {
    return defaultFont;
  }

  set defaultFont(obj) {
    defaultFont = { ...defaultFont, ...obj };
  }

  set tinymceOptions(customOptions) {
    defaultTinymceConfig = { ...defaultTinymceConfig, ...customOptions };
  }

  get tinymceOptions() {
    return defaultTinymceConfig;
  }

  set config(customCons) {
    config = { ...config, ...customCons };
  }

  get config() {
    return config;
  }

  on(event, cb) {
    if (process.env.scope == 'demo' && ['save', 'init'].includes(event)) {
      console.info('Save event is disabled in demo.');
    } else {
      if (!Object.keys(this.listeners).includes(event)) {
        console.error('No such event listener', event);
      } else {
        this.listeners[event].push(cb);
      }
    }
  }

  emit(event, data = {}) {
    if (process.env.scope == 'demo' && event == 'save') {
      return;
    } else {
      if (!Object.keys(this.listeners).includes(event)) {
        console.error('No such event listener', event);
      } else {
        this.listeners[event].forEach(cb => cb(data));
      }
    }
  }

  off(event) {
    if (!Object.keys(this.listeners).includes(event)) {
      console.error('No such event listener', event);
    } else {
      this.listeners[event] = [];
    }
  }

  getDefaultEmailStructure() {
    return {
      newEmailName: 'My new email template',
      emailOptions: {
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        backgroundColor: '#273142',
        font: this.defaultFont,
        direction: 'ltr',
        width: 800
      },
      elements: []
    };
  }

  addTinymceToolbarButton(button = '', index = null, removeCount = 0) {
    const toolbar = this.tinymceOptions.toolbar.split(' | ');
    toolbar.splice(index || toolbar.length, removeCount, button);
    defaultTinymceConfig = {
      ...defaultTinymceConfig,
      toolbar: toolbar.join(' | ')
    };
  }

  addTinymcePlugin(plugin = '') {
    const plugins = this.tinymceOptions.plugins.split(' ');
    plugins.push(plugin);
    defaultTinymceConfig = {
      ...defaultTinymceConfig,
      plugins: plugins.join(' ')
    };
  }

  $get() {
    return this;
  }
}

export default factory('ngjs', [
  '$templateCache',
  (...args) => new NgjsService(...args)
]);

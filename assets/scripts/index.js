class CodeSnippets {
  static create() {
    return new CodeSnippets();
  }

  constructor() {
    this.initialiseObject();
    this.addCodeSnippetLabels();
  }

  initialiseObject() {
    this.languages = [
      { cssClass: '.language-ts', label: 'TypeScript' },
      { cssClass: '.language-typescript', label: 'TypeScript' },
      { cssClass: '.language-html', label: 'HTML' },
      { cssClass: '.language-css', label: 'CSS' },
      { cssClass: '.language-console', label: 'Console' }
    ];
  }

  addCodeSnippetLabels() {
    this.languages.forEach((language) => {
      const instances = document.querySelectorAll(language.cssClass);

      instances.forEach((instance) => {
        const element = this.createNewElement(language.label);
        instance.appendChild(element);
      });
    });
  }

  createNewElement(label) {
    const inputElement = document.createElement('div');
    inputElement.classList.add('codeLabel');
    inputElement.innerText = label;

    return inputElement;
  }
}

class ScrollSpy {
  static create() {
    return new ScrollSpy();
  }

  constructor() {
    this.headerContainer = document.querySelector('.header-container');
    this.header = document.querySelector('.header-content');

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('header-content--mini');
      this.headerContainer.classList.add('header-container--mini');
    } else {
      this.header.classList.remove('header-content--mini');
      this.headerContainer.classList.remove('header-container--mini');
    }
  }
}

class ThemeSwitcher {
  static create() {
    return new ThemeSwitcher();
  }

  constructor() {
    this.button = document.querySelector('#themeSwitch');
    this.setTheme();
    this.listenToThemeSwitch();
  }

  setTheme() {
    const currentTheme = localStorage.getItem('theme');
    const body = document.querySelector('body');

    if (currentTheme === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      this.button.innerText = '☀️';
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      this.button.innerText = '🌙';
    }
  }

  listenToThemeSwitch() {
    this.button.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark') {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }

      this.setTheme();
    });
  }
}

class ContentsTable {
  static create() {
    return new ContentsTable();
  }

  constructor() {
    const headers = document.querySelectorAll('.post-content h2, h3');

    if (!headers.length) {
      return;
    }

    this.headerMenuContainer = document.querySelector('.post-headerList');
    this.hasH2Headers = this.hasH2Tags(headers);

    headers.forEach(this.appendHeaderToList.bind(this));
  }

  appendHeaderToList(header) {
    const link = this.createHeaderLink({
      id: header.id,
      element: header.localName,
      title: this.idToString(header.id)
    });

    this.headerMenuContainer.appendChild(link);
  }

  idToString(id) {
    const normalisedString = id.split('-').join(' '),
      capitalisedString = normalisedString.charAt(0).toUpperCase() + normalisedString.slice(1);

    return capitalisedString;
  }

  hasH2Tags(headers) {
    const elementList = Array.from(headers).map((header) => header.localName);
    return elementList.indexOf('h2') !== -1;
  }

  createHeaderLink(headerLinkConfig) {
    const link = document.createElement('a');

    link.href = `#${headerLinkConfig.id}`;
    link.classList.add('post-headerLink');
    link.textContent = `📍 ${headerLinkConfig.title}`;

    if (headerLinkConfig.element === 'h3' && this.hasH2Headers) {
      link.classList.add('post-headerLink--indented');
    }

    return link;
  }
}

class App {
  static create() {
    return new App();
  }

  constructor() {
    ThemeSwitcher.create();
    ScrollSpy.create();
    CodeSnippets.create();
    ContentsTable.create();
  }
}

App.create();

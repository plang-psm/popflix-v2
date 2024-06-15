describe('Test links on the mobile navbar', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.getDataTest('mobile-hamburger-menu-open').click();
  });
  it('Test logo to direct home page', () => {
    cy.getDataTest('mobile-nav-title').click({ force: true });
    cy.location('pathname').should('eq', '/');
  });
  it('Test home to direct home page', () => {
    cy.getDataTest('mobile-home').click();
    cy.location('pathname').should('eq', '/');
  });
  it('Test extra links for movies', () => {
    cy.getDataTest('mobile-movies-now-playing').click();
    cy.location('pathname').should('eq', '/moviehome/now_playing');
  });
  it('Test extra links for movies', () => {
    cy.getDataTest('mobile-movies-top-rated').click();
    cy.location('pathname').should('eq', '/moviehome/top_rated');
  });
  it('Test extra links for movies', () => {
    cy.getDataTest('mobile-movies-popular').click();
    cy.location('pathname').should('eq', '/moviehome/popular');
  });
  it('Test extra links for tv shows', () => {
    cy.getDataTest('mobile-tv-on-the-air').click();
    cy.location('pathname').should('eq', '/tvhome/on_the_air');
  });
  it('Test extra links for tv shows', () => {
    cy.getDataTest('mobile-tv-top-rated').click();
    cy.location('pathname').should('eq', '/tvhome/top_rated');
  });
  it('Test extra links for tv shows', () => {
    cy.getDataTest('mobile-tv-popular').click();
    cy.location('pathname').should('eq', '/tvhome/popular');
  });
  it('Test extra links for tv shows', () => {
    cy.getDataTest('mobile-login').click();
    cy.location('pathname').should('eq', '/users/login');
  });
});
describe('Test logout and profile links on mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/users/login');
    cy.location('pathname').should('eq', '/users/login');
    cy.contains(/login/i);
    cy.getDataTest('email-input').type('p@gmail.com');
    cy.getDataTest('pwd-input').type('p');
    cy.getDataTest('submit-button').click();
    cy.contains(/Logged in as/i).should('exist');
    cy.wait(5000);
    cy.getDataTest('mobile-hamburger-menu-open').click();
  });
  it('Test profile link on mobile', () => {
    cy.getDataTest('mobile-profile').click();
    cy.location('pathname').should('eq', '/watchlist');
  });
  it('Test logout link on mobile', () => {
    cy.getDataTest('mobile-logout').click();
    cy.location('pathname').should('eq', '/');
  });
});

describe('Test links on desktop navbar', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('/');
  });
  it('Test logo to direct home page', () => {
    cy.getDataTest('desktop-nav-title').click();
    cy.location('pathname').should('eq', '/');
  });
  it('Test dropdown links for movies', () => {
    cy.getDataTest('desktop-movies-dropdown').invoke('show');
    cy.getDataTest('desktop-movies-now-playing').click();
    cy.location('pathname').should('eq', '/moviehome/now_playing');

    cy.getDataTest('desktop-movies-dropdown').invoke('show');
    cy.getDataTest('desktop-movies-top-rated').click();
    cy.location('pathname').should('eq', '/moviehome/top_rated');

    cy.getDataTest('desktop-movies-dropdown').invoke('show');
    cy.getDataTest('desktop-movies-popular').click();
    cy.location('pathname').should('eq', '/moviehome/popular');
  });
  it('Test dropdown links for tv shows', () => {
    cy.getDataTest('desktop-tv-dropdown').invoke('show');
    cy.getDataTest('desktop-tv-on-the-air').click();
    cy.location('pathname').should('eq', '/tvhome/on_the_air');

    cy.getDataTest('desktop-tv-dropdown').invoke('show');
    cy.getDataTest('desktop-tv-top-rated').click();
    cy.location('pathname').should('eq', '/tvhome/top_rated');

    cy.getDataTest('desktop-tv-dropdown').invoke('show');
    cy.getDataTest('desktop-tv-popular').click();
    cy.location('pathname').should('eq', '/tvhome/popular');
  });
  it('Test login to direct to login', () => {
    cy.getDataTest('desktop-login').click();
    cy.location('pathname').should('eq', '/users/login');
  });
  it('Test profile to direct to logout', () => {
    cy.visit('/users/login');
    cy.contains(/login/i);
    cy.getDataTest('email-input').type('p@gmail.com');
    cy.getDataTest('pwd-input').type('p');
    cy.getDataTest('submit-button').click();
    cy.contains(/Logged in as/i).should('exist');
    cy.location('pathname').should('eq', '/');
    cy.wait(5000);
    cy.getDataTest('desktop-logout').click();
    cy.location('pathname').should('eq', '/');
  });
  it('Test profile to direct to login', () => {
    cy.visit('/users/login');
    cy.location('pathname').should('eq', '/users/login');
    cy.contains(/login/i);
    cy.getDataTest('email-input').type('p@gmail.com');
    cy.getDataTest('pwd-input').type('p');
    cy.getDataTest('submit-button').click();
    cy.contains(/Logged in as/i).should('exist');
    cy.wait(5000);
    cy.getDataTest('desktop-profile').click();
    cy.location('pathname').should('eq', '/watchlist');
  });
  it('Test search to function', () => {
    cy.getDataTest('desktop-search').click();
    cy.getDataTest('searchbar').should('be.visible');
    cy.getDataTest('close-searchbar').click();
    cy.getDataTest('desktop-search').should('be.visible');
  });
});

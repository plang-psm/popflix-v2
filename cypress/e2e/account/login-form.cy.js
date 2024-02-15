describe('Test Login form', () => {
  beforeEach(() => {
    cy.visit('/users/login');
  });
  it('Test email login', () => {
    cy.contains(/login/i)
    cy.getDataTest('email-input').type('p@gmail.com')
    cy.getDataTest('pwd-input').type('p')
    cy.getDataTest('submit-button').click()
    cy.contains(/Logged in as/i).should('exist')
    cy.location('pathname').should('eq', '/')
  });
});

describe('Test signup button on Login form', () => {
  beforeEach(() => {
    cy.visit('/users/login');
  });
  it('Test email login', () => {
    cy.getDataTest('signup-button').click()
    cy.location('pathname').should('eq', '/users/signup')
  });
});

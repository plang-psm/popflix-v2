describe('Test Signup form', () => {
    beforeEach(() => {
      cy.visit('/users/signup');
    });
    it('Test email signup', () => {
      cy.contains(/signup/i)
      cy.getDataTest('username-input').type('test');
      cy.getDataTest('email-input').type('test@gmail.com')
      cy.getDataTest('pwd-input').type('Test1234!')
      cy.getDataTest('confirm-pwd-input').type('Test1234!')
      cy.getDataTest('submit-button').click()
      cy.contains(/User already exist/i).should('exist')
    });
  });
  
  describe('Test login button on Signup form', () => {
    beforeEach(() => {
      cy.visit('/users/signup');
    });
    it('Test login button', () => {
      cy.getDataTest('login-button').click()
      cy.location('pathname').should('eq', '/users/login')
    });
  });
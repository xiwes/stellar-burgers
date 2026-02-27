Cypress.Commands.add('setAuth', () => {
  window.localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'Bearer test-access-token');
});

Cypress.Commands.add('clearAuth', () => {
  window.localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
});

declare global {
  namespace Cypress {
    interface Chainable {
      setAuth(): Chainable<void>;
      clearAuth(): Chainable<void>;
    }
  }
}

export {};
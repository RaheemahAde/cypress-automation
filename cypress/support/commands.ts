// cypress/support/commands.ts

// Extend Cypress with custom command
declare namespace Cypress {
  interface Chainable {
    getPriceFromText(testId: string): Chainable<number>;
  }
}

Cypress.Commands.add('getPriceFromText', (testId: string) => {
  return cy.get(`[data-test=${testId}]`).invoke('text').then((text) => {
    if (!text) throw new Error(`Text not found for testId: ${testId}`);
    return parseFloat(text.replace(/[^\d.]/g, '').trim());
  });
});

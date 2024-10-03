import { userInfo, urls, pageTitles } from '../constants/appConstants';

export function login() {
  cy.visit(urls.baseUrl);
  cy.title().should('eq', pageTitles.expectedPageTitle);

  cy.get('[placeholder="Username"]').type(userInfo.username);
  cy.get('[placeholder="Password"]').type(userInfo.password);
  cy.get('input[type="submit"]').click();
  cy.url().should('eq', urls.productUrl);
}

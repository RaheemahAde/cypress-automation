export function addCheckoutInfo(firstName: string, lastName: string, postcode: string) {
    cy.get('[placeholder="First Name"]').type(firstName);
    cy.get('[placeholder="Last Name"]').type(lastName);
    cy.get('[placeholder="Zip/Postal Code"]').type(postcode);
  }

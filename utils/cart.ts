export function addToCartByProductName(productName: string) {
    cy.contains('[data-test="inventory-item"]', productName)
      .find('button')
      .contains('Add to cart')
      .click();
  }
  
  export function removeItemFromCart(productId: string) {
    cy.get(`[data-test=${productId}]`).click();
  }

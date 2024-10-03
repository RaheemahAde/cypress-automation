import { userInfo, products } from '../../constants/appConstants';
import { login } from '../../utils/login';
import { addToCartByProductName, removeItemFromCart } from '../../utils/cart';
import { addCheckoutInfo } from '../../utils/checkout';

describe('Swag Labs - Cart and Checkout Functionality', () => {

  beforeEach('should login', () => {
    login();
  });

  it('should add items to cart and checkout', () => {
    addToCartByProductName(products.product1);
    addToCartByProductName(products.product2);

    // Go to Cart
    cy.get('[data-test="shopping-cart-link"]').click();

    // Verify cart items
    cy.get('[data-test="inventory-item-name"]')
      .should('have.length.greaterThan', 0)
      .each((item) => {
        cy.wrap(item).should('not.contain.text', products.excludedItem);
      });

    // Check specific items
    cy.get('[data-test="inventory-item-name"]')
      .contains('Sauce Labs Backpack')
      .should('exist');
    cy.get('[data-test="inventory-item-name"]')
      .contains('Sauce Labs Bike Light')
      .should('exist');

    // Remove backpack from cart
    removeItemFromCart(products.backPackId);

    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('not.exist');
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Bike Light').should('be.visible');

    // Checkout
    cy.get('button').contains('Checkout').click();
    cy.get('[data-test="title"]').contains('Checkout: Your Information').should('be.visible');

    // Fill checkout information
    addCheckoutInfo(userInfo.firstName, userInfo.lastName, userInfo.postcode);
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="title"]').should('contain.text', 'Checkout');

    // Validate item prices
    cy.getPriceFromText('subtotal-label').then((itemTotal) => {
      cy.getPriceFromText('tax-label').then((taxValue) => {
        cy.getPriceFromText('total-label').then((priceTotal) => {
          const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100;
          const expectedTotal = roundToTwoDecimals(itemTotal + taxValue);
          expect(roundToTwoDecimals(priceTotal)).to.equal(expectedTotal);
        });
      });
    });

    // Finish checkout
    cy.get('button').contains('Finish').click();
    cy.get('[data-test="complete-header"]').should('be.visible');
  });

  afterEach(() => {
    cy.get('button').contains('Open Menu').click();
    cy.get('a').contains('Logout').click();
  });
});

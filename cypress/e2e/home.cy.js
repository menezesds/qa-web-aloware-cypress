/// <reference types="Cypress"/>
import homeSelectors from "../selectors/homeSelectors";

const testData = {
  validFullName: 'John Doe',
  invalidFullName: 'John',
  validCompanyEmail: 'john.doe@company.com',
  invalidCompanyEmail: 'john.doe@gmail.com',
  validPhone: '+01(23)456-789',
  invalidPhone: '!0123456789',
  searchText: 'Contact Center Software' 
}

beforeEach(()=>{
  cy.visit('')
  cy.cookieNotificationDismiss();
})

describe('UI Functional Test: Home', () => {
  it('Should successfully load the login page', () => {
    cy.contains('Start for free').click()
    cy.url().should('include', 'aloware.com/signup');
    cy.ValidateSignupExibition()
  });
  it.only('Should successfully search with valid result', () => {
    cy.get(homeSelectors.searchButton).click()
    cy.get(homeSelectors.searchInput).type(testData.searchText).type('{enter}')
    cy.get(homeSelectors.pageSearchTitle).should('contain', testData.searchText)
  });
})
describe('UI Functional Test: Home Form', () => {
  it('Should successfully load the form', () => {
    cy.url().should('include', 'aloware.com');
    cy.ValidateFormExibition()
  });
  it('Should allow submission with valid data', () => {
    cy.fillForm(testData.validFullName, testData.validCompanyEmail, testData.validPhone)
    cy.get(homeSelectors.submitButton).click();
    cy.get(homeSelectors.successSubmittedMessage).should('be.visible')
  });
  it('Should not allow submission with invalid email', () => {
    cy.fillForm(testData.validFullName, testData.invalidCompanyEmail, testData.validPhone)
    cy.get(homeSelectors.submitButton).click();
    cy.get(homeSelectors.formErroMessage).should('be.visible')
  });

  it('Should not allow submission with invalid phone number', () => {
    cy.fillForm(testData.validFullName,testData.validCompanyEmail, testData.invalidPhone)
    cy.get(homeSelectors.submitButton).click();
    cy.get(homeSelectors.formErroMessage).should('be.visible')
  });

  it('Should not allow submission with empty fields', () => {
    cy.get(homeSelectors.formClass).trigger('mousemove',  { clientX: 200, clientY: 300 })
    cy.get(homeSelectors.submitButton, { timeout: 10000 }).click();
    cy.get(homeSelectors.formErroMessage).should('be.visible');
  });
})
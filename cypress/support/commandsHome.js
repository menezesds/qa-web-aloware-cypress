import homeSelectors from "../selectors/homeSelectors"

Cypress.Commands.add('ValidateFormExibition', () => {
    cy.get(homeSelectors.footerId).scrollIntoView()
    cy.get(homeSelectors.formClass).trigger('mousemove',  { clientX: 200, clientY: 300 })
    cy.get(homeSelectors.formBoxClass).should('be.visible');
    cy.get(homeSelectors.firstNameInput).should('be.visible');
    cy.get(homeSelectors.emailInput).should('be.visible');
    cy.get(homeSelectors.phoneInput).should('be.visible');
})

Cypress.Commands.add('ValidateSignupExibition', () => {
    cy.get(homeSelectors.signupWelcomeTitle).should('be.visible');
    cy.get(homeSelectors.signUpEmailInput).should('be.visible');
})

Cypress.Commands.add('fillForm', (fullname, companyEmail, phone) => {
    cy.get(homeSelectors.footerId).scrollIntoView()
    cy.get(homeSelectors.formClass).trigger('mousemove',  { clientX: 200, clientY: 300 })
    cy.get(homeSelectors.firstNameInput).type(fullname)
    cy.get(homeSelectors.emailInput).type(companyEmail)
    cy.get(homeSelectors.phoneInput).type(phone)
})

Cypress.Commands.add('cookieNotificationDismiss', () => {
    cy.get(homeSelectors.headerId).trigger('mousemove',  { clientX: 200, clientY: 300 })
    cy.contains('Decline', { timeout: 15000 }).click()
})
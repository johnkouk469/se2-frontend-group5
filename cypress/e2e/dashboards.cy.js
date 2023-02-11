/* eslint-disable no-undef */
// describe('Initial visit', () => {
//     it('navigates to sign in screen', async () => {
//         cy.visit('http://localhost:3002');
//         await cy.get('#test-username').type('karanikio');
//         await cy.get('#test-password').type('12345');
//     });
// });


describe('Navigate to dashboards screen', () => {
    beforeEach(() => {
        const token = JSON.stringify({
            token: JSON.stringify(Cypress.env('TEST_TOKEN')),
            user: JSON.stringify({
                username: Cypress.env('TEST_USERNAME'),
                id: Cypress.env('TEST_ID'),
                email: Cypress.env('TEST_EMAIL')
            }),
            _persist: JSON.stringify({version: -1, rehydrated: true})
        });
        cy.visit('http://localhost:3002');
        cy.window().then((win) => win.localStorage.setItem('persist:codin-auth', token));
    });

    it('Navigate to dashboards screen if user is already authenticated', () => {
        cy.visit('http://localhost:3002/home');
        cy.contains('My Dashboards').click();
    });


    it('Add new dashboard', () => {
        cy.visit('http://localhost:3002/home');
        cy.contains('My Dashboards').click();
        cy.contains('DASHBOARDS');
        cy.contains('Manage your Dashboards');
        cy.contains('Add New Dashboard').click();
        // id of the pop up window once you select to add new dashboard
        cy.get('form', {timeout: 1000}).should('exist');
        // cy.get('Insert dashboard name').should('exist');

        cy.get('form#signInForm').should('exist');
        cy.get('form#signInForm').contains('Save').should('exist');
        cy.get('form#signInForm').contains('Cancel').should('exist');
    
        cy.get('form#signInForm').within(() => {
            cy.get('input').should('exist');
            cy.get('input').type('My new dashboard');
        })
        // cy.get('form').contains('insertDashboardName', {timeout: 3000}).should('exist');
        // cy.get('form').get('signInForm').should('exist');
        // cy.get('signInForm').get('insertDashboardName', {timeout: 1000}).type('My new dashboard');
    });
    

});
/* eslint-disable no-undef */
/* 
    Before hook: navigate to the sign in page 
*/
describe('Initial visit', () => {
    // Visit the sign in page and type username and password
    it('navigates to sign in screen', async () => {
        cy.visit('http://localhost:3002');
        await cy.get('#test-username').type('karanikio');
        await cy.get('#test-password').type('12345');
    });
});

/* 
    Before hook: navigate to the sign in page 
*/
describe('Log in', () => {
    beforeEach(() => {
        // create authentication token
        const token = JSON.stringify({
            token: JSON.stringify(Cypress.env('TEST_TOKEN')),
            user: JSON.stringify({
                username: Cypress.env('TEST_USERNAME'),
                id: Cypress.env('TEST_ID'),
                email: Cypress.env('TEST_EMAIL')
            }),
            _persist: JSON.stringify({version: -1, rehydrated: true})
        });
        // Visit page 
        cy.visit('http://localhost:3002');
        // Authenticate using token
        cy.window().then((win) => win.localStorage.setItem('persist:codin-auth', token));
    });

    // Navigate to the homepage and check the HELLO component
    it('navigates to project screen if user is already authenticated', () => {
        cy.visit('http://localhost:3002/home');
        cy.contains(/HELLO group5/i).should('exist');
    });
});

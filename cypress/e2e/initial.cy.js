/* eslint-disable no-undef */

export function login() {
    const user = {
        username: Cypress.env('TEST_USERNAME'),
        id: '63e929ff3edf5aa9d017315a',
        email: 'admin@example.com'
    };
    const authenticateResponse = {
        // eslint-disable-next-line max-len
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user
    };

    const token = JSON.stringify({
        ...authenticateResponse,
        _persist: JSON.stringify({version: -1, rehydrated: true})
    });
    cy.intercept('/users/authenticate', authenticateResponse);
    localStorage.setItem('persist:codin-auth', token);
    cy.visit('http://localhost:3002');
    cy.get('#test-username').type(Cypress.env('TEST_USERNAME'));
    cy.get('#test-password').type(`${Cypress.env('TEST_PASSWORD')}{enter}`);
}
export const resp = {
    success: true,
    users: 2,
    dashboards: 3,
    views: 10,
    sources: 1
};
describe('Landing page', () => {
    before(() => {
        cy.clearLocalStorage();
    });
    beforeEach(() => {
        cy.intercept('/general/statistics', resp);
    });
    it('when in landing page, email button is visible and clickable', () => {
        cy.visit('http://localhost:3002');
        cy.get('#contactImg').should('have.attr', 'src', '/static/media/contact.b8d80d6c.png');
        cy.get('#contactImg').parent().should('have.attr', 'rel', 'noopener noreferrer');
    });

    it('should contain statistics fetched from the backend', () => {
        cy.visit('http://localhost:3002');
        cy.contains('Dashboards Views').prev('div').should('contain.text', resp.views);
        cy.contains('Dashboards Created').prev('div').should('contain.text', resp.dashboards);
        cy.contains('Codin Users').prev('div').should('contain.text', resp.users);
        cy.contains('Sources Connected').prev('div').should('contain.text', resp.sources);
    });

    after(() => {
        cy.clearLocalStorage();
    });
});

describe('Log in', () => {
    before(() => {
        cy.clearLocalStorage();
        cy.intercept('/general/statistics', resp);
        login();
    });
    it('navigates to project screen if user is already authenticated', () => {
        cy.contains(`HELLO ${Cypress.env('TEST_USERNAME')}`).should('exist');
        cy.contains('My Sources').should('exist');
        cy.contains('My Dashboards').should('exist');
        cy.contains('My Profile').should('exist');
    });

    it('when in home page, bug button is visible and clickable', () => {
        cy.get('#bugImg').should('exist');
        cy.get('#bugImg').parent().should('have.attr', 'rel', 'noopener noreferrer');
    });

    it('when in landing page, email button is visible and clickable', () => {
        cy.get('#contactImg').should('have.attr', 'src', '/static/media/contact.b8d80d6c.png');
        cy.get('#contactImg').parent('a').should('have.attr', 'rel', 'noopener noreferrer');
    });

    after(() => {
        cy.clearLocalStorage();
    });
});

describe('Sources', () => {
    const sources = {
        success: true,
        sources: [
            {
                id: '63f0be4aa879fa89c5dc6968',
                name: 'MQTT',
                type: 'mqtt',
                url: 'ws://webmqtt.example.com:15675/ws',
                login: 'codin',
                passcode: 'password',
                vhost: '',
                active: false
            },
            {
                id: '63f0d0faa879fa89c5dc69b7',
                name: 'STOMP',
                type: 'stomp',
                url: 'ws://webstomp.example.com:15674/ws',
                login: 'codin',
                passcode: 'password',
                vhost: '/',
                active: false
            }]
    };
    beforeEach(() => {
        cy.intercept('/general/statistics', resp);
        cy.intercept('/sources/sources', sources);
        cy.intercept('/sources/create-source', {success: true});
        login();
    });

    it('should show available sources', () => {
        cy.visit('http://localhost:3002/sources');
        // eslint-disable-next-line no-restricted-syntax
        for (const source of sources.sources) {
            cy.contains(source.name).should('exist');
        }
    });

    it('when pressing Add new source, a pop up should appear', () => {
        cy.visit('http://localhost:3002/sources');
        cy.contains('Add New Source').click();
        cy.contains('Source Info').should('exist');
        cy.contains('Web-Stomp').should('exist');
        cy.get('button').contains('Save').should('exist');
        cy.get('button').contains('Cancel').should('exist');
    });

    it('should create a new data source', () => {
        const input = {
            name: 'Dashboard',
            login: 'admin',
            password: 'pass',
            vhost: '/'
        };
        cy.visit('http://localhost:3002/sources');
        cy.contains('Add New Source').click();
        cy.get('input[name="name"]').type(input.name);
        cy.get('input[name="login"]').type(input.login);
        cy.get('input[name="passcode"]').type(input.password);
        cy.get('input[name="vhost"]').type(input.vhost);
        cy.contains('Save').click();
    });

    it('should open edit dialog when pressing edit svg', () => {
        cy.visit('http://localhost:3002/sources');
        cy.get('svg[data-icon="edit"]').should('exist');
        cy.get('svg[data-icon="edit"]').first().click();
        cy.get('input[name="name"]').should('contain.value', sources.sources[0].name);
    });

    after(() => {
        cy.clearLocalStorage();
    });
});



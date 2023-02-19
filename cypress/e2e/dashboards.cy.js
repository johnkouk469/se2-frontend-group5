/* eslint-disable no-undef,quotes */
import {login, resp} from './initial.cy';

describe('Navigate to dashboards screen', () => {
    const dashboards = [
        {
            id: "639475b812ff010f4dfc3c18",
            name: "dashboard1",
            views: 0,
        }
    ];
    
    beforeEach(() => {
        cy.clearLocalStorage();
        login();
        cy.intercept('/dashboards/dashboards', dashboards);
        cy.intercept('/general/statistics', resp);
        cy.intercept('/dashboards/create-dashboard', {success: true});
    });

    it('Navigate to dashboards screen if user is already authenticated', () => {
        cy.visit('http://localhost:3002/home');
        cy.contains('My Dashboards').click();
    });

    it('Add new dashboard and cancel', () => {
        cy.visit('http://localhost:3002/home');
        cy.contains('My Dashboards').click();
        cy.contains('DASHBOARDS');
        cy.contains('Manage your Dashboards');
        cy.contains('Add New Dashboard').click();
        
        cy.get('form#signInForm').contains('Cancel').should('exist');
        cy.get('form#signInForm').contains('Cancel').click();
    });

    it('Add new dashboard and save it', () => {
        cy.visit('http://localhost:3002/home');
        cy.contains('My Dashboards').click();
        cy.contains('DASHBOARDS');
        cy.contains('Manage your Dashboards');
        cy.contains('Add New Dashboard').click();
        
        cy.get('input[type="text"]').type('My new dashboard');
        cy.get('form#signInForm').contains('Save').should('exist');
        cy.get('form#signInForm').contains('Save').click();
    });
});

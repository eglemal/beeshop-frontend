describe('/#', () => {
    beforeEach(() => {
        cy.visit('/#')
    })
    it('greets with TopBar', () => {
        cy.contains('Products')
    })
    it('greets with HomePage', () => {
        // cy.title().should('contain', 'React App')
        cy.contains('HomePage')
    })
    it('greets with HomePage image', () => {
        cy.get('.homepage').should('be.visible')
    })
    // describe('with a 320x568 viewport', () => {
    //     beforeEach(() => {
    //         cy.viewport(320, 568);
    //     });
    //     it('has a visible mobile menu toggle', () => {
    //         cy.get('#mobile-menu-toggle').should('be.visible');
    //     });
    // });
})
describe('My First Test', function () {
    it('Visits the kitchen sink', function () {
        cy.visit('http://localhost:3000/#/')
        cy.contains('Login').click()
        cy.url()
            .should('include', '/login')
        cy.get('Input').eq(0)
            .type('grazuolyte')
            .should('have.value', 'grazuolyte')

    })
})
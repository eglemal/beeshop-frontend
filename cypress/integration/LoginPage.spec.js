{/* <script src="_cypress_tests?p=cypress/suport/index.js"></script>
<script src="_cypress_tests?p=cypress/integration/LoginPage.spec.js"></script> */}

describe('/login', () => {
    beforeEach(() => {
        cy.visit('/#/login')
    })
    it('greets with Login', () => {
        cy.contains('h1', 'Login')
    })
    it('requires username', () => {
        cy.get('button').should('be.disabled')
    })

    it('requires password', () => {
        cy.get('Input').eq(0)
            .type('grazuolyte')
        cy.get('button').should('be.disabled')
    })
    it('requires valid username and password', () => {
        cy.get('Input').eq(0)
            .type('grazuolyte')
        cy.get('Input').eq(1)
            .type('P4ssword')
        cy.get('button').click()
        cy.get('div').contains('Unauthorized')
    })
    it('navigates to #/ on successful login', () => {
        cy.get('Input').eq(0)
            .type('grazuolyte')
        cy.get('Input').eq(1)
            .type('P4ssword')
        cy.get('button').click()
        cy.hash().should('eq', '#/')
    })
})
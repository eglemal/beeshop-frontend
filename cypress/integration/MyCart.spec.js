// var user = {
//     id: '1',
//     username: 'grazuolyte3',
//     password: 'P4ssword',
//     isLoggedIn: 'true',

// }

var user = {
    email: 'test@email',
    username: 'grazuolyte16',
    password: 'P4ssword',
}

describe('#/login', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.register(user)
        cy.login(user)
        cy.visit('')
    })
    // afterEach(() => {
    //     cy.contains('Logout').click()
    // })
    it('greets with products', () => {
        cy.contains('My Cart')
    })
})
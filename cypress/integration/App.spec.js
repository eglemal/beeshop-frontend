var user = {
    email: 'test@email',
    username: 'grazuolyte1',
    password: 'P4ssword',
}

describe('App', () => {
    beforeEach(() => {

    })
    it('displays homepage when url is /', () => {
        cy.visit('/#')
    })
    it('displays loginPage when url is /login', () => {
        cy.visit('/#/login')
    })
    it('displays RegistrationPage when url is /register', () => {
        cy.visit('/#/register')
    })
    it('displays My Cart on TopBar after login success', () => {
        cy.register(user)
        cy.login(user)
        cy.visit('')
    })
    it('displays My Cart on TopBar after register success', () => {
        cy.register(user)
        cy.visit('')
    })
    it('saves logged in user data to localStorage after register success', () => {
        // cy.clearLocalStorage()
        cy.register(user)
        window.localStorage.getItem('user-info')
    })
    it('', () => {

    })
}) 

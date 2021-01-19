Cypress.Commands.add('login', (user) => {
    cy.request({
        method: 'POST',
        url: '/api/1.0/login',
        body: {
            username: user.username,
            password: user.password,
        },
        headers: {
            'Authorization': `Basic ${btoa(user.username + ':' + user.password)}`
        },
        failOnStatusCode: false,

    })
        .then((response) => {
            window.localStorage.setItem('user-info', JSON.stringify({
                id: '16',
                username: 'grazuolyte16',
                password: 'P4ssword',
                isLoggedIn: 'true'
            }))
        })
});

Cypress.Commands.add('register', (user) => {
    var KeyName = window.localStorage.getItem('user-info');
    console.log("Pirmas - " + KeyName)
    window.localStorage.clear()
    console.log("Antras - " + KeyName)

    cy.request({
        method: 'POST',
        url: '/api/1.0/users',
        body: {
            email: user.email,
            username: user.username,
            password: user.password,
        },
        failOnStatusCode: false,
    })
        .then((response) => {
            var info = window.localStorage.getItem('user-info')
            console.log("Trecias - " + info)
            window.localStorage.setItem('user-info', JSON.stringify({
                id: '16',
                username: 'grazuolyte20',
                password: 'P4ssword',
                isLoggedIn: 'true'
            }))
            console.log(window.localStorage.getItem('user-info'))

        })
})

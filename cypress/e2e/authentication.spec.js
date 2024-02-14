describe('Tests the registration of a user, login in with the correct and wrong iser details and logging out', ()=>{
    it('Register User',()=>{
        cy.visit('https://www.automationexercise.com/')
        cy.location('pathname').should('equal', '/')
        cy.get('[class="nav navbar-nav"]').within(()=>{
            cy.get('li').contains(/ Signup/i).click();
        })
        cy.location('pathname').should('equal', '/login')

    })
})
describe('Verify subscription', ()=>{
    it('Verify subscription in home page',()=>{
        cy.visit('http://automationexercise.com')
        cy.location('pathname').should('equal', '/')

        cy.get('footer').scrollIntoView();
        cy.contains(/Subscription/i).should('be.visible')
        cy.get('form').then((form)=>{
            cy.wrap(form).find('[type="email"]').type('arditest@gmail.com')
            cy.wrap(form).find('button').click();
        })

        cy.get('[class="alert-success alert"]').invoke('text').should('equal', 'You have been successfully subscribed!')
    })

    
})
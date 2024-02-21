describe('Verify subscription', ()=>{

    beforeEach('Navigate to automationexercie.com site and validate', ()=>{
        cy.visit('http://automationexercise.com')
        cy.location('pathname').should('equal', '/')
    })
    it('Verify subscription in home page',()=>{
        
        cy.get('footer').scrollIntoView();
        cy.contains(/Subscription/i).should('be.visible')
        cy.get('form').then((form)=>{
            cy.wrap(form).find('[type="email"]').type('arditest@gmail.com')
            cy.wrap(form).find('button').click();
        })

        cy.get('[class="alert-success alert"]').invoke('text').should('equal', 'You have been successfully subscribed!')
    })

    it('Verify subscription in cart page', ()=>{

        cy.get('[class="nav navbar-nav"]').find('li').contains(/Cart/i).click();

        cy.get('footer').scrollIntoView();
        cy.contains(/Subscription/i).should('be.visible')
        cy.get('form').then((form)=>{
            cy.wrap(form).find('[type="email"]').type('arditest@gmail.com')
            cy.wrap(form).find('button').click();
        })

        cy.contains(/You have been successfully subscribed!/i).should('be.visible')
    })

    
})
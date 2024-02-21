describe('Product Managment', ()=>{
    // Tests related to product browsing and management
    
    it('Searching a product and visibility',()=>{

        // Visit the website under test
        cy.visit('http://automationexercise.com')
        cy.location('pathname').should('equal' ,'/')

        //Navigate to products page
        cy.get('[class="nav navbar-nav"]').find('li').contains(/Products/i).click();

        cy.location('pathname').should('equal', '/products')

        //Search for 'Jeans' and submit
        cy.get('#search_product').type('Jeans')
        cy.get('#submit_search').click();

        cy.contains(/SEARCHED PRODUCTS/i).should('be.visible')

        //Verify all the products related to search are visible
        cy.get('.overlay-content p').each((text)=>{
            cy.wrap(text).should('contain', 'Jeans')
        })
    })

})
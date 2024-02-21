describe('Product Managment', ()=>{
   
    beforeEach('Navigate to automationexercie.com site and validate', ()=>{
        cy.visit('http://automationexercise.com')
        cy.location('pathname').should('equal' ,'/')
    })
    
    // Tests related to product browsing and management
    it('Searching a product and visibility',()=>{

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

    it('Add products to the cart', ()=>{

        //Navigate to products page
        cy.get('[class="nav navbar-nav"]').find('li').contains(/Products/i).click();

        //Add first product
        cy.get('.single-products').eq(0).then((firstProduct)=>{
           cy.wrap(firstProduct).trigger('mouseover')
           cy.wrap(firstProduct).find('a').eq(0).click();
        })
        //Continue shopping
        cy.get('.modal-content').find('button').click();

        //Add second product
        cy.get('.single-products').eq(1).then((firstProduct)=>{
            cy.wrap(firstProduct).trigger('mouseover')
            cy.wrap(firstProduct).find('a').eq(0).click();
         })
        cy.get('.modal-content').find('a').click();

        //Verify two products have been added to the cart
         cy.get('tbody').find('tr').should('have.length', 2)

         //Verify price, quantity and total price
        cy.get('#product-1').find('td').then((firstProduct)=>{
            cy.wrap(firstProduct).eq(2).find('p').invoke('text').should('contain', '500')
            cy.wrap(firstProduct).eq(3).find('button').invoke('text').should('contain', '1')
            cy.wrap(firstProduct).eq(4).find('p').invoke('text').should('contain', '500')

        })
        cy.get('#product-2').find('td').then((secondProduct)=>{
            cy.wrap(secondProduct).eq(2).find('p').invoke('text').should('contain', '400')
            cy.wrap(secondProduct).eq(3).find('button').invoke('text').should('contain', '1')
            cy.wrap(secondProduct).eq(4).find('p').invoke('text').should('contain', '400')

        })
    })

    it('Verify product quantity in cart',()=>{
        cy.get('[class="nav nav-pills nav-justified"]').eq(0).find('a').click();
        cy.location('pathname').should('equal', '/product_details/1')

        cy.get('.product-information').find('span').then((product=>{
            cy.wrap(product).find('input').eq(0).clear().type('4')
            cy.wrap(product).find('button').click();
        }))

        cy.get('.modal-content').find('a').click();
        cy.get('#product-1').find('td').then((firstProduct)=>{
            cy.wrap(firstProduct).eq(3).find('button').invoke('text').should('contain', '4')
        })
    })
})
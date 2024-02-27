describe('Checkout test cases', ()=>{
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    beforeEach('Navigate to automationexercie.com site and validate', ()=>{
        cy.visit('http://automationexercise.com')
        cy.location('pathname').should('equal' ,'/')
    })

    it.only('Verify address details in checkout page',()=>{

          // Navigate to the login page
          cy.fixture('userDetails.json').then((userDetails)=>{
            cy.get('[class="nav navbar-nav"]').contains(/Login/i).click();
            cy.contains(/Login to your account/i).should('be.visible')
    
            //Login with correct details
            cy.getDataQa('login-email').type(email)
            cy.getDataQa('login-password').type(password)
            cy.getDataQa('login-button').click();
    
            //Ensure that you are logged in with the correct details and its visible
            cy.contains(`Logged in as ${userDetails.username}`).should('be.visible')
            
            
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

             //Proceed to checkout
             cy.get('[class="btn btn-default check_out"]').click();

             //Verify DELIVERY ADDRESS
            cy.getDataQa('checkout-info').find('ul').eq(0).then((address=>{
                cy.wrap(address).find('li').eq(1).invoke('text').should('contain', `Mr. ${userDetails.first_name} ${userDetails.last_name}`)
                cy.wrap(address).find('li').eq(2).invoke('text').should('contain', `${userDetails.company}`)
                cy.wrap(address).find('li').eq(3).invoke('text').should('contain', `${userDetails.address}`)
                cy.wrap(address)
                .find('li')
                .eq(5)
                .invoke('text')
                .then((text) => {
                  const cleanedText = text.trim().replace(/\s+/g, ' '); // Remove leading/trailing spaces and multiple spaces
                  const expectedText = `${userDetails.city} ${userDetails.state} ${userDetails.zipcode}`;
                  expect(cleanedText).to.contain(expectedText);
                });
              
                cy.wrap(address).find('li').eq(6).invoke('text').should('contain', `${userDetails.country}`)
                cy.wrap(address).find('li').eq(7).invoke('text').should('contain', `${userDetails.phoneNumber}`)
            }))

            // Verify BILLING ADDRESS
            cy.getDataQa('checkout-info').find('ul').eq(1).then((address=>{
                cy.wrap(address).find('li').eq(1).invoke('text').should('contain', `Mr. ${userDetails.first_name} ${userDetails.last_name}`)
                cy.wrap(address).find('li').eq(2).invoke('text').should('contain', `${userDetails.company}`)
                cy.wrap(address).find('li').eq(3).invoke('text').should('contain', `${userDetails.address}`)
                cy.wrap(address)
                .find('li')
                .eq(5)
                .invoke('text')
                .then((text) => {
                  const cleanedText = text.trim().replace(/\s+/g, ' '); // Remove leading/trailing spaces and multiple spaces
                  const expectedText = `${userDetails.city} ${userDetails.state} ${userDetails.zipcode}`;
                  expect(cleanedText).to.contain(expectedText);
                });
              
                cy.wrap(address).find('li').eq(6).invoke('text').should('contain', `${userDetails.country}`)
                cy.wrap(address).find('li').eq(7).invoke('text').should('contain', `${userDetails.phoneNumber}`)
            }))

            //Delete the account
            cy.get('[class="nav navbar-nav"]').contains(/Delete Account/i).click();
            // Ensure that the "Account Deleted!" text is visible on the page
            cy.contains(/Account Deleted!/i).should('be.visible');
            cy.getDataQa('continue-button').click();
        });
    });
})
const email = Cypress.env('email');
const password = Cypress.env('password');

export class CheckoutPage{
    registerUser(){
        // Load user details from a JSON fixture file
        cy.fixture('userDetails.json').then((userDetails) => {
        
            // Navigate to the signup page
            cy.get('[class="nav navbar-nav"]').contains(/Signup/i).click();
            cy.location('pathname').should('equal', '/login');
            cy.contains(/New User Signup!/i).should('be.visible');

            // Fill in the signup form
            cy.getDataQa('signup-name').type(userDetails.username);
            cy.getDataQa('signup-email').type(email);
            cy.getDataQa('signup-button').click();

            // Ensure that the "ENTER ACCOUNT INFORMATION" text is visible on the page
            cy.contains(/ENTER ACCOUNT INFORMATION/i).should('be.visible');

            // Fill in the account information form
            cy.get('.login-form').within(() => {
                cy.getDataQa('title').invoke('attr', 'value').contains(/Mr./i).click();
                cy.getDataQa('name').invoke('attr', 'value').should('contain', userDetails.username);
                cy.getDataQa('email').invoke('attr', 'value').should('contain', email);
                cy.getDataQa('password').type(password);
                cy.getDataQa('days').select(userDetails.day);
                cy.getDataQa('months').select(userDetails.month);
                cy.getDataQa('years').select(userDetails.year);

                //Select checkboxes 
                cy.get('#uniform-newsletter').find('[type="checkbox"]').check({ force: true });
                cy.get('#uniform-optin').find('[type="checkbox"]').check({ force: true });

                //Fill in the rest of the informations
                cy.getDataQa('first_name').type(userDetails.first_name);
                cy.getDataQa('last_name').type(userDetails.last_name);
                cy.getDataQa('company').type(userDetails.company);
                cy.getDataQa('address').type(userDetails.address);
                cy.getDataQa('country').select(userDetails.country);
                cy.getDataQa('state').type(userDetails.state);
                cy.getDataQa('city').type(userDetails.city);
                cy.getDataQa('zipcode').type(userDetails.zipcode);
                cy.getDataQa('mobile_number').type(userDetails.phoneNumber);
                cy.getDataQa('create-account').click();
            });

            // Ensure successful account creation
            cy.contains(/Account Created!/i).should('be.visible');
            cy.getDataQa('continue-button').click();

            // Verify that the correct user has been logged in
            cy.contains(`Logged in as ${userDetails.username}`)

        });
    }

    verifyAddressInCheckoutPage(){
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

        });
    }

    deleteUser(){
         // Navigate to the login page
         cy.get('[class="nav navbar-nav"]').contains(/Login/i).click();
         cy.contains(/Login to your account/i).should('be.visible')
 
         //Login with correct details
         cy.getDataQa('login-email').type(email)
         cy.getDataQa('login-password').type(password)
         cy.getDataQa('login-button').click();
         
         //Delete the account
         cy.get('[class="nav navbar-nav"]').contains(/Delete Account/i).click();
         // Ensure that the "Account Deleted!" text is visible on the page
         cy.contains(/Account Deleted!/i).should('be.visible');
         cy.getDataQa('continue-button').click();
    }
}

export const onCheckoutPage = new CheckoutPage()
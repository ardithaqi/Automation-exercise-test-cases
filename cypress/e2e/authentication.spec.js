describe('User Registration and Account Management', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    beforeEach('Navigate to automationexercie.com site and validate', ()=>{
        // Visit the website under test
        cy.visit('https://www.automationexercise.com/');
        cy.location('pathname').should('equal', '/');
    })

    it('Registers a new user, logs in, deletes the account, and logs out', () => {
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

            // Log out the user
            cy.contains(`Logged in as ${userDetails.username}`);

            // cy.get('[class="nav navbar-nav"]').contains(/Delete Account/i).click();
            // // Ensure that the "Account Deleted!" text is visible on the page
            // cy.contains(/Account Deleted!/i).should('be.visible');
            // cy.getDataQa('continue-button').click();
        });
    });

    it.only('Login User with correct email and password', ()=>{

        cy.fixture('userDetails.json').then((userDetails)=>{
        cy.get('[class="nav navbar-nav"]').contains(/Signup/i).click();
        cy.contains(/Login to your account/i).should('be.visible')

        //Login with correct details
        cy.getDataQa('login-email').type(email)
        cy.getDataQa('login-password').type(password)
        cy.getDataQa('login-button').click();

        //Ensure that you are logged in with the correct details and its visible
        cy.contains(`Logged in as ${userDetails.username}`).should('be.visible')
        
        cy.get('[class="nav navbar-nav"]').contains(/Delete Account/i).click();
            // // Ensure that the "Account Deleted!" text is visible on the page
            cy.contains(/Account Deleted!/i).should('be.visible');
            cy.getDataQa('continue-button').click();
        });
    })
})
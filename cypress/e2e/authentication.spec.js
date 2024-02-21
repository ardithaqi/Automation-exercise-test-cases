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

    it('Login user with correct email and password', ()=>{

        // Navigate to the signup page
        cy.fixture('userDetails.json').then((userDetails)=>{
        cy.get('[class="nav navbar-nav"]').contains(/Login/i).click();
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

    it('Login user with incorrect email and password', ()=>{
    
        // Navigate to the signup page
        cy.get('[class="nav navbar-nav"]').contains(/Login/i).click();
        cy.contains(/Login to your account/i).should('be.visible')
        
        //Login with incorrect details
        cy.getDataQa('login-email').type('ardi111@gmail.com')
        cy.getDataQa('login-password').type('ardiardi')
        cy.getDataQa('login-button').click();

        //Ensure that user entered incorrect email and password and its visible.
        cy.contains(/Your email or password is incorrect!/i).should('be.visible')
    })

    it('Logout user', ()=>{

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
        
        //Logout from the website
        cy.get('[class="nav navbar-nav"]').contains(/Logout/i).click();
        cy.location('pathname').should('equal', '/login')
        })
    })

    it('Register with already existing email',()=>{

        // Navigate to the signup page
        cy.fixture('userDetails.json').then((userDetails)=>{
            cy.get('[class="nav navbar-nav"]').contains(/Signup/i).click();
            cy.contains(/Login to your account/i).should('be.visible')

            //Register with already existing email
            cy.getDataQa('signup-name').type(userDetails.username);
            cy.getDataQa('signup-email').type(email);
            cy.getDataQa('signup-button').click();

            //Ensure that user is already an existing email
            cy.contains(/Email Address already exist!/i).should('be.visible')
        })
    })

    it.only('Contact us form',()=>{
        
        //Navigate to contact us form
        cy.fixture('userDetails.json').then((userDetails)=>{
            cy.get('[class="nav navbar-nav"]').contains(/Contact Us/i).click();
            cy.contains(/Get in touch/i).should('be.visible')
    
            //Fill in name, email, subject and message
            cy.getDataQa('name').type(userDetails.first_name);
            cy.getDataQa('email').type(email)
            cy.getDataQa('subject').type(userDetails.subject)
            cy.getDataQa('message').type(userDetails.message)

            //Uploading a file thats located in the fixture folder
            cy.get('[name="upload_file"]').attachFile('Bazat e robotikës T2V.docx');

            //Submitting the informations
            cy.getDataQa('submit-button').click();
            cy.on('window:alert', message => {
                // Check the alert message
                expect(message).to.equal('Press OK to proceed!');
              });

        //Ensure that the submit was succesful
        cy.contains(/Success! Your details have been submitted successfully./i).should('be.visible')
        cy.get('[class="btn btn-success"]').click();
        cy.location('pathname').should('equal', '/')
        })
    })
})
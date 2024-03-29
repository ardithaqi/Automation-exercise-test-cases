const email = Cypress.env('email');
const password = Cypress.env('password');

export class ProductPage{
    verifyProducts(){
          //Navigate to products page
          cy.get('[class="nav navbar-nav"]').find('li').contains(/Products/i).click();
          cy.location('pathname').should('equal', '/products')
          cy.contains(/ALL PRODUCTS/i).should('be.visible')
  
          cy.get('.features_items').find('.col-sm-4').should('be.visible')
  
          //Click on 'View Product' button
          cy.get('.choose').eq(0).find('a').click();
          cy.get('[class="nav nav-tabs"]').contains(/Write your review/i).should('be.visible')
  
          cy.get('.product-information').then((productInfo=>{
              cy.wrap(productInfo).find('h2').should('contain', 'Blue Top')
              cy.wrap(productInfo).find('p').should('contain', 'Category: Women > Tops')
              cy.wrap(productInfo).find('span span').should('contain', 'Rs. 500')
              cy.wrap(productInfo).find('p b').eq(0).should('contain', 'Availability:')
              cy.wrap(productInfo).find('p b').eq(1).should('contain', 'Condition:')
          }))
  
    }

    searchProduct(){
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
    }

    addProductsToCart(){
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
    }

    verifyProductQuantity(){

        //Add a product
        cy.get('[class="nav nav-pills nav-justified"]').eq(0).find('a').click();
        cy.location('pathname').should('equal', '/product_details/1')

        //Change quantity of a product
        cy.get('.product-information').find('span').then((product=>{
            cy.wrap(product).find('input').eq(0).clear().type('4')
            cy.wrap(product).find('button').click();
        }))

        //Verify the changed quantity
        cy.get('.modal-content').find('a').click();
        cy.get('#product-1').find('td').then((firstProduct)=>{
            cy.wrap(firstProduct).eq(3).find('button').invoke('text').should('contain', '4')
        })
    }

    placeOrderWhileRegistring(){
         // Load user details from a JSON fixture file
         cy.fixture('userDetails.json').then((userDetails=>{

            // Navigate to the signup page
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
    
            //Verify that cart page is displayed
            cy.location('pathname').should('equal', '/view_cart')
    
            //Proceed to checkout
            cy.get('[class="btn btn-default check_out"]').click();
    
            //Register/Signup
            cy.get('.modal-body').find('a').click();

             //Create an account
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

            cy.get('[class="nav navbar-nav"]').find('li').contains(/Cart/i).click();

            //Proceed to checkout
            cy.get('[class="btn btn-default check_out"]').click();

            //Verify address
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

             //Verify order
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

            //Leaving a comment
            cy.get('#ordermsg').find('textarea').type('Text me before shipping them to me!')

            //Checkout
            cy.get('[class="btn btn-default check_out"]').click();

            //Enter payment details: Name on Card, Card Number, CVC, Expiration date
            cy.getDataQa('name-on-card').type(userDetails.cardName)
            cy.getDataQa('card-number').type(userDetails.cardNumber)
            cy.getDataQa('cvc').type(userDetails.cvc)
            cy.getDataQa('expiry-month').type(userDetails.expireMonth)
            cy.getDataQa('expiry-year').type(userDetails.expireYear)

            cy.getDataQa('pay-button').click();

            //Verify success message 'Your order has been placed successfully!'
            cy.get('.container').find('p').eq(0).invoke('text').should('contain', 'Congratulations! Your order has been confirmed!')

            //Delete the account
            cy.get('[class="nav navbar-nav"]').contains(/Delete Account/i).click();
            // Ensure that the "Account Deleted!" text is visible on the page
            cy.contains(/Account Deleted!/i).should('be.visible');
            cy.getDataQa('continue-button').click();
        }))
    }

    placeOrderBeforeRegistring(){
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

            //Proceed to checkout
            cy.get('[class="btn btn-default check_out"]').click();

            //Verify address
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

            

             //Verify order
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

            //Leaving a comment
            cy.get('#ordermsg').find('textarea').type('Text me before shipping them to me!')
            
            //Checkout
            cy.get('[class="btn btn-default check_out"]').click();

             //Enter payment details: Name on Card, Card Number, CVC, Expiration date
             cy.getDataQa('name-on-card').type(userDetails.cardName)
             cy.getDataQa('card-number').type(userDetails.cardNumber)
             cy.getDataQa('cvc').type(userDetails.cvc)
             cy.getDataQa('expiry-month').type(userDetails.expireMonth)
             cy.getDataQa('expiry-year').type(userDetails.expireYear)
 
             cy.getDataQa('pay-button').click();

             //Verify success message 'Your order has been placed successfully!'
             cy.get('.container').find('p').invoke('text').should('contain', 'Congratulations! Your order has been confirmed!')

        })
    }

    loginBeforeCheckout(){
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
            
            //Navigate to Products
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
    
            //Verify that cart page is displayed
            cy.location('pathname').should('equal', '/view_cart')
    
            //Checkout
            cy.get('[class="btn btn-default check_out"]').click();
 
             //Verify address
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
 
              //Verify order
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
 
             //Leaving a comment
             cy.get('#ordermsg').find('textarea').type('Text me before shipping them to me!')
 
             //Checkout
             cy.get('[class="btn btn-default check_out"]').click();
 
             //Enter payment details: Name on Card, Card Number, CVC, Expiration date
             cy.getDataQa('name-on-card').type(userDetails.cardName)
             cy.getDataQa('card-number').type(userDetails.cardNumber)
             cy.getDataQa('cvc').type(userDetails.cvc)
             cy.getDataQa('expiry-month').type(userDetails.expireMonth)
             cy.getDataQa('expiry-year').type(userDetails.expireYear)
 
             cy.getDataQa('pay-button').click();
 
             //Verify success message 'Your order has been placed successfully!'
             cy.get('.container').find('p').invoke('text').should('contain', 'Congratulations! Your order has been confirmed!')
         })
    }

    removeProduct(){
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
 
         //Verify that cart page is displayed
          cy.location('pathname').should('equal', '/view_cart')
 
          //Remove one product from cart
          cy.get('.cart_quantity_delete').eq(0).click();
 
          //Verify one product is in the cart
          cy.get('tbody').find('tr').should('have.length', 1)
 
          //Remove last product from cart
          cy.get('.cart_quantity_delete').eq(0).click();
 
          //Verify that the cart is empty
          cy.get('#empty_cart').find('b').invoke('text').should('equal' ,'Cart is empty!')
    }

    viewCategoryProducts(){
         //Verify that the category is visible
         cy.contains('Category').should('be.visible')  

         //Find the category for women and choose a subcategory
         cy.get('#accordian').scrollIntoView().within(()=>{
             cy.get('div').eq(0).click();
             cy.get('#Women').find('ul li').contains('Dress').click({force:true});
         })
 
         //Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
         cy.location('pathname').should('equal', '/category_products/1')
         cy.contains(/Women - Dress Products/i).should('be.visible')
 
         //Verify that the category is visible
         cy.contains('Category').should('be.visible')  
         
         //Find the category for women and choose a subcategory
         cy.get('#accordian').scrollIntoView().within(()=>{
             cy.get('div').eq(1).click();
             cy.get('#Men').find('ul li').contains('Tshirts').click({force:true});
         })
 
         //Verify that category page is displayed and confirm text 'MEN - TSHIRTS PRODUCTS'
         cy.location('pathname').should('equal', '/category_products/3')
         cy.contains(/MEN - TSHIRTS PRODUCTS/i).should('be.visible')
    }

    viewCartProducts(){
            //Navigate to products page
            cy.get('[class="nav navbar-nav"]').contains(/products/i).click();

            //Verify that the brands is visible
            cy.contains('Brands').should('be.visible')  
   
            //Find a brand category 
            cy.get('.brands-name').find('ul li').contains('Polo').click();
   
            //Verify the selected brand
            cy.location('pathname').should('equal', '/brand_products/Polo')
            cy.contains(/BRAND - POLO PRODUCTS/i).should('be.visible')
   
            //Find a brand category
            cy.get('.brands-name').find('ul li').contains('H&M').click();
   
            //Verify the selected brand
            cy.location('pathname').should('equal', '/brand_products/H&M')
            cy.contains(/BRAND - H&M PRODUCTS/i).should('be.visible')
    }

    searchAndVerifyCart(){
           //Navigate to products page
           cy.get('[class="nav navbar-nav"]').contains(/products/i).click();
           cy.location('pathname').should('equal', '/products')
   
           //Search for tshirt product
           cy.get('#search_product').type('tshirt')
           cy.get('#submit_search').click();
   
           //Verify the length of products
           cy.contains(/SEARCHED PRODUCTS/i).should('be.visible')
           cy.get('.features_items').find('.single-products').should('have.length', 6)
   
           //Add all matching products and go to checkout
           cy.get('.overlay-content').each(product => {
               cy.wrap(product).find('a').click({ force: true });
               cy.get('.modal-footer').find('button').click();
           });
           cy.get('.modal-body').find('a').click({ force: true });
   
   
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
            })
   
            //Navigate to cart page and verify the length
            cy.get('[class="nav navbar-nav"]').contains(/cart/i).click();
            cy.get('tbody tr').should('have.length', 6)
    }

    addReview(){
          // Load user details from a JSON fixture file
          cy.fixture('userDetails.json').then((userDetails=>{
            //Navigate to products page
            cy.get('[class="nav navbar-nav"]').contains(/products/i).click();
            cy.location('pathname').should('equal', '/products')
    
            //Click on 'View Product' button
            cy.get('.choose').eq(0).find('a').click();
            cy.get('[class="nav nav-tabs"]').contains(/Write your review/i).should('be.visible')
    
            //Enter name, email and review
            cy.get('#review-form').then((form=>{
                cy.wrap(form).find('#name').type(userDetails.first_name)
                cy.wrap(form).find('#email').type(email)
                cy.wrap(form).find('#review').type(userDetails.review)
                cy.wrap(form).find('button').click();
            }))
            
            //Verify success message 'Thank you for your review.'
            cy.get('#review-section').find('span').should('contain', 'Thank you for your review.')
        }))
    }

    recommendedItems(){
           //Scroll to the bottom of the page
           cy.scrollTo('bottom');
           cy.contains(/RECOMMENDED ITEMS/i).should('be.visible')
   
           //Go to recommended items and add a product to the cart
           cy.get('.recommended_items').find('.single-products').eq(0).find('a').click({force:true});
           cy.get('.modal-body').find('a').click();
           
           //Verify the product was added
           cy.get('tbody tr').find('td').eq(1).should((productName) => {
               const text = productName.text();
               expect(text.includes('Stylish Dress') || text.includes('Blue Top')).to.be.true;
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

export const onProductPage = new ProductPage();

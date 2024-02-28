export class SubscribtionPage{
    verifySubscribtionHomePage(){
         //Scroll into footer view
         cy.get('footer').scrollIntoView();

         //Ensure that the subscription text is visible
         cy.contains(/Subscription/i).should('be.visible')
 
         //Add the details 
         cy.get('form').then((form)=>{
             cy.wrap(form).find('[type="email"]').type('arditest@gmail.com')
             cy.wrap(form).find('button').click();
         })
 
         //Verify the subscribtion
         cy.get('[class="alert-success alert"]').invoke('text').should('equal', 'You have been successfully subscribed!')
    }

    verifySubscribtionCartPage(){
           //Navigate to the cart page
           cy.get('[class="nav navbar-nav"]').find('li').contains(/Cart/i).click();

           cy.get('footer').scrollIntoView();
           
           //Ensure that the subscription text is visible
           cy.contains(/Subscription/i).should('be.visible')
           cy.get('form').then((form)=>{
               cy.wrap(form).find('[type="email"]').type('arditest@gmail.com')
               cy.wrap(form).find('button').click();
           })
   
           //Verify the subscribtion
           cy.contains(/You have been successfully subscribed!/i).should('be.visible')
    }

    verifyTestCasePage(){
          //Verify test case page
          cy.get('.test_cases_list').eq(0).find('button').click();
          cy.location('pathname').should('equal', '/test_cases')
    }
}

export const onSubscribtionPage = new SubscribtionPage();
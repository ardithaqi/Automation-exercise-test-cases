import { onAuthenticationPage } from "../support/pageObject/authenticationPage";
import { onCheckoutPage } from "../support/pageObject/checkoutPage";
import { navigateTo } from "../support/pageObject/navigationPage";
import { onProductPage } from "../support/pageObject/productPage";
import { onSubscribtionPage } from "../support/pageObject/subscribtionPage";

beforeEach('Navigate to automationexercie.com site and validate', ()=>{
    // Visit the website under test
    cy.visit('https://www.automationexercise.com/');
    cy.location('pathname').should('equal', '/');
})

it('Authentication Page' , ()=>{
    onAuthenticationPage.registerUser();
    onAuthenticationPage.correctDetailsLogin();
    onAuthenticationPage.incorrectDetailsLogin();
    onAuthenticationPage.logoutUser();
    onAuthenticationPage.existingUser();
    onAuthenticationPage.contactUsForm();
    onAuthenticationPage.deleteUser();
})

it('Checkout Page', ()=>{
    onCheckoutPage.registerUser();
    onCheckoutPage.verifyAddressInCheckoutPage();
    onCheckoutPage.deleteUser();
})

it('Product Page', ()=>{
    onProductPage.verifyProducts();
    onProductPage.searchProduct();
    onProductPage.addProductsToCart();
    onProductPage.verifyProductQuantity();
    onProductPage.placeOrderWhileRegistring();
    onProductPage.placeOrderBeforeRegistring();
    onProductPage.loginBeforeCheckout();
    onProductPage.removeProduct();
    onProductPage.viewCategoryProducts();
    onProductPage.viewCartProducts();
    onProductPage.searchAndVerifyCart();
    onProductPage.addReview();
    onProductPage.recommendedItems();
    onProductPage.deleteUser();
})

it('Subscribtion Page', ()=>{
    onSubscribtionPage.verifySubscribtionHomePage();
    onSubscribtionPage.verifySubscribtionCartPage();
    onSubscribtionPage.verifyTestCasePage();
})
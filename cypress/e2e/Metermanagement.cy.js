describe("Meter Management", () => {
    it("Sending Meter Commands", () => {
      cy.visit("https://nextgen.ngi-test.iner.gy/");
      cy.contains("with").click();
  
      cy.origin("https://ngi-auth-ngi-test.auth.eu-west-1.amazoncognito.com", () => {
        cy.get('.panel-right-border > :nth-child(1) > :nth-child(1) > :nth-child(1) > form > div > .btn').click();
      });
  
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
  
      cy.get('.btn').click();
      cy.get('.btn').should("be.visible");
      cy.visit("https://nextgen.ngi-test.iner.gy/meters/meters");
      cy.get(':nth-child(2) > .level-2 > :nth-child(2) > .title-2 > .arrow').click();
      cy.get('.expand-item > .level-3 > :nth-child(1) > .title-3 > .title-text-3').click();
      cy.get('.ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
      cy.contains("Meter barcode").click();
      cy.get('#horizontal_login_value').click().type("NGI-MOCK-QA2122");
      cy.get('.button-general').click();
      cy.get('.jss16 > :nth-child(1)').click({multiple:true});
      cy.get('.jss25 > .ant-select > .ant-select-selector').click();
      
    })
})
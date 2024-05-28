describe("Meter Management",()=>{

    it(("Sending Meter Commands "),()=>{
  cy.visit("https://nextgen.ngi-test.iner.gy/"); 
  cy.contains("with").click();
  
  cy.origin("https://ngi-auth-ngi-test.auth.eu-west-1.amazoncognito.com", () => {
  cy.get('.panel-right-border > :nth-child(1) > :nth-child(1) > :nth-child(1) > form > div > .btn').click()
  
    })
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
  cy.get('.btn ').click();
  cy.log(cy.get('.btn').should("be.visible"));
  cy.visit("https://nextgen.ngi-test.iner.gy/meters/meters");
  cy.get("#horizontal_login_type").click();
  cy.contains("Meter barcode").click();
  cy.get('#horizontal_login_value').type("KEN0347363");
  cy.get('#horizontal_login > .button-general').click();
  cy.visit("https://nextgen.ngi-test.iner.gy/meters/meter/a5d8c215-deb0-11ed-95bf-06eb95f4ea9d");
  cy.get('.jss13 > :nth-child(1)').click();
  cy.get('.ant-select-selector').click();
  cy.xpath("/html/body/div[4]/div/div/div/div[2]/div[1]/div/div/div[1]/div").click();
  cy.get('#sendCommand_gasRemaining').click().type("5");
  cy.get('#sendCommand_creditRemaining').click().type("10");
  cy.get(':nth-child(2) > .button-general').click();
  cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Commands were sent successfully');
    })
  })
  })
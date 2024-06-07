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
      cy.get("#horizontal_login_type").click();
      cy.contains("Meter barcode").click();
      cy.get('#horizontal_login_value').type("KEN0347363");
      cy.get('#horizontal_login > .button-general').click();
      cy.visit("https://nextgen.ngi-test.iner.gy/meters/meter/a5d8c215-deb0-11ed-95bf-06eb95f4ea9d");
  
      // Intercept API requests
      const meterId = 'a5d8c215-deb0-11ed-95bf-06eb95f4ea9d';
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/updateSettings`).as('updateSettings');
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/sendInfq`).as('sendInfq');
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/openMeterValve`).as('openMeterValve');
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/closeMeterValve`).as('closeMeterValve');
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/unlock`).as('unlock');
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/cylinderInstall`).as('cylinderInstall');
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/lock`).as('lock');
      cy.intercept('POST', `https://ngi.ngi-test.iner.gy/metersmanagement/api/v1/meters/${meterId}/adjustData`).as('adjustData');
  
      // Adjust Data
      const _sendCommand_gasRemaining = Math.floor(1 + Math.random() * 12).toString();
      const _sendCommand_creditRemaining = Math.floor(100 + Math.random() * 400).toString();
  
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.xpath("/html/body/div[4]/div/div/div/div[2]/div[1]/div/div/div[1]/div").click();
      cy.get('#sendCommand_gasRemaining').click().type(_sendCommand_gasRemaining);
      cy.get('#sendCommand_creditRemaining').click().type(_sendCommand_creditRemaining);
      cy.get(':nth-child(2) > .button-general').click();
     
  
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@adjustData').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
  
      cy.wait(500);
      cy.reload();
      cy.wait(1000);
  
      // Close Meter Lock
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.xpath("/html/body/div[4]/div/div/div/div[2]/div[1]/div/div/div[2]/div").click();
      cy.get(':nth-child(2) > .button-general').click();
    
  
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@lock').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
  
      cy.wait(500);
      cy.reload();
      cy.wait(1000);
  
      // Close Meter Valve
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.xpath("/html/body/div[4]/div/div/div/div[2]/div[1]/div/div/div[3]/div").click();
      cy.get(':nth-child(2) > .button-general').click();
   
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@closeMeterValve').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
  
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
      cy.wait(500);
      cy.reload();
      cy.wait(500);
  
      // Cylinder Install
      const randomCylinderSerial = Math.floor(10000 + Math.random() * 90000).toString();
  
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.contains("Cylinder Install").should('be.visible').click();
  
      cy.get("#sendCommand_cylinderSerial").click().type(randomCylinderSerial);
      cy.get(':nth-child(2) > .button-general').click();
     
  
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@cylinderInstall').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
  
      // Open Meter Lock
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.contains("Open Meter Lock").should('be.visible').click();
      cy.get(':nth-child(2) > .button-general').click();
      
  
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@unlock').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
  
      // Open Meter Valve
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.contains("Open Meter Valve").should('be.visible').click();
      cy.get(':nth-child(2) > .button-general').click();
     
  
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@openMeterValve').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
  
      // Send INFQ
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.contains("Send INFQ").should('be.visible').click();
      cy.get(':nth-child(2) > .button-general').click();
    
  
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@sendInfq').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
  
      // Update Settings
      const sendCommand_gasRemaining = Math.floor(1 + Math.random() * 12).toString();
      const sendCommand_unitPrice = Math.floor(100 + Math.random() * 400).toString();
  
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.contains("Update Settings").should('be.visible').click();
  
      cy.get("#sendCommand_gasRemaining").click().type(sendCommand_gasRemaining);
      cy.get("#sendCommand_unitPrice").click().type(sendCommand_unitPrice);
  
      cy.get(':nth-child(2) > .button-general').click();
     
  
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.wait('@updateSettings').then((response) => {
        expect(response.response.statusCode).to.eq(200);
      });
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
    });
  });
  
describe("Meter Management", () => {
    const sendMeterCommand = (commandType, gasRemaining, creditRemaining, cylinderSerial, commandName) => {
      cy.get('.jss13 > :nth-child(1)').click();
      cy.get('.ant-select-selector').click();
      cy.contains(commandName).should('be.visible').click();
      if (gasRemaining !== undefined) {
        cy.get("#sendCommand_gasRemaining").click().type(gasRemaining);
      }
      if (creditRemaining !== undefined) {
        cy.get("#sendCommand_creditRemaining").click().type(creditRemaining);
      }
      if (cylinderSerial !== undefined) {
        cy.get("#sendCommand_cylinderSerial").click().type(cylinderSerial);
      }
      cy.get(':nth-child(2) > .button-general').click();
      cy.get('.ant-spin-container > .ant-space > :nth-child(2) > .button-general').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Commands were sent successfully');
      });
    };
  
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
  
      // Adjust Data
      const sendCommand_gasRemaining = Math.floor(1 + Math.random() * 12).toString();
      const sendCommand_creditRemaining = Math.floor(100 + Math.random() * 400).toString();
  
      // Sending Meter Command: Adjust Settings
      sendMeterCommand('Update Settings', sendCommand_gasRemaining, sendCommand_creditRemaining, undefined, 'Update Settings');
  
      // Close Meter Lock
      sendMeterCommand('Close Meter Lock', undefined, undefined, undefined, 'Close Meter Lock');
  
      // Close Meter Valve
      sendMeterCommand('Close Meter Valve', undefined, undefined, undefined, 'Close Meter Valve');
  
      // Cylinder Install
      const randomCylinderSerial = Math.floor(10000 + Math.random() * 90000).toString();
      sendMeterCommand('Cylinder Install', undefined, undefined, randomCylinderSerial, 'Cylinder Install');
  
      // Open Meter Lock
      sendMeterCommand('Open Meter Lock', undefined, undefined, undefined, 'Open Meter Lock');
  
      // Open Meter Valve
      sendMeterCommand('Open Meter Valve', undefined, undefined, undefined, 'Open Meter Valve');
  
      // Send INFQ
      sendMeterCommand('Send INFQ', undefined, undefined, undefined, 'Send INFQ');
  
      // Update Settings
      const sendCommand_unitPrice = Math.floor(100 + Math.random() * 400).toString();
      sendMeterCommand('Update Settings', sendCommand_gasRemaining, sendCommand_unitPrice, undefined, 'Update Settings');
    });
  });
  
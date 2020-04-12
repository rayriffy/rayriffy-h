describe('poster', () => {
  beforeEach(() => cy.visit('/encode/76578'));

  it('should display cover image', () => {
    // Custom command example, see `../support/commands.ts` file

    // Function helper example, see `../support/app.po.ts` file
    cy
      .get('#cover-box > div')
      .should('be.visible')
      .should('have.css', 'background-image');
  });
});

describe("404 Not Found Page", () => {
  it("should display the Not Found page and navigate home", () => {
    cy.visit("http://localhost:3000/some/unknown/path", {
      failOnStatusCode: false,
    });

    cy.contains("404").should("exist");
    cy.contains("Oops! The page you're looking for doesn't exist.").should(
      "exist"
    );
    cy.contains("Try going back to the homepage.").should("exist");

    cy.contains("Home").click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("User information").should("exist");
  });
});

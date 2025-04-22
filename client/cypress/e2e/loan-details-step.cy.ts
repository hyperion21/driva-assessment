describe("Loan Details Step", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="input-first-name"]').type("Aldrin");
    cy.get('[data-testid="input-last-name"]').type("Cunanan");
    cy.get('[data-testid="input-email"]').type("aldrincunanan@example.com");

    cy.get('[data-testid="select-employment-status"]').click();
    cy.get("li").contains("Employed").click();
    cy.get('[data-testid="input-employer-name"]').type("Driva");

    cy.contains("Next").click();
    cy.contains("Amount to be loaned");
  });

  it("Submits valid loan details for vehicle loan purpose", () => {
    cy.intercept("POST", "http://localhost:3001/api/loans/calculate-lenders", {
      statusCode: 200,
      body: [
        {
          id: "lender-a",
          name: "Lender A",
          interest: 5.5,
          fee: "$10 processing fee",
          monthly: 153,
        },
        {
          id: "lender-b",
          name: "Lender B",
          interest: 5,
          fee: "$15 application fee",
          monthly: 151,
        },
        {
          id: "lender-c",
          name: "Lender C",
          interest: 6,
          monthly: 155,
        },
      ],
    }).as("calculateLenders");

    cy.get('[data-testid="select-loan-purpose"]').click();
    cy.get("li").contains("Vehicle").click();
    cy.get('[data-testid="input-loan-amount"]').clear().type("3000");
    cy.get('[data-testid="input-deposit"]').clear().type("1000");
    cy.get('[data-testid="input-loan-term"]').clear().type("4");

    cy.contains("Submit").click();

    cy.wait("@calculateLenders").then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
      expect(response?.body).to.have.length(3);
    });
    cy.contains("Loan Suggestions");
  });

  it("Submits valid loan details for non vehicle loan purpose", () => {
    cy.intercept("POST", "http://localhost:3001/api/loans/calculate-lenders", {
      statusCode: 200,
      body: [
        {
          id: "lender-a",
          name: "Lender A",
          interest: 5.5,
          fee: "$10 processing fee",
          monthly: 153,
        },
        {
          id: "lender-b",
          name: "Lender B",
          interest: 5,
          fee: "$15 application fee",
          monthly: 151,
        },
        {
          id: "lender-c",
          name: "Lender C",
          interest: 6,
          monthly: 155,
        },
      ],
    }).as("calculateLenders");

    cy.get('[data-testid="select-loan-purpose"]').click();
    cy.get("li").contains("Home Improvement").click();
    cy.get('[data-testid="input-loan-amount"]').clear().type("5000");
    cy.get('[data-testid="input-loan-term"]').clear().type("6");

    cy.contains("Submit").click();

    cy.wait("@calculateLenders").then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
      expect(response?.body).to.have.length(3);
    });

    cy.contains("Loan Suggestions");
  });

  it("Shows validation errors", () => {
    cy.contains("Submit").click();
    cy.contains("Minimum amount is $2000");
    cy.contains("Minimum 1 year");

    cy.get('[data-testid="input-loan-amount"]').clear().type("3000");
    cy.get('[data-testid="input-deposit"]').clear().type("3001");
    cy.get('[data-testid="input-loan-term"]').clear().type("8");

    cy.contains("Submit").click();
    cy.contains("Deposit must not exceed loan amount");
    cy.contains("Maximum 7 years");
  });

  it("Resets loan fields after clicking Reset", () => {
    cy.get('[data-testid="select-loan-purpose"]').click();
    cy.get("li").contains("Home Improvement").click();
    cy.get('[data-testid="input-loan-amount"]').clear().type("3000");
    cy.get('[data-testid="input-loan-term"]').clear().type("7");

    cy.contains("Reset").click();

    cy.get('[data-testid="select-loan-purpose"]')
      .find("input")
      .should("have.value", "vehicle");
    cy.get('[data-testid="input-loan-amount"] input').should("have.value", "0");
    cy.get('[data-testid="input-deposit"] input').should("have.value", "0");
    cy.get('[data-testid="input-loan-term"] input').should("have.value", "0");
  });

  it("Back button returns to personal details with values retained", () => {
    cy.contains("Back").click();
    cy.contains("User information");

    cy.get('[data-testid="input-first-name"] input').should(
      "have.value",
      "Aldrin"
    );
    cy.get('[data-testid="input-last-name"] input').should(
      "have.value",
      "Cunanan"
    );
    cy.get('[data-testid="input-email"] input').should(
      "have.value",
      "aldrincunanan@example.com"
    );
    cy.get('[data-testid="select-employment-status"]')
      .find("input")
      .should("have.value", "employed");
    cy.get('[data-testid="input-employer-name"] input').should(
      "have.value",
      "Driva"
    );
  });
});

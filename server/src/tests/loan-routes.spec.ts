import request from "supertest";
import app from "../app";

describe("Loan API Endpoints", () => {
  const apiKey = process.env.API_KEY || "";
  describe("POST /api/loans/calculate-lenders", () => {
    it("should return 401 if API key is missing or invalid", async () => {
      const response = await request(app)
        .post("/api/loans/calculate-lenders")
        .send({
          amount: 10000,
          deposit: 2000,
          loanTerm: 5,
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 400 if the amount, deposit, or loanTerm is not a number", async () => {
      const response = await request(app)
        .post("/api/loans/calculate-lenders")
        .set("x-api-key", apiKey)
        .send({
          amount: "10000",
          deposit: 2000,
          loanTerm: 5,
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Invalid input: amount, deposit, and loanTerm must be numbers"
      );
    });

    it("should return 200 and a list of lenders with calculated monthly payments", async () => {
      const result = [
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
        { id: "lender-c", name: "Lender C", interest: 6, monthly: 155 },
      ];
      const response = await request(app)
        .post("/api/loans/calculate-lenders")
        .set("x-api-key", apiKey)
        .send({
          amount: 10000,
          deposit: 2000,
          loanTerm: 5,
        });

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(result);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

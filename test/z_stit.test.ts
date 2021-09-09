import request from "supertest";
import server from "../src/app";

// $(npm bin)/jest ./test/z_stit.test.ts

//

describe("Running express", function () {
  it("/ responds with 200", function (done) {
    request(server).get("/").expect(200, done);
  });
});

//

describe("Running Apis test for junior user", () => {
  let token: string;
  it("Login", (done) => {
    request(server)
      .post("/login")
      .send({
        email: "junior.salesrep@stit.talent",
        password: "ymWK5FHn27gjd9clZTR8QfZWOIBQTh1m",
      })
      .expect(200, (err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });

  it("get products", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/Games")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });

  it("get products with tag", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/Baby?tags=Incredible,Generic")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });
});

//

describe("Running Apis test for middle user", () => {
  let token: string;
  it("Login", (done) => {
    request(server)
      .post("/login")
      .send({
        email: "middle.salesrep@stit.talent",
        password: "9fiD2NCGeLqjSSjhUP78kDS3ic2B93Wy",
      })
      .expect(200, (err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });

  it("get products", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/Games")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });

  it("get products with tag", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/Baby?tags=Incredible,Generic")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });
});

//

describe("Running Apis test for senior user", () => {
  let token: string;
  it("Login", (done) => {
    request(server)
      .post("/login")
      .send({
        email: "senior.salesrep@stit.talent",
        password: "Scl2opcPUOEcTd0abrSBxwHsDuHklEs2",
      })
      .expect(200, (err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });

  it("get products", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/Games")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });

  it("get products with tag", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/Baby?tags=Incredible,Generic")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });
});

//

describe("Running Apis test for intern user", () => {
  let token: string;
  it("Login", (done) => {
    request(server)
      .post("/login")
      .send({
        email: "intern.salesrep@stit.talent",
        password: "Or63inluKBLPs006vw9diRmzdCjYLB9H",
      })
      .expect(200, (err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });

  it("get products that is not permitted", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/Games")
      .set({ Authorization: `Bearer ${token}` })
      .expect(401, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });

  it("get products", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/STUFF A")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });

  it("get products with tag", (done) => {
    if (!token) return done(new Error("No token"));
    request(server)
      .get("/products/STUFF A?tags=Ergonomic,Generic")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log(`Total: ${res.body.total}`);
        done();
      });
  });
});

//

import request from "supertest";
import server from "../src/app";

// $(npm bin)/jest ./test/z_findupit.test

//

describe("Running express", function () {
  it("/ responds with 200", function (done) {
    request(server).get("/").expect(200, done);
  });
});

//

describe("Running Apis test for GET user", () => {
  let token: string;
  it("Login", (done) => {
    request(server)
      .get("/users/")
      .expect(200, (err, res) => {
        if (err) return done(err);
        console.log("res: ", res);
        // token = res.body.token;
        done();
      });
  });
});

//

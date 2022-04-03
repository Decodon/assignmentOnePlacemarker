import { assert } from "chai";
import { placemarkerService } from "./placemarker-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    placemarkerService.clearAuth();
    await placemarkerService.createUser(maggie);
    await placemarkerService.authenticate(maggie);
    await placemarkerService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await placemarkerService.createUser(maggie);
    const response = await placemarkerService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await placemarkerService.createUser(maggie);
    const response = await placemarkerService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    placemarkerService.clearAuth();
    try {
      await placemarkerService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});

import { assert } from "chai";
import { placemarkerService } from "./placemarker-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, town, testPlacemarkers } from "../fixtures.js";

suite("Placemarker API tests", () => {
  let user = null;

  setup(async () => {
    await placemarkerService.deleteAllPlacemarkers();
    await placemarkerService.deleteAllUsers();
    user = await placemarkerService.createUser(maggie);
    town.userid = user._id;
  });

  teardown(async () => {});

  test("create placemarker", async () => {
    const returnedPlacemarker = await placemarkerService.createPlacemarker(
      town
    );
    assert.isNotNull(returnedPlacemarker);
    assertSubset(town, returnedPlacemarker);
  });

  test("delete a placemarker", async () => {
    const placemarker = await placemarkerService.createPlacemarker(town);
    const response = await placemarkerService.deletePlacemarker(
      placemarker._id
    );
    assert.equal(response.status, 204);
    try {
      const returnedPlacemarker = await placemarkerService.getPlacemarker(
        placemarker.id
      );
      assert.fail("Should not return a response");
    } catch (error) {
      assert(
        error.response.data.message === "No Placemarker with this id",
        "Incorrect Response Message"
      );
    }
  });

  test("create multiple placemarkers", async () => {
    for (let i = 0; i < testPlacemarkers.length; i += 1) {
      testPlacemarkers[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkerService.createPlacemarker(testPlacemarkers[i]);
    }
    let returnedLists = await placemarkerService.getAllPlacemarkers();
    assert.equal(returnedLists.length, testPlacemarkers.length);
    await placemarkerService.deleteAllPlacemarkers();
    returnedLists = await placemarkerService.getAllPlacemarkers();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant placemarker", async () => {
    try {
      const response = await placemarkerService.deletePlacemarker("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(
        error.response.data.message === "No Placemarker with this id",
        "Incorrect Response Message"
      );
    }
  });
});

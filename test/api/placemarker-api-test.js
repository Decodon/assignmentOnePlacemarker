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

  test("create placemarker", async () => {});

  test("delete a placemarker", async () => {});

  test("create multiple placemarkers", async () => {});

  test("remove non-existant placemarker", async () => {});
});

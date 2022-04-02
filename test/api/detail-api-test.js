import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkerService } from "./placemarker-service.js";
import {
  maggie,
  town,
  testPlacemarkers,
  testDetails,
  testDetail,
} from "../fixtures.js";

suite("Detail API tests", () => {
  let user = null;
  let newTown = null;

  setup(async () => {
    await placemarkerService.deleteAllPlacemarkers();
    await placemarkerService.deleteAllUsers();
    await placemarkerService.deleteAllDetails();
    user = await placemarkerService.createUser(maggie);
    town.userid = user._id;
    newTown = await placemarkerService.createPlacemarker(town);
  });

  teardown(async () => {});

  test("create detail", async () => {
    const returnedDetail = await placemarkerService.createDetail(
      newTown._id,
      testDetail
    );
    assertSubset(testDetail, returnedDetail);
  });

  test("create Multiple details", async () => {
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkerService.createDetail(newTown._id, testDetails[i]);
    }
    const returnedDetails = await placemarkerService.getAllDetails();
    assert.equal(returnedDetails.length, testDetails.length);
    for (let i = 0; i < returnedDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const detail = await placemarkerService.getDetail(returnedDetails[i]._id);
      assertSubset(detail, returnedDetails[i]);
    }
  });

  test("Delete detailApi", async () => {
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkerService.createDetail(newTown._id, testDetails[i]);
    }
    let returnedDetails = await placemarkerService.getAllDetails();
    assert.equal(returnedDetails.length, testDetails.length);
    for (let i = 0; i < returnedDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const detail = await placemarkerService.deleteDetail(
        returnedDetails[i]._id
      );
    }
    returnedDetails = await placemarkerService.getAllDetails();
    assert.equal(returnedDetails.length, 0);
  });

  test("denormalised placemarker", async () => {
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkerService.createDetail(newTown._id, testDetails[i]);
    }
    const returnedPlacemarker = await placemarkerService.getPlacemarker(
      newTown._id
    );
    assert.equal(returnedPlacemarker.details.length, testDetails.length);
    for (let i = 0; i < testDetails.length; i += 1) {
      assertSubset(testDetails[i], returnedPlacemarker.details[i]);
    }
  });
});

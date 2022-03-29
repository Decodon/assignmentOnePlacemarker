import { assert } from "chai";
import { db } from "../../src/models/db.js";
import {
  testPlacemarkers,
  testDetails,
  town,
  testDetail,
  testUsers,
  town2,
} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Detail Model tests", () => {
  let townList = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkerStore.deleteAllPlacemarkers();
    await db.detailStore.deleteAllDetails();
    townList = await db.placemarkerStore.addPlacemarker(town);
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDetails[i] = await db.detailStore.addDetail(
        townList._id,
        testDetails[i]
      );
    }
  });

  test("create single detail", async () => {
    const town2List = await db.placemarkerStore.addPlacemarker(town2);
    const detail = await db.detailStore.addDetail(town2List._id, testDetail);
    assert.isNotNull(detail._id);
    assertSubset(testDetail, detail);
  });

  test("get multiple details", async () => {
    const details = await db.detailStore.getDetailsByPlacemarkerId(
      townList._id
    );
    assert.equal(testDetails.length, testDetails.length);
  });

  test("delete all details", async () => {
    const details = await db.detailStore.getAllDetails();
    assert.equal(testDetails.length, details.length);
    await db.detailStore.deleteAllDetails();
    const newDetails = await db.detailStore.getAllDetails();
    assert.equal(0, newDetails.length);
  });

  test("get detail - success", async () => {
    const town2List = await db.placemarkerStore.addPlacemarker(town2);
    const detail = await db.detailStore.addDetail(town2List._id, testDetail);
    const newDetail = await db.detailStore.getDetailById(detail._id);
    assertSubset(testDetail, newDetail);
  });

  test("delete One Detail - success", async () => {
    await db.detailStore.deleteDetail(testDetails[0]._id);
    const details = await db.detailStore.getAllDetails();
    assert.equal(details.length, testPlacemarkers.length - 1);
    const deletedDetail = await db.detailStore.getDetailById(
      testDetails[0]._id
    );
    assert.isNull(deletedDetail);
  });

  test("get a detail - bad params", async () => {
    assert.isNull(await db.detailStore.getDetailById(""));
    assert.isNull(await db.detailStore.getDetailById());
  });

  test("delete one detail - fail", async () => {
    await db.detailStore.deleteDetail("bad-id");
    const details = await db.detailStore.getAllDetails();
    assert.equal(details.length, testPlacemarkers.length);
  });
});

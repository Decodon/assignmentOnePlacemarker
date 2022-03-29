import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarkers, town } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemarker Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.placemarkerStore.deleteAllPlacemarkers();
    for (let i = 0; i < testPlacemarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarkers[i] = await db.placemarkerStore.addPlacemarker(
        testPlacemarkers[i]
      );
    }
  });

  test("create a placemarker", async () => {
    const placemarker = await db.placemarkerStore.addPlacemarker(town);
    assertSubset(town, placemarker);
    assert.isDefined(placemarker._id);
  });

  test("delete all placemarkers", async () => {
    let returnedPlacemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(returnedPlacemarkers.length, 3);
    await db.placemarkerStore.deleteAllPlacemarkers();
    returnedPlacemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(returnedPlacemarkers.length, 0);
  });

  test("get a placemarker - success", async () => {
    const placemarker = await db.placemarkerStore.addPlacemarker(town);
    const returnedPlacemarker = await db.placemarkerStore.getPlacemarkerById(
      placemarker._id
    );
    assertSubset(town, placemarker);
  });

  test("delete One Placemarker - success", async () => {
    const id = testPlacemarkers[0]._id;
    await db.placemarkerStore.deletePlacemarkerById(id);
    const returnedPlacemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(returnedPlacemarkers.length, testPlacemarkers.length - 1);
    const deletedPlacemarker = await db.placemarkerStore.getPlacemarkerById(id);
    assert.isNull(deletedPlacemarker);
  });

  test("get a placemarker - bad params", async () => {
    assert.isNull(await db.placemarkerStore.getPlacemarkerById(""));
    assert.isNull(await db.placemarkerStore.getPlacemarkerById());
  });

  test("delete One Placemarker - fail", async () => {
    await db.placemarkerStore.deletePlacemarkerById("bad-id");
    const allPlacemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(testPlacemarkers.length, allPlacemarkers.length);
  });
});

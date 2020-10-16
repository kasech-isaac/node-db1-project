const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

// ******get"/"******
router.get("/", async (req, res, next) => {
  try {
    // translate to "SELECT FROM MESSAGE"
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

//******get"/:id"******
router.get("/:id", async (req, res, next) => {
  try {
    const account = await db("accounts").where("id", req.params.id).first();
    res.json(account);
  } catch (err) {
    next(err);
  }
});
// ******POST"/"******
router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    if (!paylod.title || !paylod.contents) {
      return res.status(400).json({ message: "need name and budget" });
    }
    // translates to `INSERT INTO acount (name, budget) VALUES (?, ?);`
    const [id] = await db.insert(payload).into("accounts");
    res.json({ id });
  } catch (err) {
    next(err);
  }
});

// ******PUT"/"******
router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    // translates to UPDATE "accounts" SET "name" = ? AND "budget" = ? WHERE "id" = ?;
    await db("accounts").where("id", req.params.id).update(payload);
    res.json(await getAccountsByID(req.params.id));
  } catch (err) {
    next(err);
  }
});

// ******DELETE"/"******
router.delete("/:id", async (req, res, next) => {
  try {
    // translates to DELETE FROM "accounts" WHERE "id" = ?;
    await db("accounts").where("id", req.params.id).del();
    // (204 means success but empty response)
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

function getAccountsByID(id) {
  return db
  .first()
  .from("accounts")
  .where("id", id);
}
module.exports = router;

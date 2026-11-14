import test from "node:test";
import assert from "node:assert/strict";
import { filterPets, validate, requestText } from "../src/utils.js";
import { pets } from "../src/data.js";
test("directory combines case-insensitive query, species, age and saved filters", () => {
  assert.deepEqual(
    filterPets(pets, {
      query: " LUNA ",
      type: "Cat",
      age: "Young",
      savedOnly: true,
      saved: ["luna"],
    }).map((p) => p.id),
    ["luna"],
  );
  assert.equal(filterPets(pets, { query: "Luna", type: "Dog" }).length, 0);
  assert.equal(filterPets(pets, { savedOnly: true, saved: [] }).length, 0);
});
test("age bands include boundaries and senior pets", () => {
  assert.equal(filterPets(pets, { age: "Young" }).length, 3);
  assert.equal(filterPets(pets, { age: "Adult" }).length, 2);
  assert.equal(filterPets(pets, { age: "Senior" })[0].id, "daisy");
});
test("validation rejects whitespace, malformed email, phone and underage requests", () => {
  const f = [
    { name: "name", label: "Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "phone", type: "tel", label: "Phone", required: true },
    {
      name: "age",
      type: "number",
      label: "Age",
      min: 21,
      max: 100,
      required: true,
    },
  ];
  assert.equal(
    Object.keys(
      validate({ name: " ", email: "bad", phone: "123", age: "20" }, f),
    ).length,
    4,
  );
  assert.deepEqual(
    validate(
      { name: "Demo", email: "demo@example.com", phone: "81234567", age: "21" },
      f,
    ),
    {},
  );
});
test("request export contains selected pet and all field values", () => {
  const text = requestText(
    "Adoption",
    { name: "Sample", reason: "A stable home & daily care" },
    pets[0],
  );
  assert.match(text, /Buddy \(buddy\)/);
  assert.match(text, /A stable home & daily care/);
  assert.match(text, /does not confirm adoption/);
});

test("password validation preserves spaces as part of demo credentials", () => {
  const fields = [{ name: "password", label: "Password", type: "password", required: true, minLength: 8 }];
  assert.deepEqual(validate({ password: " demo123 " }, fields), {});
  assert.ok(validate({ password: "short" }, fields).password);
  assert.ok(validate({ password: "        " }, fields).password);
});

test("select values and whole-year applicant age are checked", () => {
  const fields = [
    { name: "rating", label: "Rating", required: true, options: ["1", "2", "3", "4", "5"] },
    { name: "age", label: "Age", type: "number", min: 21, max: 100 },
  ];
  assert.equal(Object.keys(validate({ rating: "6", age: "21.5" }, fields)).length, 2);
  assert.deepEqual(validate({ rating: "5", age: "22" }, fields), {});
  assert.deepEqual(validate({ petAge: "0.5" }, [{ name: "petAge", type: "number", min: 0, max: 30, step: "any" }]), {});
});

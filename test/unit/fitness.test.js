import { test } from "tap";
import { AckleyFitness } from "../../lib/fitness/index.js";

const ackley = new AckleyFitness();

test("Ackley", function (t) {
  var subjects = [
    [0, 0],
    [0, 0, 0],
  ];

  for (var i in subjects) {
    t.equal(ackley.apply(subjects[i]), 0, "Ackley " + i + " = " + subjects[i]);
    t.equal(
      ackley.apply(subjects[i]),
      0,
      "Ackley f " + i + " = " + subjects[i]
    );
  }
  subjects = [
    [0, 0.5],
    [0, 0, 0.1],
  ];
  for (i in subjects) {
    t.equal(
      ackley.apply(subjects[i]),
      ackley.apply(subjects[i]),
      "Ackley " + i + " = " + subjects[i] + " is deterministic "
    );
  }
  t.end();
});

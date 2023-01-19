import { test } from "tap";
import {
  AckleyFitness,
  RastriginFitness,
  MMDPFitness,
} from "../../lib/fitness/index.js";

test("Ackley", function (t) {
  const ackley = new AckleyFitness();

  let subjects = [
    [0, 0],
    [0, 0, 0],
  ];

  for (let i in subjects) {
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
  for (let i in subjects) {
    t.equal(
      ackley.apply(subjects[i]),
      ackley.apply(subjects[i]),
      "Ackley " + i + " = " + subjects[i] + " is deterministic "
    );
  }
  t.end();
});

test("Rastrigin", function (t) {
  let subjects = [
    [0, 0],
    [0, 0, 0],
  ];
  var rastrigin = new RastriginFitness();

  for (let i in subjects) {
    t.equal(
      rastrigin.apply(subjects[i]),
      0,
      "Rastrigin " + i + " = " + subjects[i]
    );
    t.equal(
      rastrigin.apply(subjects[i]),
      0,
      "Rastrigin f " + i + " = " + subjects[i]
    );
  }
  subjects = [
    [0, 0.5],
    [0, 0, 0.1],
  ];
  for (let i in subjects) {
    t.equal(
      rastrigin.apply(subjects[i]),
      rastrigin.apply(subjects[i]),
      "Rastrigin " + i + " = " + subjects[i] + "Works consistently"
    );
  }
  t.end();
});

test("MMDP", function (t) {
  const this_mmdp = new MMDPFitness();
  let sum = 0;
  const subjects = {
    111111: 1,
    "000000111111": 2,
    "000001": 0,
    100001: 0.360384,
    101001: 0.640576,
  };
  let many_mmdp = "";
  for (let i in subjects) {
    many_mmdp += i;
    sum += subjects[i];
    t.equal(this_mmdp.apply(i), subjects[i], "mmdp " + i + " = " + subjects[i]);
  }
  t.equal(this_mmdp.apply(many_mmdp), sum, "Many MMDP");

  t.end();
});

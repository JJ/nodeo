var test = require("tap").test,
  nodeo = require(__dirname + "/../../lib/nodeo.js");

var trap = nodeo.trap,
  mmdp = nodeo.MMDP,
  functions = nodeo.functions,
  ackley = nodeo.Ackley,
  rastrigin = nodeo.Rastrigin,
  hiff = nodeo.HIFF;

test("loads", function (t) {
  t.ok(trap, "Loaded OK");
  t.end();
});

test("l-trap", function (t) {
  var a = 1,
    b = 2;
  var params3 = { l: 3, a: a, b: b, z: 2 };
  var subjects3 = { 111: b, "000": a, "011": 0, 110: 0 };
  test_trap(t, trap, params3, subjects3);
  var params4 = { l: 4, a: a, b: b, z: 3 };
  var subjects4 = { 1111: b, "0000": a, "0111": 0, 1110: 0 };
  test_trap(t, trap, params4, subjects4);
  t.end();
});

test("MMDP", function (t) {
  var this_mmdp = new mmdp.MMDP();
  var many_mmdp = "";
  var sum = 0;
  var subjects = {
    111111: 1,
    "000000111111": 2,
    "000001": 0,
    100001: 0.360384,
    101001: 0.640576,
  };
  for (var i in subjects) {
    many_mmdp += i;
    sum += subjects[i];
    t.equal(this_mmdp.apply(i), subjects[i], "mmdp " + i + " = " + subjects[i]);
  }
  t.equal(this_mmdp.apply(many_mmdp), sum, "Many MMDP");

  t.end();
});

test("HIFF", function (t) {
  var this_HIFF = new hiff.HIFF();
  var many_HIFF = "";
  var sum = 0;
  var subjects = {
    10: 2,
    1100: 8,
    1011: 6,
    10101101100100: 16,
    1010110110010011: 22,
    "010101101100100": 19,
    "00000000100000": 42,
    1111111110000110: 42,
    "0010110100101101": 24,
  };
  for (var i in subjects) {
    many_HIFF += i;
    sum += subjects[i];
    t.equal(this_HIFF.apply(i), subjects[i], "HIFF " + i + " = " + subjects[i]);
  }
  t.equal(this_HIFF.apply(many_HIFF), 163, "Many HIFF");

  t.end();
});

test("Ackley", function (t) {
  var subjects = [
    [0, 0],
    [0, 0, 0],
  ];
  var ack = new ackley.Ackley();

  for (var i in subjects) {
    t.equal(
      functions.ackley(subjects[i]),
      0,
      "Ackley " + i + " = " + subjects[i]
    );
    t.equal(ack.apply(subjects[i]), 0, "Ackley f " + i + " = " + subjects[i]);
  }
  subjects = [
    [0, 0.5],
    [0, 0, 0.1],
  ];
  for (i in subjects) {
    t.equal(
      ack.apply(subjects[i]),
      functions.ackley(subjects[i]),
      "Ackley " + i + " = " + subjects[i]
    );
  }
  t.end();
});

test("Rastrigin", function (t) {
  var subjects = [
    [0, 0],
    [0, 0, 0],
  ];
  var rast = new rastrigin.Rastrigin();

  for (var i in subjects) {
    t.equal(
      functions.Rastrigin(subjects[i]),
      0,
      "Rastrigin " + i + " = " + subjects[i]
    );
    t.equal(
      rast.apply(subjects[i]),
      0,
      "Rastrigin f " + i + " = " + subjects[i]
    );
  }
  subjects = [
    [0, 0.5],
    [0, 0, 0.1],
  ];
  for (i in subjects) {
    t.equal(
      rast.apply(subjects[i]),
      functions.Rastrigin(subjects[i]),
      "Rastrigin " + i + " = " + subjects[i]
    );
  }
  t.end();
});

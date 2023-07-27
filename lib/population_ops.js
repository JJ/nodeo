export class Evaluation {
  #fitnessFunction;
  #chromosomeClass;

  constructor(fitnessFunction, chromosomeClass) {
    this.#fitnessFunction = fitnessFunction;
    this.#chromosomeClass = chromosomeClass;
  }

  apply(chromosomeArray) {
    let resultingPopulation = [];
    chromosomeArray.forEach((element) => {
      resultingPopulation.push(
        new this.#chromosomeClass(element, this.#fitnessFunction(element))
      );
    });
    return resultingPopulation;
  }
}

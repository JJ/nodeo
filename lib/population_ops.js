export function evaluation(chromosomeClass, chromosomeArray, fitnessFunction) {
  let resultingPopulation = [];
  chromosomeArray.forEach((element) => {
    resultingPopulation.push(
      new chromosomeClass(element, fitnessFunction(element))
    );
  });
  return resultingPopulation;
}

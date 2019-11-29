export default (value: number, [inputMin, inputMax]: number[], [outputMin, outputMax]: number[], round = v => v) => {
  return round(((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin)
}

export default (value: number, [inputMin, inputMax]: number[], [outputMin, outputMax]: number[]) => {
  return Math.round(((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin)
}

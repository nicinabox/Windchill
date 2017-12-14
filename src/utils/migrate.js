export default (migrator, reducer, initialState) => {
  return (state = initialState, action) => {
    return reducer(migrator(state), action)
  }
}

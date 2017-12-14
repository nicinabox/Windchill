export default (reducer, migrator, initialState) => (state = initialState, action) => {
  return reducer(migrator(state), action)
}

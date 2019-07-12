export default {
  SET: (state, value) => {
    state.scoreboard = value
  },
  DELETE: (state, value) => {
    let position = state.scoreboard.indexOf(value)
    state.scoreboard.splice(position, 1)
  },
  ADD: (state, value) => {
    state.scoreboard.push(value)
  },
  UPDATE: (state, value) => {
    state.scoreboard[value.position].raw = value.raw
    state.scoreboard[value.position].percent = value.percent
  },
  APPROVED: (state, value) => {
    
    state.scoreboard = Object.assign(state.scoreboard, { approved: value })
  }
}

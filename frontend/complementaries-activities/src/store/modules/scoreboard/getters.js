export default {
  getBoard: state => {
    return state.scoreboard
  },
  getApproved: state => {
    console.log(state.scoreboard.approved)
    return state.scoreboard.approved
  }
}

class Subscription {
  constructor (pusher) {
    this.pusher = pusher
  }
  recalculeScore (channel, data) {
    const newdata = {
      id: data.id,
      evaluation: data.evaluation
    }
    this.pusher.trigger(String(channel), 'my-event', {
      "message": newdata
    });
  
  }
}

export default Subscription
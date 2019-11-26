export default {
  currentInstance: 'https://invidio.us',
  instances: [
    'https://invidio.us',
    'https://invidious.snopyta.org',
    'https://invidiou.sh',
    'https://invidious.ggc-project.de/'
  ],

  init() {
    if (localStorage.getItem('instance')) {
      this.currentInstance = localStorage.getItem('instance')
    }
  },

  setInstance(instance) {
    localStorage.setItem('instance', instance)
    this.currentInstance = instance
  }
}
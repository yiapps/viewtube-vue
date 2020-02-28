export const state = () => ({
  theme: 'default',
  defaults: {
    theme: [
      { value: 'default', name: 'Dark Theme' },
      { value: 'light', name: 'Light Theme' },
      { value: 'dark-no-gradient', name: 'Dark Theme without background gradients' },
      { value: 'black', name: 'Black Theme' }
    ]
  },
  miniplayer: true
})
export const getters = {
  theme: (state) => state.theme,
  defaultThemes: (state) => state.defaults.theme,
  miniplayer: (state) => state.miniplayer
}
export const mutations = {
  setTheme(state, theme) {
    if (state.defaults.theme.find(e => e.value === theme)) {
      state.theme = theme
    }
  },
  setMiniplayer(state, enabled) {
    state.miniplayer = enabled
  }
}
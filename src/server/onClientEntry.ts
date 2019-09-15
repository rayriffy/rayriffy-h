export const onClientEntry = () => {
  if (process.env.NODE_ENV !== `production`) {
    require(`preact/debug`)
  }
}

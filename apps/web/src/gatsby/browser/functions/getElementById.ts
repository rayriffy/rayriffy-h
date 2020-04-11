export const getElementById = (id: string): HTMLElement => {
  const element = document.getElementById(id)

  return element !== null ? element : document.createElement('div')
}

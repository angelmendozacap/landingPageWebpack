import logoImg from '../img/batman-logo.png'

const loadLogo = () => {
  const logo = document.querySelector('.logo')
  logo.setAttribute('src', logoImg)
}
export default loadLogo
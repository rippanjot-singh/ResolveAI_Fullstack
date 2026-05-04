import logo from './logo.png'
import AuthPhoto from './authPhoto.png'
import AuthPhotoDark from './authPhotoDark.png'

const constants = {
    name: "ResolveAI",
    logo: logo,
    AuthPhoto: AuthPhoto,
    AuthPhotoDark: AuthPhotoDark,
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'
}

export default constants;

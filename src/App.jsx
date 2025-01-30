import './App.css'
import LandingPage from './components/LandingPage'
import SignIn from './components/SignIn'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import { RecoilRoot} from 'recoil'
import MainAppHome from './components/MainAppHome'
import Loader from './components/LoadingScreen'
import AfterSearchMainApp from './components/AfterSearchMainApp'
import Markdown from 'react-markdown'

function App() {
  // console.log(<Markdown>Hello</Markdown>);
  
  return (<>
     <div>
     <RecoilRoot>
     <BrowserRouter>
     <Routes>
       <Route index="/" element={<LandingPage/>}/>
       <Route path="/home" element={<MainAppHome/>}/>
       <Route path="/signup" element={<SignUp/>}/>
       <Route path="/signin" element={<SignIn/>}/>
       <Route path="/askMemories" element={<AfterSearchMainApp/>}/>
     </Routes>
     </BrowserRouter>
     </RecoilRoot>
     </div>

    </>
  )
}

export default App

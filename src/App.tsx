import { useRef, useState } from 'react'
import { Captcha } from 'primereact/captcha'
import { Toast } from 'primereact/toast'
import axios from 'axios'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const toastRef = useRef<any>(null)

  return (
    <div className="App">
      <Toast ref={toastRef}  />
      <Captcha
        siteKey={import.meta.env.VITE_CAPTCHA_PUBLIC_KEY}
        language='es'
        onResponse={async (data) => {
          console.log({data})
          const response =await axios.post('http://172.23.30.6:3000/validate/captcha', {
            token: data.response
          })
          if (response.data?.success) {
            toastRef?.current.show({severity: 'success', summary: 'Success Message', detail: 'Captcha validated'});
          }
        }}
        onExpire={() => { console.log('expire') }}
      />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  // Switch,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import './App.css';
import Form from './components/form';
import Home from './routes/home';
import Profile from './routes/profile';
import Register from './routes/register';
import UrlForm from './components/url_form';
import Login from './routes/login';


interface Data {
  name: string,
  email: string
}

interface ItemData {
  img_src: string,
  title: string,
  price: string
}

interface RegistrationForm {
  email: string,
  password: string
}

interface LoginForm {
  email: string,
  password: string
}

function App() {
  const [InputData, setInputData] = useState<Data>({
    name: "",
    email: "",
  });
  const [TestData, setTestData] = useState<string | null>("init");
  // for url_form
  const [UrlData, setUrlData] = useState<string>("");
  const [ConfirmationData, setConfirmationData] = useState<ItemData | null>(null)
  //////////////////////
  const [RegData, setRegData] = useState<RegistrationForm>({
    email: "",
    password: "",
  })
  const [LoginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: ""
  })
  // const [UserProfile, setUserProfile] = 

  const getData = async () => {

    // both ways work
    console.log("send /test request to flask")
    const response = await fetch('/test')
    const data = await response.text()
    console.log(data)
    setTestData(data)
    console.log("get /test complete")
    // await fetch('/test')
    //   .then(response => response.text())
    //   .then(data => {
    //     console.log(data)
    //     setTestData(data)
    //   })
  }
  ///
  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...InputData,
      [e.target.name]: e.target.value,
    })
  }
  const postInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("postInputData func ///");
    console.log(InputData);
    console.log(JSON.stringify(InputData))
    fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(InputData)
    })
      .then((response) => {
        console.log(response.statusText)
        console.log(response.status)
        if (response.statusText === "OK" && response.status >= 200 && response.status < 300) {
          return response.text()
        } else {
          throw new Error("Server can't be reached!")
        }
      })
      .then(data => {
        console.log('Success:', data);
        setTestData(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  ///
  const handleUrlData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlData(e.target.value)
  }

  const postUrlData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("postUrlData func ///");
    console.log(UrlData);
    console.log(JSON.stringify(UrlData))
    fetch('/hello', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(UrlData)
    })
      .then((response) => {
        console.log(response.statusText)
        console.log(response.status)
        if (response.statusText === "OK" && response.status >= 200 && response.status < 300) {
          return response.text()
        } else {
          throw new Error("Server can't be reached!")
        }
      })
      .then(data => {
        console.log('Success:', data);
        console.log(JSON.parse(data).img_src)
        setConfirmationData(JSON.parse(data))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  ///////////////////
  const handleRegData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegData({
      ...RegData,
      [e.target.name]: e.target.value,
    })
  }

  const postRegData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(RegData)
    if (confirmRegistrationFormData() === false) {
      alert('Email and/or password not matching!');
      return
    }
    else {
      console.log("Matching regForm")
      fetch('/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(RegData)
      }).then((response) => {
        console.log(response.statusText)
        console.log(response.status)
        if (response.statusText === "OK" && response.status >= 200 && response.status < 300) {
          return response.text()
        } else {
          throw new Error("Server can't be reached!")
        }
      })
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(LoginData)
    setLoginData({
      ...LoginData,
      [e.target.name]: e.target.value,
    })
  }
  const postLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log("Matching regForm")
    console.log(LoginData)
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(LoginData)
    }).then((response) => {
      console.log(response.statusText)
      console.log(response.status)
      if (response.statusText === "OK" && response.status >= 200 && response.status < 300) {
        return response.text()
      } else {
        throw new Error("Server can't be reached!")
      }
    })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const confirmRegistrationFormData = () => {
    const email = document.getElementById("RegEmail") as HTMLInputElement;
    const confirmemail = document.getElementById("RegConfirmEmail") as HTMLInputElement;
    const password = document.getElementById("RegPassword") as HTMLInputElement;
    const confirmpassword = document.getElementById("RegConfirmPassword") as HTMLInputElement;

    console.log(email.value, confirmemail.value, password.value, confirmpassword.value)
    if (email.value !== confirmemail.value || password.value !== confirmpassword.value) {
      return false
    }
    else {
      return true
    }
  }

  const userProfile = () => {
    fetch('/profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, text/plain, */*',
      },
      // body: JSON.stringify(LoginData)
    }).then((response) => {
      console.log(response.statusText)
      console.log(response.status)
      if (response.statusText === "OK" && response.status >= 200 && response.status < 300) {
        return response.text()
      } else {
        throw new Error("Server can't be reached!")
      }
    })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // useEffect(() => {
  //   getData()
  // }, [])
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
              <li>
                <Link to="/Login">Log in</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register RegData={RegData} handleRegData={handleRegData} postRegData={postRegData} />} />
            <Route path="/profile" element={<Profile userProfile={userProfile}/>} />
            <Route path="/login" element={<Login LoginData={LoginData} handleLoginData={handleLoginData} postLoginData={postLoginData}/>} />
          </Routes>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          {/* <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
        </Switch> */}
        </div>
      </BrowserRouter>
      {/* <h1>React front end</h1>
      <h2>{TestData}</h2>
      <h2>Name: {InputData.name}</h2>
      <h2>Email: {InputData.email} </h2>
      <Form InputData={InputData} handleInputData={handleInputData} postInputData={postInputData} getData={getData} />
      <h2>{ConfirmationData?.img_src}</h2>
      <UrlForm UrlData={UrlData} handleUrlData={handleUrlData} postUrlData={postUrlData} ConfirmationData={ConfirmationData} /> */}
    </div>
  );
}

export default App

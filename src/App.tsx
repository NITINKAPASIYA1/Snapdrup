import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupFrom from "./_auth/forms/SignupFrom";
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="flex h-screen">
   
        <Routes>

            {/* {public Routes} */}
            <Route element={<AuthLayout></AuthLayout>}>
              <Route path="/sign-in" element={<SigninForm/>}></Route>
              <Route path="/sign-up" element={<SignupFrom/>}></Route>
            </Route>
            

            {/* {private Routes} */}
            <Route element={<RootLayout></RootLayout>}>
              <Route  index element={<Home/>}></Route>
              <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:id" element={<EditPost />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/profile/:id/*" element={<Profile />} />
              <Route path="/update-profile/:id" element={<UpdateProfile />} />
            </Route>
          
        </Routes>
        <Toaster/>
    </main>
  );
};

export default App;

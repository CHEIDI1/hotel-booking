
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contact from "./Contact";
import Facilities from "./Facilities";
import Home from "./Home";
import Room from "./RoomandRate";
import Testimonial from "./Testimonial";
import Rooms from "./Roomcard";
import MapSection from "./MapSection";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/roomandRate" element={<Room />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/roomcard" element={<Rooms />} />
        <Route path="/mapsection" element={<MapSection />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

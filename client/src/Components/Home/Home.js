import React, { useState } from "react";
import "./Home.css";
import AdminNavbar from "../Admin/AdminNavbar/AdminNavbar";
import { db } from "../../Firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
function Home() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quieries, setQuieiries] = useState("");
  // const [rooms, setRooms] = useState(options[0].value);
  const bookingRef = collection(db, "Booking");
  const submitAppl = (e) => {
    e.preventDefault();
    addDoc(bookingRef, {
      fname: fname,
      lname: lname,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      email: email,
      phone_no: phone,
      quieries: quieries,
    });
  };
  return (
    <div className="MainDisplayContainer">
      <AdminNavbar />
      <div className="register_form_container">
        <div className="req_form">
          <div className="form__header">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhostelmanagement.com%2Fsites%2Fall%2Fthemes%2Fhostel-management%2Fimg%2Fhostel-management-l.png&f=1&nofb=1&ipt=38fbf2ca41ca27ab6e84e2d563b2d542e6a482bae5bb76e6e650a96e40af81cf&ipo=images"
              alt="logo"
            />
            <label>Room Booking Application</label>
          </div>
          <div className="form__body">
            <div className="form_name">
              <label>Name</label>
              <div className="form_inner_name">
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter your first name"
                  onChange={(e) => setFname(e.target.value)}
                  value={fname}
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="Enter you last name"
                  onChange={(e) => setLname(e.target.value)}
                  value={lname}
                />
              </div>
            </div>

            <div className="form_address">
              <label for="address">Address</label>
              <div className="form_inner_address">
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="Enter your state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter your pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  value={pincode}
                />
              </div>
            </div>
            <div className="form_contacts">
              <div className="form_inner_contact">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form_inner_contact">
              <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>
            <div className="form_inner_contact">
              <label for="type">Room Type</label>
              <select name="type" id="type" value={fname}>
                <option value="double">2 bed sharing</option>
                <option value="triple">3 bed sharing</option>
                <option value="triple">4 bed sharing</option>
                <option value="triple">6 bed sharing</option>
              </select>
            </div>
            <div className="submit" onClick={submitAppl}>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

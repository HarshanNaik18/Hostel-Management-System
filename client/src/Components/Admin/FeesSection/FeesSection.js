import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./FeesSection.css";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import { toast } from "react-toastify";
function FeesSection() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const [paymentData, setPaymentData] = useState([]);

  const handleFeesUpdate = async () => {
    setButtonDisable(true);
    paymentData.forEach(async (element) => {
      await updateDoc(doc(db, "Payments", element.id), {
        flag: true,
      }).catch(()=>{
        toast.error("error");
        setButtonDisable(false);
      })
    });
    toast.success("Payment status updated");
    setButtonDisable(false);
  };

  const handleDismis = async()=>{
    setButtonDisable(true);
    paymentData.forEach(async (element) => {
      await updateDoc(doc(db, "Payments", element.id), {
        flag: false,
      }).catch(()=>{
        toast.error("error");
        setButtonDisable(false);
      })
    });
    toast.success("Payment dismissed");
    setButtonDisable(false);
  }

  const handleRemainder = async (item) => {
    const config = {
      Host: "smtp.elasticemail.com",
      Username: "iplinnovative685@gmail.com",
      Password: "D55DADE0B03DFB8ADD0AAC4A10504070590F",
      Port: 2525,
      To: `${item.email}`,
      From: "iplinnovative685@gmail.com",
      Subject: "Reminder: Hostel Fee Payment Deadline",
      Body: `Dear ${item.name},\n\n
      
      I hope this email finds you in good health and high spirits. We appreciate your presence as residents of our college hostel and hope you are enjoying a fulfilling academic experience.\n\n
      
      As we approach the midpoint of the semester, we would like to remind you about the upcoming deadline for the payment of your hostel fees. The timely payment of fees is essential to ensure the smooth functioning of the hostel facilities and services that we provide to you. These fees contribute towards maintenance, utilities, security, and various amenities that make your stay comfortable and conducive to your studies.\n\n
      
      The deadline for the payment of the hostel fees for this semester is [Payment Deadline Date]. We kindly request all residents to submit their fees before this date to avoid any inconvenience or late payment charges. Your prompt cooperation will help us streamline our operations and continue providing you with a secure and nurturing environment.\n\n
      
      Here's how you can make your payment:\n\n
      
      1. **Online Payment:** You can log in to your student portal at http://localhost:3000/ and navigate to the hostel fee payment section. Follow the instructions to complete the payment using your preferred mode, whether it's credit/debit card or online banking.\n\n
      
      In case you are facing any challenges related to the payment process or require any clarification regarding the fee structure, please do not hesitate to contact the college accounts department at. They will be more than willing to assist you with your queries.\n\n
      
      We understand the financial commitments that come with your education, and we are here to support you in any way possible. If you are facing genuine difficulties in making the payment on time, we encourage you to reach out to us at [Your Contact Information] so that we can discuss possible solutions and offer assistance.\n\n
      
      Thank you for your attention to this matter. Your cooperation is vital in ensuring the continued success of our hostel community. We wish you all the best in your academic pursuits and look forward to your continued presence in our hostel.\n\n
      
      Warm regards,\n\n
      
      Team Hostel Management`,
    };
    setButtonDisable(true);
    toast.success("sending");
    if (window.Email) {
      await window.Email.send(config)
        .then(() => toast.success("Remainder sent to " + item.name))
        .catch(() => {
          setButtonDisable(false);
          toast.error("Remainder not sent to " + item.name);
        });
    }
    setButtonDisable(false);
  };

  useEffect(() => {
    const q = collection(db, "Payments");
    const getTenantsData = onSnapshot(q, async (snpashot) => {
      const data = [];
      snpashot.forEach((element) => {
        data.push({ ...element.data(), id: element.id });
      });
      setPaymentData(data);
    });
    return () => {
      getTenantsData();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const unSubscribe = () => {
      setDisplayWidth(window.innerWidth);
    };
    return () => {
      unSubscribe();
    };
    //eslint-disable-next-line
  }, [displayWidth]);
  return (
    <div className="Admin_panel">
      <AdminNavbar />
      <div className="admin_panel_container">
        <Sidebar open={button} onClose={() => setButton(!button)} />
        <div
          className="admin_panel_component_holder"
          style={{
            width: `${!button ? "calc(100% - 230px)" : "calc(100% - 3.5rem)"}`,
          }}
        >
          <div className="Admin_panel_header">
            <label>Fees Management</label>
          </div>
          <div className="Fees_Field_wrapper">
            <div className="Fees_field_header">
              <button
                style={{ background: "rgb(0, 82, 204)", color: "white" }}
                disabled={buttonDisable}
                onClick={handleFeesUpdate}
              >
                Update Fees
              </button>
              <button
                style={{ background: "rgb(204, 51, 0)", color: "white" }}
                disabled={buttonDisable}
                onClick={handleDismis}
              >
                Dismiss
              </button>
            </div>
            <div className="Fees_section_Wrapper">
              <table>
                <thead>
                  <tr>
                    <td>Sl No</td>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>Total</td>
                    <td>Paid</td>
                    <td>Due</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {paymentData &&
                    paymentData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.fees}</td>
                        <td>{item.fees - item.due}</td>
                        <td>{item.due}</td>
                        <td id="Reminder">
                          <button
                            disabled={!item.flag || buttonDisable}
                            style={{
                              background: "gold",
                              padding: "5px 10px",
                              border: "none",
                              borderRadius: "5px",
                            }}
                            onClick={() => handleRemainder(item)}
                          >
                            Reminder
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesSection;

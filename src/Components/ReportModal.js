import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { urlProvider } from "../contexts/UrlContext";
import { authProvider } from "../contexts/UserContext";

const ReportModal = ({ reportedProduct, setReportedProduct }) => {
    const { baseUrl } = useContext(urlProvider)
    const {user} = useContext(authProvider)
  const handleReport = (e) => {
    e.preventDefault()
    const form = e.target;
    const product = reportedProduct;
    product.productID = product._id;
    product.reportText = form.reportText.value
    product.userEmail = user.email
    delete product["_id"];
    console.log(product);
    axios.post(`${baseUrl}/reportedProducts`, product)
    .then(res =>{
        if(res.data.acknowledged){
            setReportedProduct(null)
            toast.success('Report submit successfully')
        }else{
          setReportedProduct(null)
          toast.error(res.data.message)
        }
    })
  };
  return (
    <>
      <input type="checkbox" id="report-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-xl mb-4">let us know about your problem </h3>
          <form onSubmit={handleReport}>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Type here"
              name="reportText"
              required
            ></textarea>

            <div className="modal-action">
              <button
                type="submit"
                className="btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportModal;

import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authProvider } from "../contexts/UserContext";

const BookingModal = ({itemBook, setItemBook}) => {
    const {user} = useContext(authProvider)
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        
        const itemName = form.itemName.value;
        const name = form.name.value;
        const email = form.email.value;
        const price = form.price.value;
        const number = form.number.value;
        const location = form.location.value;
        const bookInfo = {itemName, name, email, price, number, location}
        console.log(bookInfo);
        setItemBook(null)
        toast.success('Booked successful')
    };
  return (
    <>
      <input type="checkbox" id="Booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Item name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={itemBook.name}
              disabled
              name="itemName"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">User name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={user.displayName || 'no name'}
              disabled
              name="name"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">User email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              defaultValue={user.email}
              disabled
              name="email"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={itemBook.resalePrice}
              disabled
              name="price"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Number</span>
            </label>
            <input
              type="text"
              placeholder="Number"
              className="input input-bordered w-full"
              required
              name="number"
            />
          </div>
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="Location"
              className="input input-bordered w-full"
              required
              name="location"
            />
          </div>
          <button type="submit" className="btn">
            Book
          </button>
        </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;

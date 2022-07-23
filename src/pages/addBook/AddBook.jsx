import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../Firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

import NavigationBar from "../navigationBar/NavigationBar";
import "./AddBook.scss";

export default function AddBook(props) {
  const [userLogged, isUserLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.logState) {
      navigate("/");
    } else {
      isUserLogged(true);
    }
  }, []);

  // get category
  const [category, setCategory] = useState([]);

  const categoryCollectionRef = collection(db, "categories");

  useEffect(() => {
    const getCatagories = async () => {
      const data = await getDocs(categoryCollectionRef);
      setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCatagories();
  }, []);

  // get all book
  const [book, setBook] = useState([]);

  const bookCollectionRef = collection(db, "books");

  useEffect(() => {
    const getBook = async () => {
      const data = await getDocs(bookCollectionRef);
      setBook(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBook();
  }, []);

  // ADD BOOK
  const bookRef = collection(db, "books");

  const [bookID, setBookID] = useState("");
  const [bookName, setBookName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("sample date");

  const createBook = async () => {
    await addDoc(bookRef, {
      add_date: date,
      auther: author,
      book_id: bookID,
      book_name: bookName,
      category: categoryName,
      is_avalible: true,
      is_deleted: false,
      out_name: "",
    });
    window.alert("Book added successfully..!");
  };

  // Check Book Availability in db
  const [availability, setAvailability] = useState(false);
  useEffect(() => {
    setAvailability(false);
    book.map((item) => {
      if (
        item.book_id.toLowerCase().trim().replace(" ", "") ===
        bookID.toLowerCase().trim().replace(" ", "")
      ) {
        setAvailability(true);
      }
    });
  }, [bookID]);

  const pressSubmit = (e) => {
    e.preventDefault();

    if (availability === false) {
      createBook();
    }
  };

  return (
    <>
      {userLogged ? (
        <>
          <div>
            <NavigationBar name="ADD BOOK" />
            <div className="main2">
              <form onSubmit={pressSubmit}>
                <label>Book ID</label>
                <br />
                <input
                  style={{ marginBottom: 3 }}
                  type="text"
                  placeholder="Enter Book ID"
                  required
                  onChange={(event) => {
                    setBookID(event.target.value);
                  }}
                />
                <br />
                {availability ? <code>Book ID already exist</code> : ""}
                <br />

                <label>Book Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Book Name"
                  required
                  onChange={(event) => {
                    setBookName(event.target.value);
                  }}
                />
                <br />

                <label>Category</label>
                <br />
                <select
                  required
                  onChange={(event) => {
                    setCategoryName(event.target.value);
                  }}
                >
                  <option value="">Not Selected</option>
                  {category.map((item) => {
                    return (
                      <option value={item.name} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <br />
                {categoryName === "" ? <code>Pleas Enter Category</code> : null}
                <br />

                <label className="author">Author</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Author"
                  required
                  onChange={(event) => {
                    setAuthor(event.target.value);
                  }}
                />
                <br />

                <input type="submit" />
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

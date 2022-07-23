import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { db } from "../../Firebase-config";
import { collection, getDocs } from "firebase/firestore";

import NavigationBar from "../navigationBar/NavigationBar";
import "./Book.scss";
import BookCard from "./BookCard";

export default function Book(props) {
  const location = useLocation();
  const conditionInLink = location.state.condition;

  const [userLogged, isUserLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.logState) {
      navigate("/");
    } else {
      isUserLogged(true);
    }
  }, []);

  //   Search function implement
  const [search, setSearch] = useState("");

  // get Books
  const [trigger, isTrigger] = useState(false);
  const [book, setBook] = useState([]);

  const categoryCollectionRef = collection(db, "books");

  useEffect(() => {
    const getBook = async () => {
      const data = await getDocs(categoryCollectionRef).catch((error) => {
        window.alert(error.code);
      });
      setBook(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBook();
  }, [trigger]);

  return (
    <>
      {userLogged ? (
        <>
          <NavigationBar
            name={conditionInLink === "all" ? "All Book" : conditionInLink}
          />{" "}
          <div className="main4">
            <div className="searchBar">
              <input
                type="text"
                placeholder="Enter Key Words"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="body">
              {book.map((item) => {
                if (
                  item.category.toLowerCase() ===
                    conditionInLink.toLowerCase() || conditionInLink === "all"
                    ? true
                    : false || conditionInLink === "out"
                    ? item.is_avalible === false
                    : false
                ) {
                  if (
                    item.book_name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    item.auther.toLowerCase().includes(search.toLowerCase()) ||
                    item.book_id.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return (
                      <>
                        <div key={item.id}>
                          <BookCard
                            uniqueId={item.id}
                            bookName={item.book_name}
                            bookId={item.book_id}
                            authnr={item.auther}
                            available={item.is_avalible}
                            outName={item.out_name}
                            category={item.category}
                            trigger={isTrigger}
                            triggerSupport={trigger}
                          />
                        </div>
                      </>
                    );
                  }
                }
              })}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

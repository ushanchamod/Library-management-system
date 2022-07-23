import { useEffect, useState } from "react";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";

import { Link } from "react-router-dom";

import { db } from "../../Firebase-config";
import "./Home.scss";

export default function CatogoryCard(props) {
  // get Books
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
  }, []);

  // Delete Category
  const pressDelete = async (categoryName, id) => {
    let availability = false;
    book.map((item) => {
      if (item.category.toLowerCase() === categoryName.toLowerCase()) {
        availability = true;
      }
    });

    if (!availability) {
      await deleteDoc(doc(db, "categories", id));
      props.setTrigger(!props.trigger);
    } else {
      window.alert(categoryName + " category not empty..");
    }
  };

  return (
    <>
      <div className="catogoryCard">
        <Link to="/book" state={{ condition: props.name }}>
          <h1>{props.name}</h1>
        </Link>
        <i
          onClick={() => {
            pressDelete(props.name, props.id);
          }}
          className="fa-solid fa-folder-minus"
        ></i>
      </div>
    </>
  );
}

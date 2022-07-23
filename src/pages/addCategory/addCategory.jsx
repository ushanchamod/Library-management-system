import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import NavigationBar from "../navigationBar/NavigationBar";
import "./addCategory.scss";

export default function AddCategory(props) {
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

  // add category
  const [error, setError] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const categoryRef = collection(db, "categories");

  const createCategory = async () => {
    await addDoc(categoryRef, { name: newCategory, isDeleted: false }).catch(
      (error) => {
        window.alert(error.code);
      }
    );
    window.alert("Successfully Added...!");
  };

  useEffect(() => {
    setError(false);
    category.map((item) => {
      if (
        item.name.toLowerCase().trim().replace(" ", "") ===
        newCategory.toLowerCase().trim().replace(" ", "")
      ) {
        setError(true);
      }
    });
  }, [newCategory]);

  const submitted = (e) => {
    e.preventDefault();

    if (!error) {
      createCategory();
    } else {
      window.alert("Category already exist");
    }
  };

  return (
    <>
      {userLogged ? (
        <>
          <div>
            <NavigationBar name="ADD CATEGORY" />
            <div className="main3">
              <form onSubmit={submitted}>
                <label>Category Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  required
                  onChange={(event) => {
                    setNewCategory(event.target.value);
                  }}
                />
                <br />

                {error ? <code>Category already exist</code> : null}

                <br />
                <button type="submit">ADD CATEGORY</button>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

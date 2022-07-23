import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { db } from "../../Firebase-config";
import { collection, getDocs } from "firebase/firestore";

import NavigationBar from "../navigationBar/NavigationBar";
import "./Home.scss";
import CategoryCard from "./CatogoryCard";

export default function Home(props) {
  const [userLogged, isUserLogged] = useState(false);
  const [trigger, setTagger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.logState) {
      navigate("/");
    } else {
      isUserLogged(true);
    }
  }, []);

  // get book catagories
  const [category, setCategory] = useState([]);

  const categoryCollectionRef = collection(db, "categories");

  useEffect(() => {
    const getCatagories = async () => {
      const data = await getDocs(categoryCollectionRef);
      setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCatagories();
  }, [trigger]);

  return (
    <>
      {userLogged ? (
        <>
          <NavigationBar name="CATEGORY" />
          <div className="main">
            <div className="home">
              <div className="allBook">
                <Link to="/book" state={{ condition: "all" }}>
                  <h2>All Books</h2>
                </Link>
              </div>

              <div className="catogoryContainer">
                {category.map((item) => {
                  if (item.isDeleted === false) {
                    return (
                      <>
                        <div key={item.name}>
                          <CategoryCard
                            name={item.name}
                            id={item.id}
                            setTrigger={setTagger}
                            trigger={trigger}
                          />
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

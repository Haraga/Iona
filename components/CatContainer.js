import { useEffect, useState } from "react";
import { CatGrid } from "./CatGrid";
import { CatSelector } from "./CatSelector";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import axios from 'axios';

export const CatContainer = () => {

    const router = useRouter();
    const [currentBreed, setCurrentBreed] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [breedCats, setBreedCats] = useState([]);
    const [showedCats, setShowedCats] = useState([]);
    const [showLoadMore, setShowLoadMore] = useState(true);

    useEffect(() => {
        if (router.query.breed) {
          handleSelect(router.query.breed);
        }
    }, []);

    const handleSelect = (id) => {
        setBreedCats([]);
        setShowedCats([]);
        getMoreCats(id);
    };

    const getMoreCats = (id) => {
        axios
        .get(`https://api.thecatapi.com/v1/images/search?page=${currentPage}&limit=10&breed_id=${id}`)
        .then((data) => {
            const catsToShow = [];
            data.data.forEach((cat) => {
                if(!showedCats.includes(cat.id)) {
                    showedCats.push(cat.id);
                    catsToShow.push(cat);
                }
            });

            if (catsToShow.length === 0) setShowLoadMore(false);

            setCurrentBreed(id);
            if (breedCats.length > 0) {
                setBreedCats(breedCats => [...breedCats, ...catsToShow]);
            }
            else {
                setBreedCats(catsToShow);
            }
            setCurrentPage(currentPage + 1);


        })
        .catch((error) => alert(error));
    }

    return (
        <>
            <CatSelector handleSelect={handleSelect} id={router.query.breed}/>
            <CatGrid cats={breedCats}/>
            { showLoadMore
                ? (<Button variant="success" onClick={() => {getMoreCats(currentBreed)}}>Load More</Button>)
                : null
            }
        </>
    );
}
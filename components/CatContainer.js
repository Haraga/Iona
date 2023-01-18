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
        resetSettings();
        getMoreCats(id);
    };

    const resetSettings = () => {
        setShowLoadMore(true);
        setBreedCats([]);
        setShowedCats([]);
    }

    const getMoreCats = (id) => {
        if (id === 'reset') return;
        axios
        .get(`https://api.thecatapi.com/v1/images/search?page=${currentPage}&limit=10&breed_id=${id}`)
        .then((data) => {
            const catsToShow = [];
            data.data.forEach((cat) => {
                if(!showedCats.includes(cat.id)) {
                    setShowedCats(showedCats => [...showedCats, cat.id]);
                    catsToShow.push(cat);
                }
            });

            if (catsToShow.length === 0) {
                setShowLoadMore(false)
                return;
            };
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
            {
                breedCats.length > 0
                ? <CatGrid cats={breedCats}/>
                : <p className="mb-3">No cats available</p>
            }
            { showLoadMore
                ? (<Button variant="success" disabled={breedCats.length === 0} onClick={() => {getMoreCats(currentBreed)}}>Load More</Button>)
                : null
            }
        </>
    );
}
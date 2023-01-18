import Image from "next/image";
import { IndividualCat } from 'components/IndividualCat';
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const CatPage = ({ catData }) => {

    const router = useRouter();

    return (
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IndividualCat data={catData} />
          </div>
        </div>
    );
}

export default CatPage;

export async function getServerSideProps(context) {
    const id = context.params.id;

    const response = await fetch("https://api.thecatapi.com/v1/images/" + id);
    const data = await response.json();
    return {
        props: {
        catData: data,
        },
    };
}
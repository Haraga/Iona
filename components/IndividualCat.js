import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

export const IndividualCat = ({ data }) => {

  const router = useRouter();

    const cardContent = () => {
        if (!data.breeds) {
            return cardGrid();
        } else {
            return cardProfile();
        }
    };

    const cardGrid = () => {
        return (
                <Card className="mb-3">
                    <Card.Img variant='top' src={data.url}/>
                    <Card.Body className="d-flex justify-content-center">
                        <Button className="w-100" variant='primary' onClick={() => router.push(data.id)}>View details</Button>
                    </Card.Body>
                </Card>
        );
    }

    const cardProfile = () => {
        return (
            <Card className="my-3">
                <Card.Header>
                    <Button variant='primary'  onClick={() => router.push("/?breed=" + data.breeds[0].id)}>Back</Button>
                </Card.Header>
                <Card.Img src={data.url}/>
                <Card.Body>
                    <h4>{data.breeds[0].name}</h4>
                    <h5>{data.breeds[0].origin}</h5>
                    <h6>{data.breeds[0].temperament}</h6>
                    <p>{data.breeds[0].description}</p>
                </Card.Body>
            </Card>
        );
    }

  return (
    cardContent()
  );
};

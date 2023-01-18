import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect, useState } from "react";

export const CatSelector = ({ handleSelect, id }) => {

    const [cats, setCats] = useState();
    const [catId, setCatId] = useState();

    useEffect(() => {
        setCatId(id);
        axios
        .get('https://api.thecatapi.com/v1/breeds')
        .then((data) => {
            setCats(data.data);
        });
    }, []);

    return (
        <>
            <div className='mb-3'>
                <label htmlFor='breed'>Breed</label>
                <Form.Select id='breed' style={{maxWidth: '25%'}} value={catId} onChange={(event) => {handleSelect(event.target.value);setCatId(event.target.value)}} aria-label="Default select example">
                    <option value='reset'>Select Breed</option>
                    {cats?.map((cat) => {
                        return (
                            <option key={cat.name} value={cat.id}>{cat.name}</option>
                        );
                    })}
                </Form.Select>
            </div>
        </>
    );
}
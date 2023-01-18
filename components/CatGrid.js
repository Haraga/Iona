import { IndividualCat } from './IndividualCat';

export const CatGrid = ({ cats }) => {

    return (
        <>
            <div className='row my-4'>
                {
                    cats?.map((cat) => {
                        return (
                            <>
                                <div className="col-md-3 col-sm-6 col-12">
                                    <IndividualCat
                                        key={cat.id}
                                        data={cat}
                                    />
                                </div>
                            </>
                        );
                    })
                }
            </div>
        </>
    );
}
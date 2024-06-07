// import Header from '../components/ui/Header';
import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import Container from '../components/ui/Container';
import Header from '../components/ui/Header';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const categories = [
    "Home Cleaning",
    "Regular Cleaning",
    "Deep Cleaning",
    "Seasonal Cleaning",
    "Detailed Cleaning",
    "Specialized Cleaning",
    "Eco-Friendly Cleaning",
    "Premium Cleaning",
    "Quick Cleaning"
]

const Services = () => {
    const axios = useAxios();
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const getServices = async () => {
        const res = await axios.get(`/services?sortField=price&sortOrder=${price}&category=${category}`);
        return res;
    }
    console.log(price, category);
    const { data: services, isLoading, isError, error } = useQuery({
        queryKey: ['service', price, category],//price is dependency array and need to be provided to tanstack recall the api again
        queryFn: getServices,
    })
    // console.log(services?.data.result)
    // const categories = services?.data?.result
    // if (isLoading) {
    //     return <span className="loading loading-spinner text-info"></span>
    // }
    if (isError) {
        return <p>Something went wrong: {error}</p>
    }

    return (
        <>
            <Container className="mt-10">
                <Header title="Services">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                    nobis excepturi delectus, ab id provident, voluptas iste ullam
                    repellendus animi eos perspiciatis cumque. Quod sit laboriosam
                    deleniti atque explicabo esse.
                </Header>
            </Container>
            <Container>
                <div className='my-12 flex justify-end items-center border-2 border-info rounded-2xl p-5 gap-5'>
                    <h1 className='flex-1 text-xl font-semibold text-blue-400'>Over 12 services to choose from</h1>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Category</span>
                        </label>
                        <select
                            className='input input-bordered'
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option disabled selected>Choose one</option>
                            {
                                isLoading ? (
                                    <span className="loading loading-spinner text-info"></span>
                                ) : (
                                    categories.map((item) => (
                                        <option key={item._id} value={item}>
                                            {item}
                                        </option>
                                    ))
                                )
                            }


                        </select>
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Price</span>
                        </label>
                        <select
                            className='input input-bordered'
                            onChange={(e) => setPrice(e.target.value)}
                        >
                            <option disabled selected>Choose one</option>
                            <option value="asc">From low to high</option>
                            <option value="desc">From high to low</option>
                        </select>
                    </div>
                </div>
            </Container>
            <Container className="mb-64">
                <div className="grid grid-cols-3 gap-10">
                    {/* Service Cards goes here */}
                    {
                        services?.data?.result?.map((service) => (
                            <ServiceCard key={service._id} service={service}></ServiceCard>
                        ))
                    }
                </div>
            </Container>
            <Container className="mb-64 flex justify-end">
                <div className='join border-2 border-info'>
                    <button className='join-item btn btn-ghost'>⬅️</button>
                    <button className='join-item btn btn-ghost'>1</button>
                    <button className='join-item btn btn-ghost'>2</button>
                    <button className='join-item btn btn-ghost'>3</button>
                    <button className='join-item btn btn-ghost'>4</button>
                    <button className='join-item btn btn-ghost'>➡️</button>
                </div>
            </Container>
        </>
    );
};

export default Services;
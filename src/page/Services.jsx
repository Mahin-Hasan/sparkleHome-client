// import Header from '../components/ui/Header';
import ServiceCard from '../components/ServiceCard';
import Container from '../components/ui/Container';
import Header from '../components/ui/Header';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const Services = () => {

    const axios = useAxios();

    const getServices = async () => {
        const res = await axios.get('/services');
        return res;
    }

    const { data:services, isLoading, isError } = useQuery({
        queryKey: ['service'],
        queryFn: getServices,
    })


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
            <Container className="mb-64">
                <div className="grid grid-cols-3 gap-10">
                    {/* Service Cards goes here */}
                   {
                    services?.data?.map((service)=>(
                        <ServiceCard key={service._id} service={service}></ServiceCard>
                    ))
                   }
                </div>
            </Container>
        </>
    );
};

export default Services;
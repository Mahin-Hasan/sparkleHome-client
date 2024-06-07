import Container from '../components/ui/Container';
import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '../config/firebase.config';
import useAxios from '../hooks/useAxios';
import toast from 'react-hot-toast';

const TrackOrder = () => {
    const axios = useAxios();
    const queryClient = useQueryClient()

    const { data: bookings, refetch } = useQuery({
        queryKey: ['booking'],
        queryFn: async () => {
            const email = auth?.currentUser.email;
            console.log(email);

            const res = await axios.get(`/user/bookings?email=${email}`);
            return res;
        }
    })
    console.log(bookings);


    //delete operation using mutation
    const { mutate } = useMutation({
        mutationKey: ['booking'],
        mutationFn: (id) => {
            return axios.delete(`user/cancel-booking/${id}`)
        },
        onSuccess: () => {
            // Refetch bookings data after a successful mutation
            // refetch();
            //another method
            toast.success('canceled')
            queryClient.invalidateQueries({ queryKey: ['booking'] });
        }
    })

    return (
        <Container>
            {bookings?.data?.map((item) => (
                <div key={item._id}>
                    <h1>Name {item?.service}</h1>
                    <button onClick={() => mutate(item._id)} className='btn btn-info'>Cancel</button>
                </div>
            ))}
        </Container>
    );
};

export default TrackOrder;
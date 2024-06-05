import Container from "../components/ui/Container";

const Home = () => {
    return (
        <Container>
            <div className="flex flex-col md:flex-row items-center my-32 gap-5">
                <div className="flex-[1] space-y-5">
                    <h1 className="text-3xl sm:text-7xl font-bold">Quality cleaning <br /> <span className="text-indigo-500">for your home</span></h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam eaque magnam cumque impedit illo expedita ipsum sit eum nemo fugiat!</p>
                    <div>
                        <button className="btn btn-secondary mr-3">Book a service</button>
                        <button className="btn bg-purple-500 font-bold text-white">Read more</button>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </div>
                            </div>
                        </div>
                        <p>Rated 5 Stars by our clients</p>
                    </div>
                </div>
                <div className="flex-[1] h-[600px] rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://img.freepik.com/free-photo/medium-shot-people-cleaning-building_23-2150454517.jpg?t=st=1717570452~exp=1717574052~hmac=8155c673a40faef7706dd4f6079bd304e8f22fff0838e6fe1159f2d0250ea087&w=1380" alt="" />
                </div>
            </div>
        </Container>
    );
};

export default Home;
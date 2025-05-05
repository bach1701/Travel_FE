const Map = () => {
    return (
        <div className="w-full h-[500px] mb-12 px-12 rounded-lg overflow-hidden">
            <iframe className='rounded-3xl p-4'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1916.9212522178414!2d108.14748719839477!3d16.0736606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d68dff9545%3A0x714561e9f3a7292c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9hIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1746370758543!5m2!1svi!2s"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default Map;
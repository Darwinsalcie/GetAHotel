export function HotelCard({hotel}){
    return(

        <article>
        <h2>{hotel.name}</h2>

        <address>
            <p>
                {hotel.street}, {hotel.houseNumber}
                {hotel.city}
            </p>
        </address>

        <p>
            Tel: <a href={`tel:${hotel.phoneNumber}`}>{hotel.phoneNumber}</a>
        
        Web: <a href={hotel.website} target="_blank" 
        rel="noopener noreferrer">{hotel.website}</a>
        
        </p>
        </article>


    )
}
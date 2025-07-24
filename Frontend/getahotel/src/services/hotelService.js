import axios from "axios";
const Base_URL = 'https://localhost:7023/api/Hotel';

export async function fetchHotelsAround({radius, lat, lon}) {

    const response = await axios.get(
        `${Base_URL}/GetHotelsAround`,
        {params: {radius, lat, lon}}
    );

    return response.data
}
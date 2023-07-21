import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useMenu = () => {
    // 1st way to fetch data using hooks and stats
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data)
    //             setLoading(false)
    //         });
    // }, [])
    // return [menu, loading]

    // 2nd way to fetch data using react query
    const { data: menu = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/menu');
            return res.json();
        }
    })
    return [menu, loading, refetch]
}
export default useMenu;

//  {
//     const popularItems = data.filter(item => item.category === 'popular');
//     setMenu(popularItems)
// }
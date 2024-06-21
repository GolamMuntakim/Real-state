import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "./hooks/useAxiosCommon";
import LoadingSpinner from "./LoadingSpinner";
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";

const AllProperties = () => {
    const [search, setSearch] = useState('')
    const [queryKey, setQueryKey] = useState(['all-properties', {search :'', sort:''}])
    const [sort, setSort] = useState('')

    const { data: propertys = [], isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async ({queryKey}) => {
            const {search, sort} = queryKey[1]
            const { data } = await axiosCommon.get(`/all-properties?search=${search}&sort=${sort}`)
            return data.filter(property => property.status === 'verified')
        },
        enabled: true
    })
    const handleSearch = e => {
        e.preventDefault()
        const text = e.target.search.value
        setSearch(text)
        setQueryKey(['all-properties', {search: text, sort}])
    }
    useEffect(() => {
        if (queryKey[1] !== '') {
            refetch()
        }
    }, [queryKey, refetch])
    const handleSort = e =>{
        const value = e.target.value;
        setSort(value)
        setQueryKey(['all-properties', {search,  sort: value}])
    }
    console.log(search)
    if (isLoading) return <LoadingSpinner />
    return (
        <div>
            <div className="mt-8 flex flex-col lg:flex-row justify-around">
                <div>
                    <form onSubmit={handleSearch}>
                        <div className='flex gap-2'>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" name="search" className="grow" placeholder="Search" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>

                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-900 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    {/* sort */}
                        <select 
                        onChange={handleSort} 
                        value={sort}
                        name='sort' className="p-4 shadow menu dropdown-content z-[1] border-none bg-blue-900 text-white rounded-box w-52">
                            <option value=''>Sort By Price Range</option>
                            <option value='asc'>Ascending Order</option>
                            <option value='dsc'>Descending Order</option>
                        </select>
                   
                </div>
            </div>
            <div className='pt-12 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-8 '>
                {propertys.map(property => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
            {/* </Container> */}
        </div>
    );
};

export default AllProperties;
import './list.css'
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';


function List() {

    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options)
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, error, reFetch } = useFetch(
        `/hotels?city=${destination}&min=${min || 0}&max=${max || 99999}`
    )

    const handleClick = () => {
        reFetch();
    };

    console.log(destination)
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input placeholder={destination} onChange={(e) =>setDestination(e.target.value.toLowerCase())} type="text" required/>
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`
                                ${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}
                            `}</span>
                            {
                                openDate && (
                                    <DateRange
                                        onChange={(item) => setDates([item.selection])}
                                        minDate={new Date()}
                                        ranges={dates}
                                    />
                                )
                            }
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="listOptionItem">
                                    <span className="lsOptionText">Min price <small>(per nigth)</small></span>
                                    <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="listOptionItem">
                                    <span className="lsOptionText">Max price <small>(per nigth)</small></span>
                                    <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="listOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input min={1} type="number" className="lsOptionInput" placeholder={options.adult} />
                                </div>
                                <div className="listOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input min={0} type="number" className="lsOptionInput" placeholder={options.children} />
                                </div>
                                <div className="listOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input min={1} type="number" className="lsOptionInput" placeholder={options.rooms} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? (
                            'loading'
                        ) : (
                            <>
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
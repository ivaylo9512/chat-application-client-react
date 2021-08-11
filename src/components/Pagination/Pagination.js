import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Pagination = ({selector, setData, getData, data}) => {
    const {data: { maxPages, isLoading }, query } = useSelector(selector);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(5);
    const dispatch = useDispatch();

    const changePage = (nextPage) => {
        if(isLoading){
            return;
        }

        const currentData = data[nextPage - 1];
        if(currentData){
            dispatch(setData(currentData));
            return setPage(nextPage);
        }

        const pages = nextPage - page; 
        dispatch(getData({...query, pages}))
        setPage(nextPage)
    }

    return(
        <div>
            {page > 1 &&
                <button onClick={() => changePage(page - 1)}>prev</button>
            }
            <ul>
                {
                    Array.from({length: page / pages < 1 ? pages : pages + 1 }).map((el, i) => {
                        const slide = Math.floor(page / pages);
                        const pageInex = slide * pages + i + 1;

                        if(pageInex <= maxPages){
                            return <li key={pageInex} onClick={() => changePage(pageInex)}>{pageInex}</li>}
                        }
                    )
                }
            </ul>
            {page < maxPages &&
                <button onClick={() => changePage(page + 1)}>next</button>
            }
        </div>
    )
}
export default Pagination
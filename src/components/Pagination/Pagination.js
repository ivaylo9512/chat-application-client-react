import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Container, Ul, Li } from './PaginationStyle';

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

    useEffect(() => {
        setPage(1);
    }, [query.name])

    return(
        <Container>
            {page > 1 &&
                <button onClick={() => changePage(page - 1)}>prev</button>
            }
            <Ul>
                {
                    Array.from({length: page / pages < 1 ? pages : pages + 1 }).map((el, i) => {
                        const slide = Math.floor(page / pages);
                        let pageIndex = slide * pages + i;
                        pageIndex += slide == 0 ? 1 : 0;

                        if(pageIndex <= maxPages){
                            return <Li isSelected={pageIndex == page} key={pageIndex} onClick={() => changePage(pageIndex)}>{pageIndex}</Li>}
                        }
                    )
                }
            </Ul>
            {page < maxPages &&
                <button onClick={() => changePage(page + 1)}>next</button>
            }
        </Container>
    )
}
export default Pagination
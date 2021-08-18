import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Container, Ul, Li } from './PaginationStyle';

const Pagination = ({selector, setData, getData, data, pagesPerSlide = 4}) => {
    const {data: { maxPages, isLoading }, query } = useSelector(selector);

    const [page, setPage] = useState(1);
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
        <>
        {maxPages > 0 &&
            <Container>
                {page > 1 &&
                    <button onClick={() => changePage(page - 1)}>prev</button>
                }
                <Ul>
                    {
                        Array.from({length: page / pagesPerSlide < 1 ? pagesPerSlide : pagesPerSlide + 1 }).map((el, i) => {
                            const slide = Math.floor(page / pagesPerSlide);
                            let pageIndex = slide * pagesPerSlide + i;
                            pageIndex += slide == 0 ? 1 : 0;

                            if(pageIndex <= maxPages){
                                return <Li data-testid={`${pageIndex}`} isSelected={pageIndex == page} key={pageIndex} onClick={() => changePage(pageIndex)}>{pageIndex}</Li>}
                            }
                        )
                    }
                </Ul>
                {page < maxPages &&
                    <button onClick={() => changePage(page + 1)}>next</button>
                }
            </Container>
            }
        </>
    )
}
export default Pagination
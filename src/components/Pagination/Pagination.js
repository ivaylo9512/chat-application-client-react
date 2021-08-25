import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Container, Ul, Li } from './PaginationStyle';

const Pagination = ({selector, setData, getData, pagesPerSlide = 4}) => {
    const {dataInfo: { data, maxPages, pages, isLoading }, query } = useSelector(selector);

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const changePage = (nextPage) => {
        if(isLoading){
            return;
        }

        const currentData = data[nextPage - 1];
        if(currentData){
            dispatch(setData({data: currentData, page: nextPage }));
            return setPage(nextPage);
        }

        const pagesCount = nextPage - pages; 
        dispatch(getData({...query, pages: pagesCount}))
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
                    <button data-testid='back' onClick={() => changePage(page - 1)}>prev</button>
                }
                <Ul>
                    {
                        Array.from({ length: page / pagesPerSlide < 1 ? pagesPerSlide : pagesPerSlide + 1 }).map((el, i) => {
                            const slide = Math.floor(page / pagesPerSlide);
                            const start = slide * pagesPerSlide + (slide == 0 ? 1 : 0);
                            const pageIndex = start + i;

                            if(pageIndex <= maxPages){
                                return <Li data-testid={`${pageIndex}`} pagesOnSlide={maxPages - start} isSelected={pageIndex == page} key={pageIndex} onClick={() => changePage(pageIndex)}>{pageIndex}</Li>}
                            }
                        )
                    }
                </Ul>
                {page < maxPages &&
                    <button data-testid='next' onClick={() => changePage(page + 1)}>next</button>
                }
            </Container>
            }
        </>
    )
}
export default Pagination
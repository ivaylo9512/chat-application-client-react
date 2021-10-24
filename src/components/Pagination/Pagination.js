import { useDispatch, useSelector } from "react-redux";
import { Container, Ul, Li } from './PaginationStyle';

const Pagination = ({selector, setData, getData, pagesPerSlide = 4}) => {
    const { isLoading, dataInfo: { data, maxPages, currentPage, pages }, query } = useSelector(selector);
    const dispatch = useDispatch();

    const changePage = (page) => {
        if(isLoading){
            return;
        }

        const currentData = data[page - 1];
        if(currentData){
            return dispatch(setData({ currentData, currentPage: page }));
        }

        const pagesCount = page - pages; 
        dispatch(getData({...query, pages: pagesCount}))
    }


    return(
        <>
        {maxPages > 0 &&
            <Container>
                {currentPage > 1 &&
                    <button data-testid='back' onClick={() => changePage(currentPage - 1)}>prev</button>
                }
                <Ul>
                    {
                        Array.from({ length: currentPage / pagesPerSlide < 1 ? pagesPerSlide : pagesPerSlide + 1 }).map((el, i) => {
                            const slide = Math.floor(currentPage / pagesPerSlide);
                            const start = slide * pagesPerSlide + (slide == 0 ? 1 : 0);
                            const pageIndex = start + i;

                            if(pageIndex <= maxPages){
                                return <Li data-testid={`${pageIndex}`} pagesOnSlide={maxPages - start} isSelected={pageIndex == currentPage} key={pageIndex} onClick={() => changePage(pageIndex)}>{pageIndex}</Li>}
                            }
                        )
                    }
                </Ul>
                {currentPage < maxPages &&
                    <button data-testid='next' onClick={() => changePage(currentPage + 1)}>next</button>
                }
            </Container>
            }
        </>
    )
}
export default Pagination
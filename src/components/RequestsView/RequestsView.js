import RequestsList from "components/RequestsList/RequestsList"
import Pagination from "components/Pagination/Pagination"
import { getRequests, getAllRequestsState,  setCurrentRequests } from 'app/slices/allRequestsSlice'
import { Container } from "components/RequestsView/RequestsViewStyle"
import { useSelector } from "react-redux"
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator"

const RequestsView = () => {
    const { isLoading, error } = useSelector(getAllRequestsState);

    return(
        <Container>
            <RequestsList />
            {error && <div data-testid='error'>{error}</div>}
            {isLoading 
                ? <LoadingIndicator />
                : <Pagination selector={getAllRequestsState} setData={setCurrentRequests} getData={getRequests} pagesPerSlide={5} />
            }
        </Container>
    )
}
export default RequestsView
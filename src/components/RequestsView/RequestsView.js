import RequestsList from "components/RequestsList/RequestsList"
import Pagination from "components/Pagination/Pagination"
import { getRequests, getAllRequestsState,  setCurrentRequests } from 'app/slices/allRequestsSlice'
import { Container } from "components/RequestsView/RequestsViewStyle"

const RequestsView = () => {

    return(
        <Container>
            <RequestsList />
            <Pagination selector={getAllRequestsState} setData={setCurrentRequests} getData={getRequests} pagesPerSlide={5} />
        </Container>
    )
}
export default RequestsView
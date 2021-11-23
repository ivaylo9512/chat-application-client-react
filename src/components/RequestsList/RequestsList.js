import { useSelector, useDispatch } from "react-redux"
import { getCurrentAllRequests, resetRequestsState, getRequests, getAllRequestsQuery } from "app/slices/allRequestsSlice"
import Request from "components/Request/Request";
import { Container } from './RequestsListStyle';
import { useEffect } from "react";

const RequestsList = () => {
    const requests = useSelector(getCurrentAllRequests);
    const query = useSelector(getAllRequestsQuery);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRequests({ ...query, pages: 1 }));

        return () => dispatch(resetRequestsState());
    }, [])

    return(
        <Container>
            {requests && (requests.length === 0
                ? <span data-testid='info'><b>No requests found.</b></span> 
                : requests.map(request => 
                    <Request key={request.id} request={request} />)
            )}
        </Container>
    )

}
export default RequestsList
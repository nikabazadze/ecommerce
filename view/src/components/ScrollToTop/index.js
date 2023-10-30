import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, clearSearchTerm } from '../../store/SearchSlice';

function ScrollToTop() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const searchTerm = useSelector(selectSearchTerm);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (searchTerm && pathname !== '/shop') {
      dispatch(clearSearchTerm());
    }
  }, [pathname, dispatch]);

  return null;
};

export default ScrollToTop;
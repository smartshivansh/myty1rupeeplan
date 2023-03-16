
import classes from  "./Loader.module.css"

import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {

    return <div className={classes.container}>
        <div className={classes.loader}>
        <Spinner animation="border"  />
          
        </div>
    </div>
}

export default Loader;
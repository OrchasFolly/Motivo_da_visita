import './ButtonPrimary.css';
import { Button } from 'react-bootstrap';

function ButtonPrimary({id, type ,title, variant, size, disabled, anyEvent = () => {}}) {
    return (
        <Button
            className="others-styles"
            id={id} 
            type={type}
            variant={variant}
            size={size} 
            onClick={anyEvent}
            disabled = {disabled}>
            {title}
        </Button>
    );
}

export default ButtonPrimary
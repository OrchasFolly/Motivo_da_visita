import './TopBar.css';
import { CgMic } from 'react-icons/cg';
import { FaGear } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';

function TopBar() {
    return (
        // Lembrar de usar emojis (caso esqueça)
        <nav className="navBar">
            <div>
                <button className="btnIcon"><FaHome/></button>
            </div>
            <div>
                <button className="btnIcon"><CgMic/></button>
                <button className="btnIcon"><FaGear/></button>
            </div>
        </nav>
    );
}

export default TopBar
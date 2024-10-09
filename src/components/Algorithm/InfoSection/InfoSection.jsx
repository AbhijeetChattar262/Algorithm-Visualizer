import { infoSection } from '../../../constants';
import './InfoSection.css';

export default function InfoSection({ algorithm }) {

    return (
        <div className="info-section">
            <div className="info">{infoSection[algorithm].info}</div>
            <div className="algorithm"></div>
            <div className="complexity"></div>
            <div className="use-cases"></div>
        </div>
    );
}
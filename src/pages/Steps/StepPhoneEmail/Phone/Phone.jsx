import Card from "../../../../components/global/card/Card";
import Button from '../../../../components/global/button/Button';
import { CiMobile3 } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

const Phone = ({ onNext }) => {
    const startRegister = () => {

    }
 
    return (
        <Card title="Enter your Phone number" icon={<CiMobile3 color="red" size={35} />}>
            <div>
                <Button text="Next" icon={<FaLongArrowAltRight size={20} onClick={startRegister} />} />
            </div>
        </Card>

    )
}

export default Phone;
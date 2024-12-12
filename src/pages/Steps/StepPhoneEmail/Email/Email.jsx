import Card from "../../../../components/global/card/Card";
import Button from '../../../../components/global/button/Button';
import { MdOutlineMarkEmailUnread } from "react-icons/md"
import { FaLongArrowAltRight } from "react-icons/fa";

const Email = ({ onNext }) => {
    const startRegister = () => {

    }
 
    return (
        <Card title="Enter your Email" icon={<MdOutlineMarkEmailUnread size={40} />}>
            <div>
                <Button text="Next" icon={<FaLongArrowAltRight size={20} onClick={startRegister} />} />
            </div>
        </Card>

    )
}

export default Email;
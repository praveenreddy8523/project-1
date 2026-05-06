import { useLocation, useNavigate } from "react-router-dom";

const Project = ()=>{
    const location = useLocation();
    const { name,tag } = location.state || {};
    const navigate = useNavigate();


    const handleBackClick = ()=>{
        navigate(-1);
    };
    return (<>
        <div>
            <button onClick={handleBackClick}>Back</button>
        </div>
        <h2>{name}{"  and tag is "}{tag}</h2>
    </>);
}

export default Project;
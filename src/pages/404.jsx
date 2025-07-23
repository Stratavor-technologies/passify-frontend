import Header from "../Components/Navigation/Header";
import Sidebar from "../Components/Navigation/Sidebar";
import { useAuth } from "../Hooks/AuthHook";
import notFoundImg from "../assets/images/error-404.png";
import { useNavigate } from "react-router-dom";

const PageNotFound  = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleBackHome = (e) => {
        e.preventDefault();

        navigate("/dashboard");
    }
    
    return (
        <>
            {isLoggedIn ? <>
                <Header />

                <div className="flex  w-[100%] page404wrap_outer">
                    <Sidebar />
                    <div className="container">
                        <div className="page404wrap justify-content-center">
                            <div className="page404wrap_inner">
                                <div className="page-404-txt text-center">

                                    <div className="rel page-404-img text-center">
                                        <img className="img-fluid" src={notFoundImg} alt="error-404-img" />
                                    </div>

                                    <h2>Page Not Found</h2>
                                    <h6>
                                        Oops! The page you are looking for might have been moved, renamed or might never existed
                                    </h6>

                                    <a href="/dashboard" onClick={handleBackHome} className="btn btn--theme hover--theme">Back to home</a>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                    
            </> : <>
            <div className="flex  w-[100%] page404wrap_outer">
                    <div className="container">
                        <div className="page404wrap justify-content-center">
                            <div className="page404wrap_inner">
                                <div className="page-404-txt text-center">

                                    <div className="rel page-404-img text-center">
                                        <img className="img-fluid" src={notFoundImg} alt="error-404-img" />
                                    </div>

                                    <h2>Page Not Found</h2>
                                    <h6>
                                        Oops! The page you are looking for might have been moved, renamed or might never existed
                                    </h6>

                                    <a href="https://passify.info" className="btn btn--theme hover--theme">Back to home</a>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
            }
            
        </>
    );
}

export default PageNotFound;
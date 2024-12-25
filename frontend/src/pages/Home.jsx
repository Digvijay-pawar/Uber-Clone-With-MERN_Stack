import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

function Home() {
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false); 

    useGSAP(function () {
        gsap.to(panelRef.current, {
            height: panelOpen ? "70%" : "0",
            duration: 0.5
        })
    }, [panelOpen])

    return (
        <div className="h-screen relative overflow-hidden">
            <img className="w-16 absolute left-5 top-5" src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
            <div className="h-screen w-screen">
                <img className="h-full w-full object-cover" alt="sadfadsf" src="https://imgs.search.brave.com/SUAmZzkxdcsS5wDDTdANVbe0rpX_lmaqGV15fzVwON8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaW1v/bnBhbi5jb20vd3At/Y29udGVudC90aGVt/ZXMvc3BfcG9ydGZv/bGlvL2Fzc2V0cy91/YmVyLW5vLXNlbnNl/LmpwZw" />
            </div>
            <div className="flex flex-col justify-end h-screen absolute bottom-0 w-full">
                <div className="h-[30%] p-5 bg-white relative border-b-2 border-gray-100">
                    {panelOpen && <button onClick={() => setPanelOpen(false)} className="absolute top-6 right-6 text-2xl font-bold cursor-pointer hover:text-gray-500">
                        &#x2715;
                    </button>}
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form className="">
                        <div className="line absolute h-16 w-1 top-[43%] rounded-full left-10 bg-gray-800"></div>
                        <input onClick={() => setPanelOpen(true)} className="bg-[#eee] mt-5 px-12 py-2 text-base rounded-lg w-full font-medium" type="text" placeholder="Add a pick up location" />
                        <input onClick={() => setPanelOpen(true)} className="bg-[#eee] mt-5 px-12 py-2 text-base rounded-lg w-full font-medium" type="text" placeholder="Enter your destination" />
                    </form>
                </div>
                <div ref={panelRef} className="p-5 bg-white h-0">
                    <LocationSearchPanel/>
                </div>
            </div>
            <div className="fixed translate-y-full w-full z-10 bottom-0 bg-white p-3 py-6">
                <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
                <div className="flex border-2 active:border-black rounded-lg w-full mb-2 items-center justify-between p-3">
                    <img className="h-10" src="https://cdn-iejhi.nitrocdn.com/NMxJCeGVpcAQdhpVLEQLtsJQObyxxCrn/assets/images/optimized/rev-d36051c/www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select.jpeg" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-medium text-xs text-gray-600">Affordable, Compact rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">$190.23</h2>
                </div>
                <div className="flex border-2 active:border-black rounded-lg w-full mb-2 items-center justify-between p-3">
                    <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-medium text-xs text-gray-600">Affordable, Compact rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">$65.23</h2>
                </div>
                <div className="flex border-2 active:border-black rounded-lg w-full mb-2 items-center justify-between p-3">
                    <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>2</span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-medium text-xs text-gray-600">Affordable, Compact rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">$118.23</h2>
                </div>
                
            </div>
        </div>
    );
}

export default Home;
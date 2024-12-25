function LocationSearchPanel() {
    const locationArray = [
        {
            id: 1,
            location: "23B, Near Kapoor's cafe, Sheryians Coding School, Bhopal"
        },
        {
            id: 2,
            location: "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal"
        },
        {
            id: 3,
            location: "25B, Near Kapoor's cafe, Sheryians Coding School, Bhopal"
        }
    ]
    return (
        <div>
            <h4 className="text-lg font-medium mb-4">Recent Searches</h4>
            {locationArray.map(location => (
                <div key={location.id} className="flex rounded-lg border-2 p-2 border-gray-100 active:border-black gap-4 items-center justify-start my-2">
                    <h2 className="bg-[#eee] h-9 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill"></i></h2>
                    <h4 className="font-medium">{location.location}</h4>
                </div>
            ))}
        </div>
    );
}

export default LocationSearchPanel;